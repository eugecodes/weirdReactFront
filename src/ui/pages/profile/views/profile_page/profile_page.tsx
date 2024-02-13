import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import Enabled from "@/src/ui/components/enabled/enabled";
import Role from "@/src/ui/components/role/role";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { Face } from "@/src/ui/assets/icons";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import Selector from "@/src/ui/components/selector/selector";
import { selectorRoles } from "@/src/common/utils/roles";
import dayjs from "dayjs";
import { DATE_FORMAT_TO_SHOW } from "@/src/common/utils/dates";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { statusOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useListProfileProvider } from "./provider/list_profile.provider";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import ProfileController from "../../controllers/profile_controller";
import type { ProfileFilterValues } from "./view_models/profile_filter_values";
import { toJson } from "@/src/common/utils/transformers";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import type { Id } from "@/src/common/utils/types";
import Table from "@/src/ui/components/table/table";
import useListFilters from "@/src/ui/hooks/useListFilters";

const columns: Array<IColumn<ProfileModel>> = [
  {
    key: "name"
  },
  {
    key: "surnames"
  },
  {
    key: "email"
  },
  {
    key: "role",
    render: (value) => <Role role={(value as number) || 1} />
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
];

export default function ProfilePage() {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const {
    isLoading,
    rows,
    page,
    total,
    size,
    setPage,
    setSize,
    getAll: getProfiles,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadAll,
    handleDownloadSelected
  } = useListProfileProvider((state) => state);
  const { showToast } = useShowToast();

  const profiles = useCallback(
    async (item: ProfileFilterValues) => {
      getProfiles(item);
    },
    [getProfiles]
  );

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => profiles(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceProfile = useCallback(debounce(profiles, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceProfile(formik.values);
  }, [debounceProfile, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("sure.delete"),
        primaryModalButtonText: t("actions.remove"),
        onClickPrimaryButton: async () => {
          await ProfileController.delete(id);
          onCloseModal();
          await profiles(formik.values);
          showToast({ message: t("actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [profiles, onCloseModal, t, formik.values, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("sure.disable") : t("sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("actions.disable") : t("actions.enable"),
        onClickPrimaryButton: async () => {
          await ProfileController.toogleActive(id, currentActiveValue);
          onCloseModal();
          showToast({ message: t(currentActiveValue ? "actions.disabled" : "actions.enabled") });
          await profiles(formik.values);
        }
      };
      setModalData(newModalData);
    },
    [profiles, onCloseModal, t, formik.values, showToast]
  );

  const headCells: Array<HeadCell<ProfileModel>> = useMemo(
    () => [
      {
        key: "name",
        label: t("columns.name"),
        filterElement: <InputFormik name="name" />
      },
      {
        key: "surnames",
        label: t("columns.surnames"),
        filterElement: <InputFormik name="surnames" />
      },
      {
        key: "email",
        label: t("columns.mail"),
        filterElement: <InputFormik name="email" />
      },
      {
        key: "role",
        label: t("columns.type"),
        filterElement: (
          <Selector name="role" options={selectorRoles} value={formik.values.role} onChange={(newType) => formik.setFieldValue("role", newType)} />
        )
      },
      {
        key: "enabled",
        label: t("columns.state"),
        filterElement: (
          <Selector
            name="isActive"
            options={statusOptions}
            value={formik.values.enabled}
            onChange={(newStatus) => formik.setFieldValue("enabled", newStatus)}
          />
        )
      },
      {
        key: "createdAt",
        label: t("columns.createdAt"),
        filterElement: (
          <DatePicker
            value={formik.values.createdAt || null}
            label={t("date")}
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
        label: t("columns.responsible"),
        filterElement: <InputFormik name="responsible" />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, formik.values.role, formik.values.enabled, formik.values.createdAt, statusOptions]
  );

  const actions: Array<IAction<ProfileModel>> = useMemo(
    () => [
      {
        text: t("actions.view"),
        onClick: (selectedItem: ProfileModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("actions.edit"),
        onClick: (selectedItem: ProfileModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
      },
      {
        render: (item) => <>{item.enabled ? t("actions.disable") : t("actions.enable")}</>,
        onClick: (selectedItem) => onClickActive(selectedItem.id, selectedItem.enabled)
      },
      {
        text: t("actions.remove"),
        onClick: (selectedItem) => onClickDelete(selectedItem.id)
      }
    ],
    [t, onClickActive, onClickDelete, navigate]
  );

  return (
    <BackofficePage
      title={t("profiles")}
      Icon={Face}
      createUrl={paths.profile.index + paths.profile.create}
      createButtonText={t("actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}
    >
      <FormikProvider value={formik}>
        <Form>
          <Table
            rows={rows}
            headCells={headCells}
            columns={columns}
            actions={actions}
            tableTitle={t("tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<ProfileModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
