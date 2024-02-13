import type { HeadCell, IAction, IColumn } from "@/src/ui/components/table/types";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { debounce } from "lodash";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useListContactProvider } from "@/src/ui/pages/client/views/detail_client_page/components/detail_client/tabs/list_contacts/provider/list_contacts.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import TabsListPage from "@/src/ui/components/tabs_list_page/tabs_list_page";
import useListFilters from "@/src/ui/hooks/useListFilters";
import LargeTable from "@/src/ui/components/table/large_table";
import DatePicker from "@/src/ui/components/date_picker/date_picker";
import { DATE_FORMAT_TO_SHOW } from "@/src/common/utils/dates";
import dayjs from "dayjs";
import type { ContactModel } from "@/src/core/contact/domain/models/contact_model";
import ContactController from "@/src/ui/pages/contact/controllers/contact_controller";
import { getBooleanTranslation } from "@/src/ui/i18n/utils";

export default function ListContactPage() {
  const { t } = useTranslation(["client", "contact", "common"]);
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
    getAll: getContacts,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListContactProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getContacts(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceContact = useCallback(debounce(getContacts, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceContact(formik.values);
  }, [debounceContact, formik.values]);

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
          await ContactController.delete(id);
          onCloseModal();
          await getContacts(formik.values);
          showToast({ message: t("client:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getContacts, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<ContactModel>> = useMemo(
    () => [
      {
        key: "name"
      },
      {
        key: "email"
      },
      {
        key: "phone"
      },
      {
        key: "isMainContact",
        render: (value) => <span>{getBooleanTranslation(value as boolean)}</span>
      },
      {
        key: "createdAt"
      }
    ],
    []
  );

  const headCells: Array<HeadCell<ContactModel>> = useMemo(
    () => [
      {
        key: "name",
        label: t("client:contact.name"),
        filterElement: <InputFormik name="name" />
      },
      {
        key: "email",
        label: t("client:contact.email"),
        filterElement: <InputFormik name="email" />
      },
      {
        key: "phone",
        label: t("client:contact.phone"),
        filterElement: <InputFormik name="phone" />
      },
      {
        key: "isMainContact",
        label: t("client:contact.isMainContact"),
        filterElement: <InputFormik name="isMainContact" />
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
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, formik.values.createdAt]
  );

  const actions: Array<IAction<ContactModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: ContactModel) => navigate(paths.contact.index + paths.contact.detail + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: ContactModel) => navigate(paths.contact.index + paths.contact.edit + selectedItem.id)
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
      title={t("client:contacts")}
      createUrl={paths.contact.index + paths.contact.create + `?clientId=${filters.clientId}`}
      createButtonText={t("contact:actions.save")}
      showModal={showModal}
      onCloseModal={onCloseModal}
      modalPrimaryButtonText={modalData?.primaryModalButtonText}
      modalDescription={modalData?.description}
      onPrimaryButtonClick={modalData?.onClickPrimaryButton}
    >
      <FormikProvider value={formik}>
        <Form>
          <LargeTable
            renderSubheader={() => (
              <>
                <th colSpan={6}></th>
                <th colSpan={4}></th>
              </>
            )}
            rows={rows}
            headCells={headCells}
            columns={columns}
            actions={actions}
            tableTitle={t("client:contacts")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<ContactModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
            customHandleRowClick={(selectedItem) => {
              navigate(paths.contact.index + paths.contact.detail + selectedItem?.id);
              return true;
            }}
          />
        </Form>
      </FormikProvider>
    </TabsListPage>
  );
}
