import { Navigate, useRoutes } from "react-router-dom";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationSavingStudyProvider } from "@/src/ui/pages/saving_study/provider/mutation_saving_study.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { lazy } from "react";
import { useListSavingStudyProvider } from "@/src/ui/pages/saving_study/views/saving_study_page/provider/list_saving_study.provider";
import { useListSuggestedRatesProvider } from "@/src/ui/pages/saving_study/views/select_rate_page/provider/list_suggested_rates.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";

const ListSalvingStudyPage = lazy(() => import("@/src/ui/pages/saving_study/views/saving_study_page/saving_study_page"));
const CreateSavingsStudyPage = lazy(() => import("@/src/ui/pages/saving_study/views/create_saving_study_page/create_saving_study_page"));
const DetailSalvingStudyPage = lazy(() => import("@/src/ui/pages/saving_study/views/detail_saving_study_page/detail_saving_study_page"));
const EditSavingStudyPage = lazy(() => import("@/src/ui/pages/saving_study/views/edit_saving_study_page/edit_saving_study_page"));
const SelectRatePage = lazy(() => import("@/src/ui/pages/saving_study/views/select_rate_page/select_rate_page"));

const ID_PATH_PARAM = ":savingStudyId";

export default function SalvingStudyPages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListSavingStudyProvider.State>
          <ListSalvingStudyPage />
        </useListSavingStudyProvider.State>
      )
    },
    {
      path: paths.savingStudy.create,
      element: (
        <useAutocompleteRateTypesProvider.State builderProps={{ filterByActiveRateTypes: true }}>
          <CreateSavingsStudyPage />
        </useAutocompleteRateTypesProvider.State>
      )
    },
    {
      path: paths.savingStudy.detail + ID_PATH_PARAM,
      element: <DetailSalvingStudyPage />
    },
    {
      path: paths.savingStudy.edit + ID_PATH_PARAM,
      element: (
        <useAutocompleteRateTypesProvider.State builderProps={{ filterByActiveRateTypes: true }}>
          <EditSavingStudyPage />
        </useAutocompleteRateTypesProvider.State>
      )
    },
    {
      path: "/" + ID_PATH_PARAM + paths.savingStudy.selectRate,
      element: (
        <useListSuggestedRatesProvider.State>
          <SelectRatePage />
        </useListSuggestedRatesProvider.State>
      )
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.savingStudy.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="saving_study-error">
      <useMutationSavingStudyProvider.State>{page}</useMutationSavingStudyProvider.State>
    </AppErrorBoundary>
  );
}
