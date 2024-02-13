import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataGrid from "@/src/ui/components/table/data_grid/data_grid";
import { PriceType } from "@/src/core/app/enums/price_type";
import type { GridAlignment, GridPreProcessEditCellProps, GridRowModel } from "@mui/x-data-grid";
import { Form, FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { Button } from "@mui/material";
import Styled from "./select_rate_page.styled";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import useCancelButton from "@/src/ui/hooks/useCancelButton";
import { useListSuggestedRatesProvider } from "./provider/list_suggested_rates.provider";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { debounce } from "lodash";
import { DEFAULT_DEBOUNCE_TIME } from "@/src/common/utils";
import { booleanOptions } from "@/src/ui/utils/selector_options";
import Selector from "@/src/ui/components/selector/selector";
import { useNavigate, useParams } from "react-router-dom";
import { toJson } from "@/src/common/utils/transformers";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { SuggestedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/suggested_rate_model";
import SavingStudyController from "../../controllers/saving_study_controller";
import paths from "@/src/ui/router/paths";
import type { GridColDef } from "@mui/x-data-grid";
import { useUiProvider } from "@/src/ui/provider/ui.provider";
import useShowToast from "@/src/ui/hooks/useShowToast";
import { useMutationSavingStudyProvider } from "@/src/ui/pages/saving_study/provider/mutation_saving_study.provider";

function DecisionCell({ value }: { value: boolean }) {
  const { t } = useTranslation("rate", { keyPrefix: "decision" });
  return <>{value ? t("yes") : t("no")}</>;
}

export default function SelectRatePage() {
  const { t } = useTranslation(["rate", "common", "marketer_margin", "saving_study"]);
  const { showModal, onCloseModal, cancelAction } = useCancelButton({ condition: false });
  const [selectedRow, setSelectedRow] = useState<SuggestedRateModel>();
  const navigate = useNavigate();
  const setLoader = useUiProvider((state) => state.setLoader);
  const { showToast } = useShowToast();

  const onCancel = () => {
    navigate(paths.savingStudy.index);
  };

  const {
    page,
    total,
    rows,
    size,
    setPage,
    setSize,
    getAll: getSuggestedRates,
    filters,
    orderBy,
    setOrderBy,
    setSavingStudyId
  } = useListSuggestedRatesProvider((state) => state);
  const { savingStudyId } = useParams();
  const getSavingStudyById = useMutationSavingStudyProvider((state) => state.getById);
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);

  useEffectRunOnce(() => {
    setSavingStudyId(Number(savingStudyId));
    getSavingStudy();
  }, [savingStudyId]);

  const getSavingStudy = useCallback(async () => {
    if (savingStudyId) {
      const id = Number(savingStudyId);
      const response = await getSavingStudyById(id);
      if (!response) {
        navigate(paths.savingStudy.index);
      }
    }
  }, [getSavingStudyById, savingStudyId, navigate]);

  const formik = useFormik({
    initialValues: filters,
    onSubmit: (values) => getSuggestedRates(values)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSuggestedRates = useCallback(debounce(getSuggestedRates, DEFAULT_DEBOUNCE_TIME), []);

  useEffectRunOnce(() => {
    debounceSuggestedRates(formik.values);
  }, [debounceSuggestedRates, formik.values]);

  const resetFilters = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  const onEditRow = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    try {
      setLoader(true);
      return await SavingStudyController.editSuggestedRate(Number(savingStudyId), newRow as SuggestedRateModel);
    } catch (e) {
      return oldRow;
    } finally {
      setLoader(false);
    }
  };

  const onFinishSavingStudy = async () => {
    if (selectedRow) {
      const studyId = Number(savingStudyId);
      await SavingStudyController.finishSavingStudy(studyId, selectedRow.id);
      showToast({ message: t("saving_study:actions.finished") });
      navigate(paths.savingStudy.index + paths.savingStudy.detail + studyId);
    }
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "marketerName",
        flex: 100,
        headerName: t("marketer_margin:columns.marketer")
      },
      {
        field: "rateName",
        flex: 100,
        headerName: t("marketer_margin:columns.rate")
      },
      {
        field: "hasContractualCommitment",
        flex: 100,
        headerName: t("rate:columns.permanency"),
        renderCell: (params) => <DecisionCell value={params.value} />
      },
      {
        field: "duration",
        flex: 100,
        headerName: t("rate:columns.length")
      },
      {
        field: "renewable",
        flex: 100,
        headerName: t("rate:columns.isFullRenewable"),
        renderCell: (params) => <DecisionCell value={params.value} />
      },
      {
        field: "netMetering",
        flex: 100,
        headerName: t("rate:columns.compensationSurplus"),
        renderCell: (params) => <DecisionCell value={params.value} />
      },
      {
        field: "surplusPrice",
        flex: 100,
        headerName: t("rate:columns.compensationSurplusValue")
      },
      {
        field: "appliedProfitMargin",
        editable: true,
        type: "number",
        headerName: t("marketer_margin:columns.margin"),
        headerAlign: "left" as GridAlignment,
        flex: 100,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = params.props.value < 0;
          return { ...params.props, error: hasError };
        }
      },
      {
        field: "finalCost",
        flex: 100,
        headerName: t("saving_study:selectedRate.columns.finalCost")
      },
      {
        field: "totalCommission",
        flex: 100,
        headerName: t("saving_study:selectedRate.columns.totalCommission")
      },
      {
        field: "savingRelative",
        flex: 100,
        headerName: t("saving_study:selectedRate.columns.relativeSaving")
      },
      {
        field: "savingAbsolute",
        flex: 100,
        headerName: t("saving_study:selectedRate.columns.absoluteSaving")
      }
    ],
    [t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        headerText={savingStudy?.cups || ""}
        actions={cancelAction}
        showModal={showModal}
        modalPrimaryButtonText={t("common:keepEditing")}
        modalDescription={t("common:cancelDescription")}
        onSecondaryButtonClick={onCancel}
        onPrimaryButtonClick={onCloseModal}
      />
      <Styled.Header>
        <h1>{t("rate:choose")}</h1>
        <span>{t("rate:chooseDescription")}</span>
      </Styled.Header>
      <FormikProvider value={formik}>
        <Form>
          <Styled.FilterWrapper>
            <div>
              <InputFormik name="marketerName" />
            </div>
            <div>
              <InputFormik name="rateName" />
            </div>
            <div>
              <Selector
                name="hasContractualCommitment"
                options={booleanOptions}
                value={formik.values.hasContractualCommitment}
                onChange={(newStatus) => formik.setFieldValue("hasContractualCommitment", newStatus)}
              />
            </div>
            <div />
            <div>
              <Selector
                name="renewable"
                options={booleanOptions}
                value={formik.values.renewable}
                onChange={(newStatus) => formik.setFieldValue("renewable", newStatus)}
              />
            </div>
            <div>
              <Selector
                name="netMetering"
                options={booleanOptions}
                value={formik.values.netMetering}
                onChange={(newStatus) => formik.setFieldValue("netMetering", newStatus)}
              />
            </div>
            <div />
            <div />
            <Styled.CleanButtonWrapper>
              <Button variant="text" onClick={resetFilters}>
                {t("common:table.clean")}
              </Button>
            </Styled.CleanButtonWrapper>
          </Styled.FilterWrapper>
          <DataGrid
            rows={rows}
            columns={columns}
            isCellEditable={(params) => params.row.priceType === PriceType.FIXED_BASE}
            onEditRow={onEditRow}
            page={page}
            onChangePage={setPage}
            pageSize={size}
            onChangePageSize={setSize}
            totalItems={total}
            sortBy={toJson(orderBy) as OrderBy<SuggestedRateModel>}
            onChangeSort={setOrderBy}
            onChangeSelected={setSelectedRow}
            selected={selectedRow ? [selectedRow.id] : []}
          />

          <Styled.SelectRateFooter>
            <p>{selectedRow ? t("saving_study:choosedRate", { rate: selectedRow.rateName }) : t("saving_study:chooseRate")}</p>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedRow}
              onClick={() => {
                onFinishSavingStudy();
              }}
            >
              {t("saving_study:actions.finish")}
            </Button>
          </Styled.SelectRateFooter>
        </Form>
      </FormikProvider>
    </Styled.Page>
  );
}
