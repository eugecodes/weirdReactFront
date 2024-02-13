import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { BarChart } from "@/src/ui/assets/icons";
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
import type { SavingStudyModel } from "@/src/core/saving_study/domain/models/saving_study_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { clientTypeOptions, studyStatusOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import SavingStudyController from "@/src/ui/pages/saving_study/controllers/saving_study_controller";
import { useListSavingStudyProvider } from "@/src/ui/pages/saving_study/views/saving_study_page/provider/list_saving_study.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import useListFilters from "@/src/ui/hooks/useListFilters";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { getClientTypeTranslation } from "@/src/ui/i18n/utils";
import type { SelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/selected_rate_model";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";
import { StudyStatus } from "@/src/core/app/enums/study_status";
import LargeTable from "@/src/ui/components/table/large_table";

export default function SavingStudyPage() {
  const { t } = useTranslation(["saving_study", "common"]);
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
    getAll: getSavingStudys,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListSavingStudyProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getSavingStudys(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSavingStudy = useCallback(debounce(getSavingStudys, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceSavingStudy(formik.values);
  }, [debounceSavingStudy, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("saving_study:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await SavingStudyController.delete(id);
          onCloseModal();
          await getSavingStudys(formik.values);
          showToast({ message: t("saving_study:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getSavingStudys, onCloseModal, t, formik.values, showToast]
  );

  const onClickDuplicate = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("saving_study:sure.duplicate"),
        primaryModalButtonText: t("saving_study:actions.duplicate"),
        onClickPrimaryButton: async () => {
          await SavingStudyController.duplicate(id);
          onCloseModal();
          await getSavingStudys(formik.values);
          showToast({ message: t("saving_study:actions.duplicated") });
        }
      };
      setModalData(newModalData);
    },
    [getSavingStudys, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<SavingStudyModel>> = [
    {
      key: "id"
    },
    {
      key: "cups"
    },
    {
      key: "clientName"
    },
    {
      key: "clientNif"
    },
    {
      key: "clientType",
      render: (value) => {
        return <span>{getClientTypeTranslation(value as ClientType)}</span>;
      }
    },
    {
      key: "marketer"
    },
    {
      key: "selectedRate",
      render: (value) => <span>{value ? (value as SelectedRateModel).name : ""}</span>
    },
    {
      key: "rateType",
      render: (value) => <span>{value ? (value as BasicRateTypeModel).name : ""}</span>
    },
    {
      key: "finalCost"
    },
    {
      key: "totalCommission"
    },
    {
      key: "savingRelative"
    },
    {
      key: "savingAbsolute"
    },
    {
      key: "status",
      render: (value) => <span>{value === StudyStatus.COMPLETED ? t("common:studyStatus.completed") : t("common:studyStatus.inProgress")}</span>
    },
    {
      key: "createdAt"
    },
    {
      key: "responsible",
      render: (value) => <span>{value ? (value as UserModel).name : ""}</span>
    }
  ];

  const headCells: Array<HeadCell<SavingStudyModel>> = [
    {
      key: "id",
      label: t("saving_study:columns.id"),
      filterElement: <InputFormik name="id" />
    },
    {
      key: "cups",
      label: t("saving_study:columns.cups"),
      filterElement: <InputFormik name="cups" />
    },
    {
      key: "clientName",
      label: t("saving_study:columns.clientName"),
      filterElement: <InputFormik name="clientName" />
    },
    {
      key: "clientNif",
      label: t("saving_study:columns.clientNif"),
      filterElement: <InputFormik name="clientNif" />
    },
    {
      key: "clientType",
      label: t("saving_study:columns.clientType"),
      filterElement: (
        <Selector
          name="clientType"
          options={clientTypeOptions}
          value={formik.values.clientType}
          onChange={(value) => {
            formik.setFieldValue("clientType", value);
          }}
        />
      )
    },
    {
      key: "marketer",
      label: t("saving_study:columns.marketer"),
      filterElement: <InputFormik name="marketer" />
    },
    {
      key: "selectedRate",
      label: t("saving_study:columns.rate"),
      filterElement: <InputFormik name="selectedRate" />
    },
    {
      key: "rateType",
      label: t("saving_study:columns.rateType"),
      filterElement: <InputFormik name="rateType" />
    },
    {
      key: "finalCost",
      label: t("saving_study:columns.rateCost")
    },
    {
      key: "totalCommission",
      label: t("saving_study:selectedRate.columns.totalCommission")
    },
    {
      key: "savingRelative",
      label: t("saving_study:columns.relativeSaving")
    },
    {
      key: "savingAbsolute",
      label: t("saving_study:columns.absoluteSaving")
    },
    {
      key: "status",
      label: t("saving_study:columns.status"),
      filterElement: (
        <Selector
          name="status"
          options={studyStatusOptions}
          onChange={(value) => {
            formik.setFieldValue("status", value);
          }}
          value={formik.values.status}
        />
      )
    },
    {
      key: "createdAt",
      label: t("saving_study:columns.createdAt"),
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
      label: t("saving_study:columns.responsible"),
      filterElement: <InputFormik name="responsible" />
    }
  ];

  const actions: Array<IAction<SavingStudyModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: SavingStudyModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: SavingStudyModel) => navigate(EDIT_PAGE_PATH + selectedItem.id),
        hideButton: (selectedItem: SavingStudyModel) => selectedItem.status === StudyStatus.COMPLETED
      },
      {
        text: t("common:actions.remove"),
        onClick: (selectedItem) => onClickDelete(selectedItem.id)
      },
      {
        text: t("saving_study:actions.duplicate"),
        onClick: (selectedItem: SavingStudyModel) => onClickDuplicate(selectedItem.id)
      }
    ],
    [t, onClickDelete, navigate, onClickDuplicate]
  );

  return (
    <BackofficePage
      title={t("saving_study:savingStudies")}
      Icon={BarChart}
      createUrl={paths.savingStudy.index + paths.savingStudy.create}
      createButtonText={t("saving_study:actions.save")}
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
            tableTitle={t("saving_study:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<SavingStudyModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
