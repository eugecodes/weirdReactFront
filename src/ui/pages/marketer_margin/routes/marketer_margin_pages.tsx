import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationMarketerMarginProvider } from "@/src/ui/pages/marketer_margin/provider/mutation_marketer_margin.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { PriceType } from "@/src/core/app/enums/price_type";

const CreateMarketerMarginPage = lazy(() => import("@/src/ui/pages/marketer_margin/views/create_marketer_margin_page/create_marketer_margin_page"));
const DetailMarketerMarginPage = lazy(() => import("@/src/ui/pages/marketer_margin/views/detail_marketer_margin_page/detail_marketer_margin_page"));
const EditMarketerMarginPage = lazy(() => import("@/src/ui/pages/marketer_margin/views/edit_marketer_margin_page/edit_marketer_margin_page"));

const ID_PATH_PARAM = ":marketerMarginId";

export default function MarketerMarginPages() {
  const page = useRoutes([
    {
      path: paths.marketerMargin.create,
      element: <CreateMarketerMarginPage />
    },
    {
      path: paths.marketerMargin.detail + ID_PATH_PARAM,
      element: <DetailMarketerMarginPage />
    },
    {
      path: paths.marketerMargin.edit + ID_PATH_PARAM,
      element: <EditMarketerMarginPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.marketerMargin.create} replace /> }
  ]);
  return (
    <AppErrorBoundary key="marketerMargin-error">
      <useAutocompleteRateTypesProvider.State
        builderProps={{
          filterByActiveRateTypes: true
        }}>
        <useAutocompleteRateProvider.State
          builderProps={{
            filterByActiveRate: true,
            priceType: PriceType.FIXED_BASE
          }}>
          <useMutationMarketerMarginProvider.State>{page}</useMutationMarketerMarginProvider.State>
        </useAutocompleteRateProvider.State>
      </useAutocompleteRateTypesProvider.State>
    </AppErrorBoundary>
  );
}
