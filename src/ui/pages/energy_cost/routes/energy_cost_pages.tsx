import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useListEnergyCostProvider } from "@/src/ui/pages/energy_cost/views/energy_cost_page/provider/list_energy_cost.provider";
import { useMutationEnergyCostProvider } from "@/src/ui/pages/energy_cost/provider/mutatiton_energy_cost.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

const ListEnergyCostPage = lazy(() => import("@/src/ui/pages/energy_cost/views/energy_cost_page/energy_cost_page"));
const CreateEnergyCostPage = lazy(() => import("@/src/ui/pages/energy_cost/views/create_energy_cost_page/create_energy_cost_page"));
const DetailEnergyCostPage = lazy(() => import("@/src/ui/pages/energy_cost/views/detail_energy_cost_page/detail_energy_cost_page"));
const EditEnergyCostPage = lazy(() => import("@/src/ui/pages/energy_cost/views/edit_energy_cost_page/edit_energy_cost_page"));

const ID_PATH_PARAM = ":energyCostId";

export default function EnergyCostPages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListEnergyCostProvider.State>
          <ListEnergyCostPage />
        </useListEnergyCostProvider.State>
      )
    },
    {
      path: paths.energyCost.create,
      element: <CreateEnergyCostPage />
    },
    {
      path: paths.energyCost.detail + ID_PATH_PARAM,
      element: <DetailEnergyCostPage />
    },
    {
      path: paths.energyCost.edit + ID_PATH_PARAM,
      element: <EditEnergyCostPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.energyCost.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="energy-cost-error">
      <useMutationEnergyCostProvider.State>{page}</useMutationEnergyCostProvider.State>
    </AppErrorBoundary>
  );
}
