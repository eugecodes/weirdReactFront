import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import Table from "@/src/ui/components/table/table";
import Enabled from "@/src/ui/components/enabled/enabled";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { DeviceHub } from "@/src/ui/assets/icons";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import Selector from "@/src/ui/components/selector/selector";
import dayjs from "dayjs";
import { DATE_FORMAT_TO_SHOW } from "@/src/common/utils/dates";
import type { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { statusOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import RateTypeController from "@/src/ui/pages/rate_type/controllers/rate_type_controller";
import { useListRateTypeProvider } from "@/src/ui/pages/rate_type/views/rate_type_page/provider/list_rate_type.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { energyTypeOptions } from "@/src/ui/utils/selector_options";
import useListFilters from "@/src/ui/hooks/useListFilters";

export default function RateTypePage() {
  const { t } = useTranslation(["rate_type", "common"]);
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
    getAll: getRateTypes,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListRateTypeProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getRateTypes(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRateType = useCallback(debounce(getRateTypes, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceRateType(formik.values);
  }, [debounceRateType, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("rate_type:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await RateTypeController.delete(id);
          onCloseModal();
          await getRateTypes(formik.values);
          showToast({ message: t("rate_type:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getRateTypes, onCloseModal, t, formik.values, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("rate_type:sure.disable") : t("rate_type:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await RateTypeController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "rate_type:actions.disabled" : "rate_type:actions.enabled") });
          await getRateTypes(formik.values);
        }
      };
      setModalData(newModalData);
    },
    [getRateTypes, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<RateTypeModel>> = useMemo(
    () => [
      {
        key: "name"
      },
      {
        key: "energyType",
        render: (value) => <span>{value === EnergyTypes.LIGHT ? t("rate_type:energyType.electricity") : t("rate_type:energyType.gas")}</span>
      },
      {
        key: "minPower"
      },
      {
        key: "maxPower"
      },
      {
        key: "enabled",
        render: (value) => <Enabled isEnabled={value as boolean}></Enabled>
      },
      {
        key: "createdAt"
      },
      {
        key: "responsible",
        render: (value) => <span>{value ? (value as UserModel).name : ""}</span>
      }
    ],
    [t]
  );

  const headCells: Array<HeadCell<RateTypeModel>> = useMemo(
    () => [
      {
        key: "name",
        label: t("rate_type:columns.name"),
        filterElement: <InputFormik name="name" />
      },
      {
        key: "energyType",
        label: t("rate_type:columns.energyType"),
        filterElement: (
          <Selector
            name="energy type"
            options={energyTypeOptions}
            value={formik.values.energyType}
            onChange={(newType) => formik.setFieldValue("energyType", newType)}
          />
        )
      },
      {
        key: "minPower",
        label: t("rate_type:columns.minPower"),
        filterElement: <InputFormik min={0} name="minPower" type="number" />
      },
      {
        key: "maxPower",
        label: t("rate_type:columns.maxPower"),
        filterElement: <InputFormik min={0} name="maxPower" type="number" />
      },
      {
        key: "enabled",
        label: t("rate_type:columns.state"),
        filterElement: (
          <Selector
            name="enabled"
            options={statusOptions}
            value={formik.values.enabled}
            onChange={(newStatus) => formik.setFieldValue("enabled", newStatus)}
          />
        )
      },
      {
        key: "createdAt",
        label: t("rate_type:columns.createdAt"),
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
      },
      {
        key: "responsible",
        label: t("rate_type:columns.responsible"),
        filterElement: <InputFormik name="responsible" />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, formik.values.energyType, formik.values.enabled, formik.values.createdAt, statusOptions, energyTypeOptions]
  );

  const actions: Array<IAction<RateTypeModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: RateTypeModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: RateTypeModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
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
    <BackofficePage
      title={t("rate_type:rateTypes")}
      Icon={DeviceHub}
      createUrl={paths.rateType.index + paths.rateType.create}
      createButtonText={t("rate_type:actions.save")}
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
            tableTitle={t("rate_type:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<RateTypeModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
