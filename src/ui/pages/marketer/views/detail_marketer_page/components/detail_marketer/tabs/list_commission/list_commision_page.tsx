import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import Selector from "@/src/ui/components/selector/selector";
import type { CommissionModel } from "@/src/core/commission/domain/models/commission_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { energyTypeOptions, priceTypeOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import CommissionController from "@/src/ui/pages/commission/controllers/commission_controller";
import { useListCommissionProvider } from "@/src/ui/pages/marketer/views/detail_marketer_page/components/detail_marketer/tabs/list_commission/provider/list_commission.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import TabsListPage from "@/src/ui/components/tabs_list_page/tabs_list_page";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import useListFilters from "@/src/ui/hooks/useListFilters";
import LargeTable from "@/src/ui/components/table/large_table";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import { DATE_FORMAT_TO_SHOW } from "@/src/common/utils/dates";
import dayjs from "dayjs";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import { Tooltip } from "@mui/material";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";

export default function ListCommissionPage() {
  const { t } = useTranslation(["commission", "common"]);
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
    getAll: getCommissions,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListCommissionProvider((state) => state);

  const { getRatesByName, rates, setRateFilterName, ratesFilterName } = useAutocompleteRateProvider((state) => ({
    getRatesByName: state.getByName,
    rates: state.items,
    setRateFilterName: state.setFilterName,
    ratesFilterName: state.filterName
  }));

  const { getRateTypesByName, rateTypes, setRateTypeFilterName, rateTypesFilterName, loading } = useAutocompleteRateTypesProvider((state) => ({
    getRateTypesByName: state.getByName,
    rateTypes: state.items,
    setRateTypeFilterName: state.setFilterName,
    rateTypesFilterName: state.filterName,
    loading: state.isLoading
  }));

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getCommissions(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCommission = useCallback(debounce(getCommissions, DEFAULT_DEBOUNCE_TIME), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateName = useCallback(debounce(getRatesByName, DEFAULT_DEBOUNCE_TIME), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateTypeName = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceCommission(formik.values);
  }, [debounceCommission, formik.values]);

  useEffectRunOnce(() => {
    debounceSetRateName();
  }, [debounceSetRateName, ratesFilterName]);

  useEffectRunOnce(() => {
    debounceSetRateTypeName();
  }, [debounceSetRateTypeName, rateTypesFilterName]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("commission:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await CommissionController.delete(id);
          onCloseModal();
          await getCommissions(formik.values);
          showToast({ message: t("commission:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getCommissions, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<CommissionModel>> = useMemo(
    () => [
      {
        key: "name"
      },
      {
        key: "priceType",
        render: (item: unknown) => {
          return <span>{item === PriceType.FIXED_BASE ? t("common:priceType.fixedBase") : t("common:priceType.fixedFixed")}</span>;
        }
      },
      {
        key: "energyType",
        render: (item: unknown) => {
          return <span>{item === EnergyTypes.GAS ? t("common:energyType.gas") : t("common:energyType.electricity")}</span>;
        }
      },
      {
        key: "rateType",
        render: (item: unknown) => {
          return <span>{(item as BasicRateTypeModel)?.name}</span>;
        }
      },
      {
        key: "rates",
        render: (item: unknown) => {
          const value = (item as BasicRateModel[])?.map((rate) => rate.name).join(", ");
          return (
            <Tooltip title={value}>
              <span>{value}</span>
            </Tooltip>
          );
        }
      },
      {
        key: "minPower"
      },
      {
        key: "maxPower"
      },
      {
        key: "minConsumption"
      },
      {
        key: "maxConsumption"
      },
      {
        key: "percentagetestCommission"
      },
      {
        key: "testCommission"
      },
      {
        key: "createdAt"
      }
    ],
    [t]
  );

  const headCells: Array<HeadCell<CommissionModel>> = useMemo(
    () => [
      {
        key: "name",
        label: t("commission:columns.name"),
        filterElement: <InputFormik name="name" />
      },
      {
        key: "priceType",
        label: t("commission:columns.priceType"),
        filterElement: (
          <Selector
            name="priceType"
            options={priceTypeOptions}
            value={formik.values.priceType}
            onChange={(newValue) => formik.setFieldValue("priceType", newValue)}
          />
        )
      },
      {
        key: "energyType",
        label: t("commission:columns.energyType"),
        filterElement: (
          <Selector
            name="energyType"
            options={energyTypeOptions}
            value={formik.values.energyType}
            onChange={(newValue) => formik.setFieldValue("energyType", newValue)}
          />
        )
      },
      {
        key: "rateType",
        label: t("commission:columns.rateType"),
        filterElement: (
          <Autocomplete
            options={rateTypes}
            value={formik.values.rateType}
            multiple
            onInputChange={setRateTypeFilterName}
            onChange={(value) => {
              formik.setFieldValue("rateType", value);
            }}
            isLoading={loading}
          />
        )
      },
      {
        key: "rates",
        label: t("commission:columns.rates"),
        filterElement: (
          <Autocomplete
            multiple
            options={rates}
            value={formik.values.rates}
            onInputChange={setRateFilterName}
            onChange={(value) => {
              formik.setFieldValue("rates", value);
            }}
          />
        )
      },
      {
        key: "minPower",
        label: t("commission:columns.minPower"),
        filterElement: <InputFormik name="minPower" type="number" min={0} />
      },
      {
        key: "maxPower",
        label: t("commission:columns.maxPower"),
        filterElement: <InputFormik name="maxPower" type="number" min={0} />
      },
      {
        key: "minConsumption",
        label: t("commission:columns.minConsumption"),
        filterElement: <InputFormik name="minConsumption" type="number" min={0} />
      },
      {
        key: "maxConsumption",
        label: t("commission:columns.maxConsumption"),
        filterElement: <InputFormik name="maxConsumption" type="number" min={0} />
      },
      {
        key: "percentagetestCommission",
        label: t("commission:columns.percentagetestCommission"),
        filterElement: <InputFormik name="percentagetestCommission" type="number" />
      },
      {
        key: "testCommission",
        label: t("commission:columns.testCommission"),
        filterElement: <InputFormik name="testCommission" type="number" />
      },
      {
        key: "createdAt",
        label: t("commission:columns.createdAt"),
        filterElement: (
          <DatePicker
            value={formik.values.createdAt || null}
            label={t("common:columns.date")}
            onChange={(value) => {
              let formatedDate = null;
              if (value) {
                formatedDate = dayjs(value).format(DATE_FORMAT_TO_SHOW);
              }
              formik.setFieldValue("createdAt", formatedDate);
            }}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      formik.values.createdAt,
      formik.values.priceType,
      formik.values.energyType,
      rateTypes,
      rateTypesFilterName,
      formik.values.rateType,
      rates,
      ratesFilterName,
      formik.values.rates,
      loading
    ]
  );

  const actions: Array<IAction<CommissionModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: CommissionModel) => navigate(paths.commission.index + paths.commission.detail + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: CommissionModel) => navigate(paths.commission.index + paths.commission.edit + selectedItem.id)
      },
      {
        text: t("common:actions.remove"),
        onClick: (selectedItem) => onClickDelete(selectedItem.id)
      }
    ],
    [t, onClickDelete, navigate]
  );

  return (
    <TabsListPage
      title={t("commission:commissions")}
      createUrl={paths.commission.index + paths.commission.create + `?marketerId=${filters.marketerId}`}
      createButtonText={t("commission:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}>
      <FormikProvider value={formik}>
        <Form>
          <LargeTable
            renderSubheader={() => (
              <>
                <th colSpan={6}></th>
                <th colSpan={4}>{t("commission:columns.range")}</th>
              </>
            )}
            rows={rows}
            headCells={headCells}
            columns={columns}
            actions={actions}
            tableTitle={t("commission:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<CommissionModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </TabsListPage>
  );
}
