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
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { energyTypeOptions } from "@/src/ui/utils/selector_options";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths, { DETAIL_PAGE_PATH, EDIT_PAGE_PATH } from "@/src/ui/router/paths";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import { useListSupplyPointProvider } from "@/src/ui/pages/supply_point/views/supply_point_page/provider/list_supply_point.provider";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import { toJson } from "@/src/common/utils/transformers";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import type { Id } from "@/src/common/utils/types";
import useListFilters from "@/src/ui/hooks/useListFilters";
import { getBooleanTranslation, getEnergyTypeTranslation } from "@/src/ui/i18n/utils";
import LargeTable from "@/src/ui/components/table/large_table";
import Enabled from "@/src/ui/components/enabled/enabled";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { ClientModel } from "@/src/core/client/domain/models/client_model";

export default function SupplyPointPage() {
  const { t } = useTranslation(["supply_point", "common"]);
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
    getAll: getSupplyPoints,
    filters,
    orderBy,
    setOrderBy,
    handleDeleteSelected,
    handleDownloadSelected,
    handleDownloadAll
  } = useListSupplyPointProvider((state) => state);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getSupplyPoints(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSupplyPoint = useCallback(debounce(getSupplyPoints, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceSupplyPoint(formik.values);
  }, [debounceSupplyPoint, formik.values]);

  const { isClearButtonDisabled, resetFilters } = useListFilters({ formik, setOrderBy, orderBy });

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("supply_point:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await SupplyPointController.delete(id);
          onCloseModal();
          await getSupplyPoints(formik.values);
          showToast({ message: t("supply_point:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getSupplyPoints, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<SupplyPointModel>> = [
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
      key: "cups"
    },
    {
      key: "energyType",
      render: (value) => {
        return <span>{getEnergyTypeTranslation(value as EnergyTypes)}</span>;
      }
    },
    {
      key: "supplyAddress"
    },
    {
      key: "supplyPostalCode"
    },
    {
      key: "supplyCity"
    },
    {
      key: "supplyProvince"
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
      key: "client",
      render: (value) => <span>{value ? (value as ClientModel).fiscalName : ""}</span>
    },
    {
      key: "user",
      render: (value) => <span>{value ? (value as UserModel).name : ""}</span>
    }
  ];

  const headCells: Array<HeadCell<SupplyPointModel>> = [
    {
      key: "id",
      label: t("supply_point:columns.id"),
      filterElement: <InputFormik name="id" />
    },
    {
      key: "isActive",
      label: t("supply_point:columns.isActive"),
      filterElement: <InputFormik name="isActive" />
    },
    {
      key: "alias",
      label: t("supply_point:columns.alias"),
      filterElement: <InputFormik name="alias" />
    },
    {
      key: "cups",
      label: t("supply_point:columns.cups"),
      filterElement: <InputFormik name="cups" />
    },
    {
      key: "energyType",
      label: t("supply_point:columns.energyType"),
      filterElement: (
        <Selector
          name="energyType"
          options={energyTypeOptions}
          value={formik.values.energyType}
          onChange={(value) => {
            formik.setFieldValue("energyType", value);
          }}
        />
      )
    },
    {
      key: "supplyAddress",
      label: t("supply_point:columns.supplyAddress"),
      filterElement: <InputFormik name="supplyAddress" />
    },
    {
      key: "supplyPostalCode",
      label: t("supply_point:columns.supplyPostalCode"),
      filterElement: <InputFormik name="supplyPostalCode" />
    },
    {
      key: "supplyCity",
      label: t("supply_point:columns.supplyCity"),
      filterElement: <InputFormik name="supplyCity" />
    },
    {
      key: "supplyProvince",
      label: t("supply_point:columns.supplyProvince"),
      filterElement: <InputFormik name="supplyProvince" />
    },
    {
      key: "isRenewable",
      label: t("supply_point:columns.isRenewable"),
      filterElement: <InputFormik name="isRenewable" />
    },
    {
      key: "createdAt",
      label: t("supply_point:columns.createdAt"),
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
      key: "client",
      label: t("supply_point:columns.client"),
      filterElement: <InputFormik name="client" />
    },
    {
      key: "user",
      label: t("supply_point:columns.user"),
      filterElement: <InputFormik name="user" />
    }
  ];

  const actions: Array<IAction<SupplyPointModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: SupplyPointModel) => navigate(DETAIL_PAGE_PATH + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: SupplyPointModel) => navigate(EDIT_PAGE_PATH + selectedItem.id)
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
      title={t("supply_point:supply_points")}
      Icon={BarChart}
      createUrl={paths.supplyPoint.index + paths.supplyPoint.create}
      createButtonText={t("supply_point:actions.save")}
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
            tableTitle={t("supply_point:tableName")}
            onResetFilters={resetFilters}
            page={page}
            onChangePage={setPage}
            rowsPerPage={size}
            onChangeRowsPerPage={setSize}
            totalItems={total}
            isClearFiltersButtonDisabled={isClearButtonDisabled}
            isLoading={isLoading}
            onChangeSort={setOrderBy}
            sortBy={toJson(orderBy) as OrderBy<SupplyPointModel>}
            handleDeleteSelected={handleDeleteSelected}
            handleDownloadSelected={handleDownloadSelected}
            handleDownloadAll={handleDownloadAll}
          />
        </Form>
      </FormikProvider>
    </BackofficePage>
  );
}
