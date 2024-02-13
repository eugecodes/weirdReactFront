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
import dayjs from "dayjs";
import { DATE_FORMAT_TO_SHOW } from "@/src/common/utils/dates";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import ContractController from "@/src/ui/pages/contract/controllers/contract_controller";
import { useListContractProvider } from "@/src/ui/pages/contract/views/contract_page/provider/list_contract.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import useListFilters from "@/src/ui/hooks/useListFilters";
import LargeTable from "@/src/ui/components/table/large_table";
import Enabled from "@/src/ui/components/enabled/enabled";
import { getContractStatus } from "@/src/ui/utils";

export default function ContractPage() {
  const { t } = useTranslation(["contract", "common"]);
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
    getAll: getContracts,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListContractProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getContracts(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceContract = useCallback(debounce(getContracts, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceContract(formik.values);
  }, [debounceContract, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("contract:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await ContractController.delete(id);
          onCloseModal();
          await getContracts(formik.values);
          showToast({ message: t("contract:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getContracts, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<ContractModel>> = [
    {
      key: "id"
    },
    {
      key: "isActive",
      render: (value) => <Enabled isEnabled={value as boolean} />
    },
    {
      key: "status",
      render: (value) => <span>{getContractStatus(String(value))}</span>
    },
    {
      key: "client"
    },
    {
      key: "cif"
    },
    {
      key: "supplyAlias"
    },
    {
      key: "cups"
    },
    {
      key: "supplyAddress"
    },
    {
      key: "supplyCity"
    },
    {
      key: "supplyProvince"
    },
    {
      key: "rateType"
    },
    {
      key: "rateName"
    },
    {
      key: "preferredStartDate"
    },
    {
      key: "startDate"
    },
    {
      key: "expectedEndDate"
    },
    {
      key: "endDate"
    }
  ];

  const headCells: Array<HeadCell<ContractModel>> = [
    {
      key: "id",
      label: t("contract:columns.id"),
      filterElement: <InputFormik name="id" />
    },
   /*  {
      key: "isActive",
      label: t("contract:columns.isActive"),
      filterElement: <InputFormik name="isActive" />
    }, */
    {
      key: "status",
      label: t("contract:columns.status"),
      filterElement: <InputFormik name="status" />
    },
    {
      key: "client",
      label: t("contract:columns.client"),
      filterElement: <InputFormik name="client" />
    },
    {
      key: "cif",
      label: t("contract:columns.cif"),
      filterElement: <InputFormik name="cif" />
    },
    {
      key: "supplyAlias",
      label: t("contract:columns.alias"),
      filterElement: <InputFormik name="alias" />
    },
    {
      key: "cups",
      label: t("contract:columns.cups"),
      filterElement: <InputFormik name="cups" />
    },
    {
      key: "supplyAddress",
      label: t("contract:columns.supplyAddress"),
      filterElement: <InputFormik name="supplyAddress" />
    },
    {
      key: "supplyCity",
      label: t("contract:columns.supplyCity"),
      filterElement: <InputFormik name="supplyCity" />
    },
    {
      key: "supplyProvince",
      label: t("contract:columns.supplyProvince"),
      filterElement: <InputFormik name="supplyProvince" />
    },
    {
      key: "rateType",
      label: t("contract:columns.rateType"),
      filterElement: <InputFormik name="rateType" />
    },
    {
      key: "rateName",
      label: t("contract:columns.rateName"),
      filterElement: <InputFormik name="rateName" />
    },
    {
      key: "preferredStartDate",
      label: t("contract:columns.preferredStartDate"),
      filterElement: (
        <DatePicker
          value={formik.values.createdAt || null}
          label={t("common:columns.date")}
          onChange={(value) => {
            let formatedDate = null;
            if (value) {
              formatedDate = dayjs(value).format(DATE_FORMAT_TO_SHOW);
            }
            formik.setFieldValue("preferredStartDate", formatedDate);
          }}
        />
      )
    },
    {
      key: "startDate",
      label: t("contract:columns.startDate"),
      filterElement: (
        <DatePicker
          value={formik.values.createdAt || null}
          label={t("common:columns.date")}
          onChange={(value) => {
            let formatedDate = null;
            if (value) {
              formatedDate = dayjs(value).format(DATE_FORMAT_TO_SHOW);
            }
            formik.setFieldValue("startDate", formatedDate);
          }}
        />
      )
    },
    {
      key: "expectedEndDate",
      label: t("contract:columns.expectedEndDate"),
      filterElement: (
        <DatePicker
          value={formik.values.createdAt || null}
          label={t("common:columns.date")}
          onChange={(value) => {
            let formatedDate = null;
            if (value) {
              formatedDate = dayjs(value).format(DATE_FORMAT_TO_SHOW);
            }
            formik.setFieldValue("expectedEndDate", formatedDate);
          }}
        />
      )
    },
    {
      key: "endDate",
      label: t("contract:columns.endDate"),
      filterElement: (
        <DatePicker
          value={formik.values.createdAt || null}
          label={t("common:columns.date")}
          onChange={(value) => {
            let formatedDate = null;
            if (value) {
              formatedDate = dayjs(value).format(DATE_FORMAT_TO_SHOW);
            }
            formik.setFieldValue("endDate", formatedDate);
          }}
        />
      )
    }
  ];

  const actions: Array<IAction<ContractModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: ContractModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("contract:actions.status"),
        onClick: (selectedItem: ContractModel) => navigate(paths.contract.index + paths.contract.status + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: ContractModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
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
      title={t("contract:contracts")}
      Icon={BarChart}
      createUrl={paths.contract.index + paths.contract.create}
      createButtonText={t("contract:actions.save")}
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
            tableTitle={t("contract:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<ContractModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
