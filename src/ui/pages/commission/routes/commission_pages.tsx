import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationCommissionProvider } from "@/src/ui/pages/commission/provider/mutation_commission.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

const CreateCommissionPage = lazy(() => import("@/src/ui/pages/commission/views/create_commission_page/create_commission_page"));
const DetailCommissionPage = lazy(() => import("@/src/ui/pages/commission/views/detail_commission_page/detail_commission_page"));
const EditCommissionPage = lazy(() => import("@/src/ui/pages/commission/views/edit_commission_page/edit_commission_page"));

const ID_PATH_PARAM = ":commissionId";

export default function CommissionPages() {
  const page = useRoutes([
    {
      path: paths.commission.create,
      element: <CreateCommissionPage />
    },
    {
      path: paths.commission.detail + ID_PATH_PARAM,
      element: <DetailCommissionPage />
    },
    {
      path: paths.commission.edit + ID_PATH_PARAM,
      element: <EditCommissionPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.commission.create} replace /> }
  ]);
  return (
    <AppErrorBoundary key="commission-error">
      <useAutocompleteRateTypesProvider.State
        builderProps={{
          filterByActiveRateTypes: true
        }}>
        <useAutocompleteRateProvider.State
          builderProps={{
            filterByActiveRate: true
          }}>
          <useMutationCommissionProvider.State>{page}</useMutationCommissionProvider.State>
        </useAutocompleteRateProvider.State>
      </useAutocompleteRateTypesProvider.State>
    </AppErrorBoundary>
  );
}
