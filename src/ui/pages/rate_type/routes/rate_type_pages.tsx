import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useListRateTypeProvider } from "@/src/ui/pages/rate_type/views/rate_type_page/provider/list_rate_type.provider";
import { useMutationRateTypeProvider } from "@/src/ui/pages/rate_type/provider/mutation_rate_type.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

const ListRateTypePage = lazy(() => import("@/src/ui/pages/rate_type/views/rate_type_page/rate_type_page"));
const CreateRateTypePage = lazy(() => import("@/src/ui/pages/rate_type/views/create_rate_type_page/create_rate_type_page"));
const DetailRateTypePage = lazy(() => import("@/src/ui/pages/rate_type/views/detail_rate_type_page/detail_rate_type_page"));
const EditRateTypePage = lazy(() => import("@/src/ui/pages/rate_type/views/edit_rate_type_page/edit_rate_type_page"));

const ID_PATH_PARAM = ":rateTypeId";

export default function RateTypePages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListRateTypeProvider.State>
          <ListRateTypePage />
        </useListRateTypeProvider.State>
      )
    },
    {
      path: paths.rateType.create,
      element: <CreateRateTypePage />
    },
    {
      path: paths.rateType.detail + ID_PATH_PARAM,
      element: <DetailRateTypePage />
    },
    {
      path: paths.rateType.edit + ID_PATH_PARAM,
      element: <EditRateTypePage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.rateType.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="rate-type-error">
      <useMutationRateTypeProvider.State>{page}</useMutationRateTypeProvider.State>
    </AppErrorBoundary>
  );
}
