import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useListMarketerProvider } from "@/src/ui/pages/marketer/views/marketer_page/provider/list_marketer.provider";
import { useMutationMarketerProvider } from "@/src/ui/pages/marketer/providers/mutation_marketer.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

const ListMarketerPage = lazy(() => import("@/src/ui/pages/marketer/views/marketer_page/marketer_page"));
const CreateMarketerPage = lazy(() => import("@/src/ui/pages/marketer/views/create_marketer_page/create_marketer_page"));
const EditMarketerPage = lazy(() => import("@/src/ui/pages/marketer/views/edit_marketer_page/edit_marketer_page"));
const DetailMarketerPage = lazy(() => import("@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page"));
const ID_PATH_PARAM = ":marketerId";

export default function MarketerPages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListMarketerProvider.State>
          <ListMarketerPage />
        </useListMarketerProvider.State>
      )
    },
    {
      path: paths.marketer.create,
      element: <CreateMarketerPage />
    },
    {
      path: paths.marketer.edit + ID_PATH_PARAM,
      element: <EditMarketerPage />
    },
    {
      path: paths.marketer.detail + ID_PATH_PARAM,
      element: <DetailMarketerPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.marketer.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="marketer-error">
      <useMutationMarketerProvider.State>{page}</useMutationMarketerProvider.State>
    </AppErrorBoundary>
  );
}
