import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationCostProvider } from "@/src/ui/pages/cost/provider/mutation_cost.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

const CreateCostPage = lazy(() => import("@/src/ui/pages/cost/views/create_cost_page/create_cost_page"));
const DetailCostPage = lazy(() => import("@/src/ui/pages/cost/views/detail_cost_page/detail_cost_page"));
const EditCostPage = lazy(() => import("@/src/ui/pages/cost/views/edit_cost_page/edit_cost_page"));

const ID_PATH_PARAM = ":costId";

export default function CostPages() {
  const page = useRoutes([
    {
      path: paths.cost.create,
      element: <CreateCostPage />
    },
    {
      path: paths.cost.detail + ID_PATH_PARAM,
      element: <DetailCostPage />
    },
    {
      path: paths.cost.edit + ID_PATH_PARAM,
      element: <EditCostPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.cost.create} replace /> }
  ]);
  return (
    <AppErrorBoundary key="cost-error">
      <useAutocompleteRateProvider.State
        builderProps={{
          filterByActiveRate: true
        }}>
        <useMutationCostProvider.State>{page}</useMutationCostProvider.State>
      </useAutocompleteRateProvider.State>
    </AppErrorBoundary>
  );
}
