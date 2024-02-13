import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import type { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import RateController from "@/src/ui/pages/marketer_margin/controllers/marketer_margin_controller";
import { useListMarketerMarginProvider } from "@/src/ui/pages/marketer_margin/provider/list_marketer_margin.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import TabsListPage from "@/src/ui/components/tabs_list_page/tabs_list_page";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import Table from "@/src/ui/components/table/table";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import useListFilters from "@/src/ui/hooks/useListFilters";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";

const columns: Array<IColumn<MarketerMarginModel>> = [
  {
    key: "rate",
    render: (row) => <span>{(row as BasicRateModel).name}</span>
  },
  {
    key: "rateType",
    render: (row) => <span>{(row as BasicRateTypeModel)?.name}</span>
  },
  {
    key: "minConsume"
  },
  {
    key: "maxConsume"
  },
  {
    key: "minMargin"
  },
  {
    key: "maxMargin"
  }
];

export default function ListMarketerMarginPage() {
  const { t } = useTranslation(["marketer_margin", "common"]);
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
    getAll: getMarketerMargins,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListMarketerMarginProvider((state) => state);

  const { getRateTypesByName, rateTypes, setRateTypeFilterName, rateTypesFilterName, areRateTypesLoading } = useAutocompleteRateTypesProvider(
    (state) => ({
      getRateTypesByName: state.getByName,
      rateTypes: state.items,
      setRateTypeFilterName: state.setFilterName,
      rateTypesFilterName: state.filterName,
      areRateTypesLoading: state.isLoading
    })
  );

  const { getRatesByName, rates, setRateFilterName, ratesFilterName, areRatesLoading } = useAutocompleteRateProvider((state) => ({
    getRatesByName: state.getByName,
    rates: state.items,
    setRateFilterName: state.setFilterName,
    ratesFilterName: state.filterName,
    areRatesLoading: state.isLoading
  }));

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getMarketerMargins(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceMarketerMargin = useCallback(debounce(getMarketerMargins, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateTypeName = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateName = useCallback(debounce(getRatesByName, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceMarketerMargin(formik.values);
  }, [debounceMarketerMargin, formik.values]);

  useEffectRunOnce(() => {
    debounceSetRateTypeName();
  }, [debounceSetRateTypeName, rateTypesFilterName]);

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
        description: t("marketer_margin:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await RateController.delete(id);
          onCloseModal();
          await getMarketerMargins(formik.values);
          showToast({ message: t("marketer_margin:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getMarketerMargins, onCloseModal, t, formik.values, showToast]
  );

  const headCells: Array<HeadCell<MarketerMarginModel>> = useMemo(
    () => [
      {
        key: "rate",
        label: t("marketer_margin:columns.rate"),
        filterElement: (
          <Autocomplete
            multiple
            value={formik.values.rate}
            options={rates}
            onInputChange={setRateFilterName}
            onChange={(value) => {
              formik.setFieldValue("rate", value);
            }}
            isLoading={areRatesLoading}
          />
        )
      },
      {
        key: "rateType",
        label: t("marketer_margin:columns.rateType"),
        filterElement: (
          <Autocomplete
            multiple
            options={rateTypes}
            value={formik.values.rateType}
            onInputChange={setRateTypeFilterName}
            onChange={(value) => {
              formik.setFieldValue("rateType", value);
            }}
            isLoading={areRateTypesLoading}
          />
        )
      },
      {
        key: "minConsume",
        label: t("marketer_margin:columns.minConsume"),
        filterElement: <InputFormik name="minConsume" type="number" min={0} />
      },
      {
        key: "maxConsume",
        label: t("marketer_margin:columns.maxConsume"),
        filterElement: <InputFormik name="maxConsume" type="number" min={0} />
      },
      {
        key: "minMargin",
        label: t("marketer_margin:columns.minMargin"),
        filterElement: <InputFormik name="minMargin" type="number" min={0} />
      },
      {
        key: "maxMargin",
        label: t("marketer_margin:columns.maxMargin"),
        filterElement: <InputFormik name="maxMargin" type="number" min={0} />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      formik.values.createdAt,
      formik.values.rateType,
      formik.values.rate,
      rateTypes,
      setRateTypeFilterName,
      rates,
      setRateFilterName,
      areRateTypesLoading,
      areRatesLoading
    ]
  );

  const actions: Array<IAction<MarketerMarginModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: MarketerMarginModel) => navigate(paths.marketerMargin.index + paths.marketerMargin.detail + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: MarketerMarginModel) => navigate(paths.marketerMargin.index + paths.marketerMargin.edit + selectedItem.id)
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
      title={t("marketer_margin:marketerMargin")}
      createUrl={paths.marketerMargin.index + paths.marketerMargin.create + `?marketerId=${filters.marketerId}`}
      createButtonText={t("marketer_margin:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}>
      <FormikProvider value={formik}>
        <Form>
          <Table
            rows={rows}
            headCells={headCells}
            columns={columns}
            actions={actions}
            tableTitle={t("marketer_margin:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<MarketerMarginModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </TabsListPage>
  );
}
