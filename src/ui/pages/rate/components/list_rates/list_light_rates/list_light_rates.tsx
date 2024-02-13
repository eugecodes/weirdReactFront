import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import Enabled from "@/src/ui/components/enabled/enabled";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import Selector from "@/src/ui/components/selector/selector";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { booleanOptions, statusOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import RateController from "@/src/ui/pages/rate/controllers/rate_controller";
import { useListRateProvider } from "@/src/ui/pages/rate/provider/list_rate.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import LargeTable from "@/src/ui/components/table/large_table";
import { clientTypeOptions, priceTypeOptions } from "@/src/ui/utils/selector_options";
import { Tooltip } from "@mui/material";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { PriceType } from "@/src/core/app/enums/price_type";
import { getBooleanTranslation, getClientTypeTranslation } from "@/src/ui/i18n/utils";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";
import useListFilters from "@/src/ui/hooks/useListFilters";
import type { ListRatesProps } from "../view_models/list_rates_props";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";
import Autocomplete from "@/src/ui/components/autocomplete/autocomplete";
import type { BasicMarketerModel } from "@/src/core/marketer/domain/models/basic_marketer_model";

const PRICE_START = 1;
const PRICE_END = 6;

export default function ListLightRates({ setModalData, setShowModal, withMarketerId }: ListRatesProps) {
  const { t } = useTranslation(["rate", "common"]);
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const {
    isLoading,
    rows,
    page,
    total,
    size,
    setPage,
    setSize,
    getAll: getRates,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListRateProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getRates(values)
  });

  const { getRateTypesByName, rateTypes, setRateTypeFilterName, rateTypesFilterName, energyType, isLoadingRateTypes } =
    useAutocompleteRateTypesProvider((state) => ({
      getRateTypesByName: state.getByName,
      rateTypes: state.items,
      setRateTypeFilterName: state.setFilterName,
      rateTypesFilterName: state.filterName,
      energyType: state.energyType,
      isLoadingRateTypes: state.isLoading
    }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateTypeName = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);

  const { getMarketerByName, marketers, setMarketerFilterName, marketersFilterName, isLoadingMarketers } = useAutocompleteMarketersProvider(
    (state) => ({
      getMarketerByName: state.getByName,
      marketers: state.items,
      setMarketerFilterName: state.setFilterName,
      marketersFilterName: state.filterName,
      isLoadingMarketers: state.isLoading
    })
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetMarketerName = useCallback(debounce(getMarketerByName, DEFAULT_DEBOUNCE_TIME), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRate = useCallback(debounce(getRates, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceRate(formik.values);
  }, [debounceRate, formik.values]);

  useEffectRunOnce(() => {
    debounceSetRateTypeName();
  }, [debounceSetRateTypeName, rateTypesFilterName, energyType]);

  useEffectRunOnce(() => {
    debounceSetMarketerName();
  }, [debounceSetMarketerName, marketersFilterName]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onResetFilters = useCallback(() => {
    resetFilters();
    formik.setFieldValue("marketer", null);
    setMarketerFilterName("");
    formik.setFieldValue("rateTypes", null);
    setRateTypeFilterName("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilters, setMarketerFilterName, setRateTypeFilterName]);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("rate:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await RateController.delete(id);
          onCloseModal();
          await getRates(formik.values);
          showToast({ message: t("rate:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getRates, onCloseModal, t, formik.values, showToast, setShowModal, setModalData]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("rate:sure.disable") : t("rate:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await RateController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "rate:actions.disabled" : "rate:actions.enabled") });
          await getRates(formik.values);
        }
      };
      setModalData(newModalData);
    },
    [getRates, onCloseModal, t, formik.values, showToast, setModalData, setShowModal]
  );

  const headCells: Array<HeadCell<RateModel>> = useMemo(
    () => {
      const cells: Array<HeadCell<RateModel>> = [
        {
          key: "name",
          label: t("rate:columns.name"),
          filterElement: <InputFormik name="name" />
        },
        {
          key: "priceType",
          label: t("rate:columns.priceType"),
          filterElement: (
            <Selector
              name="priceType"
              options={priceTypeOptions}
              value={formik.values.priceType}
              onChange={(newValue) => {
                formik.setFieldValue("priceType", newValue);
              }}
            />
          )
        },
        {
          key: "clientTypes",
          label: t("rate:columns.clientType"),
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
          key: "rateType",
          label: t("rate:columns.rateType"),
          filterElement: (
            <Autocomplete
              multiple
              options={rateTypes}
              value={formik.values.rateType}
              onInputChange={setRateTypeFilterName}
              inputValue={rateTypesFilterName}
              onChange={(value) => {
                formik.setFieldValue("rateType", value);
              }}
              isLoading={isLoadingRateTypes}
            />
          )
        },
        {
          key: "permanency",
          label: t("rate:columns.permanency"),
          filterElement: (
            <Selector
              name="permanency"
              options={booleanOptions}
              value={formik.values.permanency}
              onChange={(newValue) => formik.setFieldValue("permanency", newValue)}
            />
          )
        },
        {
          key: "length",
          label: t("rate:columns.length"),
          filterElement: <InputFormik name="length" type="number" min={0} />
        },
        {
          key: "isFullRenewable",
          label: t("rate:columns.isFullRenewable"),
          filterElement: (
            <Selector
              name="isFullRenewable"
              options={booleanOptions}
              value={formik.values.isFullRenewable}
              onChange={(newValue) => formik.setFieldValue("isFullRenewable", newValue)}
            />
          )
        },
        {
          key: "compensationSurplus",
          label: t("rate:columns.compensationSurplus"),
          filterElement: (
            <Selector
              name="compensationSurplus"
              options={booleanOptions}
              value={formik.values.compensationSurplus}
              onChange={(newValue) => formik.setFieldValue("compensationSurplus", newValue)}
            />
          )
        },
        {
          key: "compensationSurplusValue",
          label: t("rate:columns.compensationSurplusValue")
        },
        {
          key: "minPower",
          label: t("rate:columns.minPower"),
          filterElement: <InputFormik name="minPower" type="number" min={0} />
        },
        {
          key: "maxPower",
          label: t("rate:columns.maxPower"),
          filterElement: <InputFormik name="maxPower" type="number" min={0} />
        }
      ];

      for (let i = PRICE_START; i <= PRICE_END; i++) {
        const name = "energyPrice" + i;
        const newCell = {
          key: name as keyof RateModel,
          label: t("rate:columns.energyPrice", { price: i }),
          filterElement: <InputFormik name={name} type="number" min={0} />
        };
        cells.push(newCell);
      }
      for (let i = PRICE_START; i <= PRICE_END; i++) {
        const name = "powerPrice" + i;
        const newCell = {
          key: name as keyof RateModel,
          label: t("rate:columns.energyPrice", { price: i }),
          filterElement: <InputFormik name={name} type="number" min={0} />
        };
        cells.push(newCell);
      }
      cells.push({
        key: "enabled",
        label: t("rate:columns.state"),
        filterElement: (
          <Selector
            name="enabled"
            options={statusOptions}
            value={formik.values.enabled}
            onChange={(newStatus) => formik.setFieldValue("enabled", newStatus)}
          />
        )
      });

      if (withMarketerId) {
        cells.unshift({
          key: "marketer",
          label: t("rate:columns.marketer"),
          filterElement: (
            <Autocomplete
              options={marketers}
              value={formik.values.marketer}
              onInputChange={setMarketerFilterName}
              onChange={(newValue) => {
                formik.setFieldValue("marketer", newValue);
              }}
              isLoading={isLoadingMarketers}
              inputValue={marketersFilterName}
            />
          )
        });
      }

      return cells;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      formik.values.enabled,
      formik.values.createdAt,
      formik.values.priceType,
      formik.values.clientTypes,
      formik.values.permanency,
      formik.values.rateType,
      formik.values.isFullRenewable,
      formik.values.compensationSurplus,
      rateTypes,
      rateTypesFilterName,
      setRateTypeFilterName,
      marketers,
      marketersFilterName,
      setMarketerFilterName,
      isLoadingMarketers,
      isLoadingRateTypes,
      withMarketerId
    ]
  );

  const columns = useMemo(() => {
    const cols: Array<IColumn<RateModel>> = [
      {
        key: "name"
      },
      {
        key: "priceType",
        render: (value) => <span>{value === PriceType.FIXED_BASE ? t("common:priceType.fixedBase") : t("common:priceType.fixedFixed")}</span>
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
        key: "rateType",
        render: (value) => <span>{(value as BasicRateTypeModel).name}</span>
      },
      {
        key: "permanency",
        render: (value) => <span>{getBooleanTranslation(value as boolean)}</span>
      },
      {
        key: "length"
      },
      {
        key: "isFullRenewable",
        render: (value) => <span>{getBooleanTranslation(value as boolean)}</span>
      },
      {
        key: "compensationSurplus",
        render: (value) => <span>{getBooleanTranslation(value as boolean)}</span>
      },
      {
        key: "compensationSurplusValue"
      },
      {
        key: "minPower"
      },
      {
        key: "maxPower"
      },
      {
        key: "energyPrice1"
      },
      {
        key: "energyPrice2"
      },
      {
        key: "energyPrice3"
      },
      {
        key: "energyPrice4"
      },
      {
        key: "energyPrice5"
      },
      {
        key: "energyPrice6"
      },
      {
        key: "powerPrice1"
      },
      {
        key: "powerPrice2"
      },
      {
        key: "powerPrice3"
      },
      {
        key: "powerPrice4"
      },
      {
        key: "powerPrice5"
      },
      {
        key: "powerPrice6"
      },
      {
        key: "enabled",
        render: (value) => <Enabled isEnabled={value as boolean} />
      }
    ];

    if (withMarketerId) {
      cols.unshift({
        key: "marketer",
        render: (value) => <span>{(value as BasicMarketerModel).name}</span>
      });
    }

    return cols;
  }, [t, withMarketerId]);

  const actions: Array<IAction<RateModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: RateModel) =>
          navigate(paths.rate.index + paths.rate.detail + selectedItem.id + `${!withMarketerId ? "?fromMarketerDetail=true" : ""}`)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: RateModel) =>
          navigate(paths.rate.index + paths.rate.edit + selectedItem.id + `${!withMarketerId ? "?fromMarketerDetail=true" : ""}`)
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
    [t, onClickActive, onClickDelete, navigate, withMarketerId]
  );

  return (
    <FormikProvider value={formik}>
      <Form>
        <LargeTable
          renderSubheader={() => (
            <>
              <th colSpan={withMarketerId ? 13 : 12}></th>
              <th colSpan={PRICE_END}>{t("rate:columns.energyPrices")}</th>
              <th colSpan={PRICE_END}>{t("rate:columns.powerPrices")}</th>
            </>
          )}
          rows={rows}
          headCells={headCells}
          columns={columns}
          actions={actions}
          tableTitle={t("rate:tableName")}
          onResetFilters={onResetFilters}
          page={page}
          onChangePage={setPage}
          rowsPerPage={size}
          onChangeRowsPerPage={setSize}
          totalItems={total}
          isClearFiltersButtonDisabled={isClearButtonDisabled}
          isLoading={isLoading}
          onChangeSort={setOrderBy}
          sortBy={toJson(orderBy) as OrderBy<RateModel>}
          handleDeleteSelected={handleDeleteSelected}
          handleDownloadSelected={handleDownloadSelected}
          handleDownloadAll={handleDownloadAll}
          customHandleRowClick={(selectedItem) => {
            navigate(paths.rate.index + paths.rate.detail + selectedItem.id + `${!withMarketerId ? "?fromMarketerDetail=true" : ""}`);
            return true;
          }}
        />
      </Form>
    </FormikProvider>
  );
}
