import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import Table from "@/src/ui/components/table/table";
import Enabled from "@/src/ui/components/enabled/enabled";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import BackofficePage from "@/src/ui/components/backoffice_page/backoffice_page";
import { Payments } from "@/src/ui/assets/icons";
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
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import { statusOptions } from "@/src/ui/utils/selector_options";
import { useListEnergyCostProvider } from "./provider/list_energy_cost.provider";
import EnergyCostController from "../../controllers/energy_cost_controller";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { Id } from "@/src/common/utils/types";
import useListFilters from "@/src/ui/hooks/useListFilters";

export default function EnergyCostPage() {
  const { t } = useTranslation(["energy_cost", "common"]);
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
    getAll: getEnergyCosts,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListEnergyCostProvider((state) => state);
  const { showToast } = useShowToast();

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getEnergyCosts(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceEnergyCost = useCallback(debounce(getEnergyCosts, 400), []);

  useEffectRunOnce(() => {
    debounceEnergyCost(formik.values);
  }, [debounceEnergyCost, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("energy_cost:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await EnergyCostController.delete(id);
          onCloseModal();
          await getEnergyCosts(formik.values);
          showToast({ message: t("energy_cost:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getEnergyCosts, onCloseModal, t, formik.values, showToast]
  );

  const onClickActive = useCallback(
    (id: Id, currentActiveValue: boolean) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: currentActiveValue ? t("energy_cost:sure.disable") : t("energy_cost:sure.enable"),
        primaryModalButtonText: currentActiveValue ? t("common:actions.disable") : t("common:actions.enable"),
        onClickPrimaryButton: async () => {
          await EnergyCostController.toogleActive(id, currentActiveValue);
          onCloseModal();
          await getEnergyCosts(formik.values);
          showToast({ message: t(currentActiveValue ? "energy_cost:actions.disabled" : "energy_cost:actions.enabled") });
        }
      };
      setModalData(newModalData);
    },
    [getEnergyCosts, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<EnergyCostModel>> = useMemo(
    () => [
      {
        key: "concept"
      },
      {
        key: "amount"
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
    []
  );

  const headCells: Array<HeadCell<EnergyCostModel>> = useMemo(
    () => [
      {
        key: "concept",
        label: t("energy_cost:columns.concept"),
        filterElement: <InputFormik name="concept" />
      },
      {
        key: "amount",
        label: t("energy_cost:columns.amount"),
        filterElement: <InputFormik min={0} name="amount" type="number" />
      },
      {
        key: "enabled",
        label: t("energy_cost:columns.state"),
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
        label: t("energy_cost:columns.createdAt"),
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
        label: t("energy_cost:columns.responsible"),
        filterElement: <InputFormik name="responsible" />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, formik.values.enabled, formik.values.createdAt]
  );

  const actions: Array<IAction<EnergyCostModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: EnergyCostModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: EnergyCostModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
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
      title={t("energy_cost:energyCosts")}
      Icon={Payments}
      createUrl={paths.energyCost.index + paths.energyCost.create}
      createButtonText={t("energy_cost:formTitle")}
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
            tableTitle={t("energy_cost:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            sortBy={orderBy as OrderBy<EnergyCostModel>}
            onChangeSort={setOrderBy}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
