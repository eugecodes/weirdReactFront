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
import { useListSupplyPointProvider } from "@/src/ui/pages/client/views/detail_client_page/components/detail_client/tabs/list_supply_points/provider/list_supply_points.provider";
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
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import Enabled from "@/src/ui/components/enabled/enabled";
import { getBooleanTranslation, getEnergyTypeTranslation } from "@/src/ui/i18n/utils";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import Selector from "@/src/ui/components/selector/selector";
import { energyTypeOptions } from "@/src/ui/utils/selector_options";

export default function ListSupplyPointPage() {
  const { t } = useTranslation(["client", "supply_point", "common"]);
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
        description: t("client:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await SupplyPointController.delete(id);
          onCloseModal();
          await getSupplyPoints(formik.values);
          showToast({ message: t("client:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [getSupplyPoints, onCloseModal, t, formik.values, showToast]
  );

  const columns: Array<IColumn<SupplyPointModel>> = useMemo(
    () => [
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
      }
    ],
    []
  );

  const headCells: Array<HeadCell<SupplyPointModel>> = useMemo(
    () => [
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
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, formik.values.createdAt]
  );

  const actions: Array<IAction<SupplyPointModel>> = useMemo(
    () => [
      {
        text: t("common:actions.view"),
        onClick: (selectedItem: SupplyPointModel) => navigate(paths.supplyPoint.index + paths.supplyPoint.detail + selectedItem.id)
      },
      {
        text: t("common:actions.edit"),
        onClick: (selectedItem: SupplyPointModel) => navigate(paths.supplyPoint.index + paths.supplyPoint.edit + selectedItem.id)
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
      title={t("client:supply_points")}
      createUrl={paths.supplyPoint.index + paths.supplyPoint.create + `?clientId=${filters.clientId}`}
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
            tableTitle={t("client:supply_points")}
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
    </TabsListPage>
  );
}
