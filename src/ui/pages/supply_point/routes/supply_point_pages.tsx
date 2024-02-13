import { Navigate, useRoutes } from "react-router-dom";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationSupplyPointProvider } from "@/src/ui/pages/supply_point/provider/mutation_supply_point.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { lazy } from "react";
import { useListSupplyPointProvider } from "@/src/ui/pages/supply_point/views/supply_point_page/provider/list_supply_point.provider";
import { useAutocompleteClientsProvider } from "@/src/ui/pages/supply_point/provider/autocomplete_client.provider";

const ListSupplyPointPage = lazy(() => import("@/src/ui/pages/supply_point/views/supply_point_page/supply_point_page"));
const CreateSupplyPointPage = lazy(() => import("@/src/ui/pages/supply_point/views/create_supply_point_page/create_supply_point_page"));
const DetailSupplyPointPage = lazy(() => import("@/src/ui/pages/supply_point/views/detail_supply_point_page/detail_supply_point_page"));
const EditSupplyPointPage = lazy(() => import("@/src/ui/pages/supply_point/views/edit_supply_point_page/edit_supply_point_page"));

const ID_PATH_PARAM = ":supplyPointId";

export default function SupplyPointPages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListSupplyPointProvider.State>
          <ListSupplyPointPage />
        </useListSupplyPointProvider.State>
      )
    },
    {
      path: paths.supplyPoint.create,
      element: (
        <useAutocompleteClientsProvider.State builderProps={{ filterByActiveClients: true }}>
          <CreateSupplyPointPage />
        </useAutocompleteClientsProvider.State>
      )
    },
    {
      path: paths.supplyPoint.detail + ID_PATH_PARAM,
      element: <DetailSupplyPointPage />
    },
    {
      path: paths.supplyPoint.edit + ID_PATH_PARAM,
      element: <EditSupplyPointPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.supplyPoint.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="supply_point-error">
      <useMutationSupplyPointProvider.State>{page}</useMutationSupplyPointProvider.State>
    </AppErrorBoundary>
  );
}
