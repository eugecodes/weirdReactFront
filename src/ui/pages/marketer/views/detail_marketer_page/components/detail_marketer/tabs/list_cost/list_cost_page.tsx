import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import Enabled from "@/src/ui/components/enabled/enabled";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import Selector from "@/src/ui/components/selector/selector";
import type { CostModel } from "@/src/core/cost/domain/models/cost_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { costOptions, statusOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import CostController from "@/src/ui/pages/cost/controllers/cost_controller";
import { useListCostProvider } from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_cost/provider/list_cost.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import { clientTypeOptions } from "@/src/ui/utils/selector_options";
import TabsListPage from "@/src/ui/components/tabs_list_page/tabs_list_page";
import { Tooltip } from "@mui/material";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { getClientTypeTranslation, getCostTypeTranslation } from "@/src/ui/i18n/utils";
import type { ClientType } from "@/src/core/app/enums/client_type";
import useListFilters from "@/src/ui/hooks/useListFilters";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";
import type { CostType } from "@/src/core/app/enums/cost_type";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import LargeTable from "@/src/ui/components/table/large_table";

const columns: Array<IColumn<CostModel>> = [
  {
    key: "name"
  },
  {
    key: "clientTypes",
    render: (value) => {
      const valueAsString = (value as ClientType[])?.map(getClientTypeTranslation).join(", ");
      return (
        <Tooltip title={valueAsString}>
          <span>{valueAsString}</span>
        </Tooltip>
      );
    }
  },
  {
    key: "rates",
    render: (value) => <span>{(value as BasicRateModel[]).map((rate) => rate.name).join(", ")}</span>
  },
  {
    key: "minPower"
  },
  {
    key: "maxPower"
  },
  {
    key: "quantity"
  },
  {
    key: "costType",
    render: (value) => <span>{getCostTypeTranslation(value as CostType)}</span>
  },
  {
    key: "enabled",
    render: (value) => <Enabled isEnabled={value as boolean} />
  }
];

export default function ListCostPage() {
  const { t } = useTranslation(["cost", "common"]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { showToast } = useShowToast();
  const {
    isLoading,
    rows,
    page,
    total,
    size,
    setPage,
    setSize,
    getAll: getCosts,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListCostProvider((state) => state);

  const { getRatesByName, rates, setRateFilterName, ratesFilterName, areRatesLoading } = useAutocompleteRateProvider((state) => ({
    getRatesByName: state.getByName,
    rates: state.items,
    setRateFilterName: state.setFilterName,
    ratesFilterName: state.filterName,
    areRatesLoading: state.isLoading
  }));

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getCosts(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCost = useCallback(debounce(getCosts, DEFAULT_DEBOUNCE_TIME), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateName = useCallback(debounce(getRatesByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceCost(formik.values);
  }, [debounceCost, formik.values]);

  useEffectRunOnce(() => {
    debounceSetRateName();
  }, [debounceSetRateName, ratesFilterName]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("cost:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await CostController.delete(id);
          onCloseModal();
          await getCosts(formik.values);
          showToast({ message: t("cost:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getCosts, onCloseModal, t, formik.values, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("cost:sure.disable") : t("cost:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await CostController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "cost:actions.disabled" : "cost:actions.enabled") });
          await getCosts(formik.values);
        }
      };
      setModalData(newModalData);
    },
    [getCosts, onCloseModal, t, formik.values, showToast]
  );

  const headCells: Array<HeadCell<CostModel>> = useMemo(
    () => [
      {
        key: "name",
        label: t("cost:columns.name"),
        filterElement: <InputFormik name="name" />
      },
      {
        key: "clientTypes",
        label: t("cost:columns.clientType"),
        filterElement: (
          <Selector
            multiple
            name="clientTypes"
            options={clientTypeOptions}
            value={formik.values.clientTypes}
            onChange={(newValue) => formik.setFieldValue("clientTypes", newValue)}
          />
        )
      },
      {
        key: "rates",
        label: t("cost:columns.rates"),
        filterElement: (
          <Autocomplete
            multiple
            options={rates}
            value={formik.values.rates}
            onInputChange={setRateFilterName}
            onChange={(value) => {
              formik.setFieldValue("rates", value);
            }}
            isLoading={areRatesLoading}
          />
        )
      },
      {
        key: "minPower",
        label: t("cost:columns.minRange"),
        filterElement: <InputFormik name="minPower" type="number" min={0} />
      },
      {
        key: "maxPower",
        label: t("cost:columns.maxRange"),
        filterElement: <InputFormik name="maxPower" type="number" min={0} />
      },
      {
        key: "quantity",
        label: t("cost:columns.quantity"),
        filterElement: <InputFormik name="quantity" type="number" min={0} />
      },
      {
        key: "costType",
        label: t("cost:columns.costType"),
        filterElement: (
          <Selector
            name="costType"
            options={costOptions}
            value={formik.values.costType}
            onChange={(newValue) => formik.setFieldValue("costType", newValue)}
          />
        )
      },
      {
        key: "enabled",
        label: t("cost:columns.state"),
        filterElement: (
          <Selector
            name="enabled"
            options={statusOptions}
            value={formik.values.enabled}
            onChange={(newStatus) => formik.setFieldValue("enabled", newStatus)}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      formik.values.enabled,
      formik.values.createdAt,
      formik.values.clientTypes,
      formik.values.costType,
      rates,
      ratesFilterName,
      areRatesLoading,
      formik.values.rates
    ]
  );

  const actions: Array<IAction<CostModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: CostModel) => navigate(paths.cost.index + paths.cost.detail + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: CostModel) => navigate(paths.cost.index + paths.cost.edit + selectedItem.id)
      },
      {
        render: (item) => <>{item.enabled ? t("common:actions.disable") : t("common:actions.enable")}</>,
        onClick: (selectedItem) => onClickActive(selectedItem.id, selectedItem.enabled)
      },
      {
        text: t("common:actions.remove"),
        onClick: (selectedItem) => onClickDelete(selectedItem.id)
      }
    ],
    [t, onClickActive, onClickDelete, navigate]
  );

  return (
    <TabsListPage
      title={t("cost:costs")}
      createUrl={paths.cost.index + paths.cost.create + `?marketerId=${filters.marketerId}`}
      createButtonText={t("cost:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}
    >
      <FormikProvider value={formik}>
        <Form>
          <LargeTable
            rows={rows}
            headCells={headCells}
            columns={columns}
            actions={actions}
            tableTitle={t("cost:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<CostModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </TabsListPage>
  );
}
