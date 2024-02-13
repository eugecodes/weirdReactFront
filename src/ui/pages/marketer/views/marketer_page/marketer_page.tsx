import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import Table from "@/src/ui/components/table/table";
import Enabled from "@/src/ui/components/enabled/enabled";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { Business } from "@/src/ui/assets/icons";
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
import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { statusOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import MarketerController from "@/src/ui/pages/marketer/controllers/marketer_controller";
import { useListMarketerProvider } from "@/src/ui/pages/marketer/views/marketer_page/provider/list_marketer.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import useListFilters from "@/src/ui/hooks/useListFilters";

const columns: Array<IColumn<MarketerModel>> = [
  {
    key: "name"
  },
  {
    key: "fiscalName"
  },
  {
    key: "enabled",
    render: (value) => <Enabled isEnabled={value as boolean} />
  },
  {
    key: "createdAt"
  },
  {
    key: "responsible",
    render: (value) => <span>{value ? (value as UserModel).name : ""}</span>
  }
];

export default function MarketerPage() {
  const { t } = useTranslation(["marketer", "common"]);
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
    getAll: getMarketers,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadAll,
    handleDownloadSelected
  } = useListMarketerProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getMarketers(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceMarketer = useCallback(debounce(getMarketers, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceMarketer(formik.values);
  }, [debounceMarketer, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("marketer:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await MarketerController.delete(id);
          onCloseModal();
          await getMarketers(formik.values);
          showToast({ message: t("marketer:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getMarketers, onCloseModal, t, formik.values, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("marketer:sure.disable") : t("marketer:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await MarketerController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "marketer:actions.disabled" : "marketer:actions.enabled") });
          await getMarketers(formik.values);
        }
      };
      setModalData(newModalData);
    },
    [getMarketers, onCloseModal, t, formik.values, showToast]
  );

  const headCells: Array<HeadCell<MarketerModel>> = useMemo(
    () => [
      {
        key: "name",
        label: t("marketer:columns.name"),
        filterElement: <InputFormik name="name" />
      },
      {
        key: "fiscalName",
        label: t("marketer:columns.fiscalName"),
        filterElement: <InputFormik name="fiscalName" />
      },
      {
        key: "enabled",
        label: t("marketer:columns.state"),
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
        label: t("marketer:columns.createdAt"),
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
        label: t("marketer:columns.responsible"),
        filterElement: <InputFormik name="responsible" />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, formik.values.enabled, formik.values.createdAt, statusOptions]
  );

  const actions: Array<IAction<MarketerModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: MarketerModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: MarketerModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
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
      title={t("marketer:marketers")}
      Icon={Business}
      createUrl={paths.marketer.index + paths.marketer.create}
      createButtonText={t("marketer:actions.save")}
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
            tableTitle={t("marketer:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<MarketerModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
