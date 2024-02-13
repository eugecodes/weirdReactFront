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
import type { ClientModel } from "@/src/core/client/domain/models/client_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { clientTypeOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";
import { useListClientProvider } from "@/src/ui/pages/client/views/client_page/provider/list_client.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import useListFilters from "@/src/ui/hooks/useListFilters";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { getBooleanTranslation, getClientTypeTranslation } from "@/src/ui/i18n/utils";
import LargeTable from "@/src/ui/components/table/large_table";
import Enabled from "@/src/ui/components/enabled/enabled";

export default function ClientPage() {
  const { t } = useTranslation(["client", "common"]);
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
    getAll: getClients,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListClientProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getClients(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClient = useCallback(debounce(getClients, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceClient(formik.values);
  }, [debounceClient, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("client:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await ClientController.delete(id);
          onCloseModal();
          await getClients(formik.values);
          showToast({ message: t("client:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getClients, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<ClientModel>> = [
    {
      key: "id"
    },
    {
      key: "isActive",
      render: (value) => <Enabled isEnabled={value as boolean} />
    },
    {
      key: "alias"
    },
    {
      key: "fiscalName"
    },
    {
      key: "cif"
    },
    {
      key: "clientType",
      render: (value) => {
        return <span>{getClientTypeTranslation(value as ClientType)}</span>;
      }
    },
    {
      key: "invoiceEmail"
    },
    {
      key: "invoicePostal"
    },
    {
      key: "bankAccountHolder"
    },
    {
      key: "bankAccountNumber"
    },
    {
      key: "isRenewable",
      render: (value) => {
        return <span>{getBooleanTranslation(value as boolean)}</span>;
      }
    },
    {
      key: "createdAt"
    },
    {
      key: "user",
      render: (value) => <span>{value ? (value as UserModel).name : ""}</span>
    }
  ];

  const headCells: Array<HeadCell<ClientModel>> = [
    {
      key: "id",
      label: t("client:columns.id"),
      filterElement: <InputFormik name="id" />
    },
    {
      key: "isActive",
      label: t("client:columns.isActive"),
      filterElement: <InputFormik name="isActive" />
    },
    {
      key: "alias",
      label: t("client:columns.alias"),
      filterElement: <InputFormik name="alias" />
    },
    {
      key: "fiscalName",
      label: t("client:columns.fiscalName"),
      filterElement: <InputFormik name="fiscalName" />
    },
    {
      key: "cif",
      label: t("client:columns.cif"),
      filterElement: <InputFormik name="cif" />
    },
    {
      key: "clientType",
      label: t("client:columns.clientType"),
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
      key: "invoiceEmail",
      label: t("client:columns.invoiceEmail"),
      filterElement: <InputFormik name="invoiceEmail" />
    },
    {
      key: "invoicePostal",
      label: t("client:columns.invoicePostal"),
      filterElement: <InputFormik name="invoicePostal" />
    },
    {
      key: "bankAccountHolder",
      label: t("client:columns.bankAccountHolder"),
      filterElement: <InputFormik name="bankAccountHolder" />
    },
    {
      key: "bankAccountNumber",
      label: t("client:columns.bankAccountNumber"),
      filterElement: <InputFormik name="bankAccountNumber" />
    },
    {
      key: "isRenewable",
      label: t("client:columns.isRenewable"),
      filterElement: <InputFormik name="isRenewable" />
    },
    {
      key: "createdAt",
      label: t("client:columns.createdAt"),
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
      key: "user",
      label: t("client:columns.user"),
      filterElement: <InputFormik name="user" />
    }
  ];

  const actions: Array<IAction<ClientModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: ClientModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: ClientModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.remove"),
        onClick: (selectedItem) => onClickDelete(selectedItem.id)
      }
    ],
    [t, onClickDelete, navigate]
  );

  return (
    <BackofficePage
      title={t("client:clients")}
      Icon={BarChart}
      createUrl={paths.client.index + paths.client.create}
      createButtonText={t("client:actions.save")}
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
            tableTitle={t("client:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<ClientModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
