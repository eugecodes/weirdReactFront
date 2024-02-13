import { Navigate, useRoutes } from "react-router-dom";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationClientProvider } from "@/src/ui/pages/client/provider/mutation_client.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { lazy } from "react";
import { useListClientProvider } from "@/src/ui/pages/client/views/client_page/provider/list_client.provider";

const ListClientPage = lazy(() => import("@/src/ui/pages/client/views/client_page/client_page"));
const CreateClientPage = lazy(() => import("@/src/ui/pages/client/views/create_client_page/create_client_page"));
const DetailClientPage = lazy(() => import("@/src/ui/pages/client/views/detail_client_page/detail_client_page"));
const EditClientPage = lazy(() => import("@/src/ui/pages/client/views/edit_client_page/edit_client_page"));

const ID_PATH_PARAM = ":clientId";

export default function ClientPages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListClientProvider.State>
          <ListClientPage />
        </useListClientProvider.State>
      )
    },
    {
      path: paths.client.create,
      element: <CreateClientPage />
    },
    {
      path: paths.client.detail + ID_PATH_PARAM,
      element: <DetailClientPage />
    },
    {
      path: paths.client.edit + ID_PATH_PARAM,
      element: <EditClientPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.client.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="client-error">
      <useMutationClientProvider.State>{page}</useMutationClientProvider.State>
    </AppErrorBoundary>
  );
}
