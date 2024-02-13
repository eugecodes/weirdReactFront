import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationRateProvider } from "@/src/ui/pages/rate/provider/mutation_rate.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useListRateProvider } from "@/src/ui/pages/rate/provider/list_rate.provider";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

const CreateRatePage = lazy(() => import("@/src/ui/pages/rate/views/create_rate_page/create_rate_page"));
const DetailRatePage = lazy(() => import("@/src/ui/pages/rate/views/detail_rate_page/detail_rate_page"));
const EditRatePage = lazy(() => import("@/src/ui/pages/rate/views/edit_rate_page/edit_rate_page"));
const ListGasRatesPage = lazy(() => import("@/src/ui/pages/rate/views/list_gas_rate_page/list_gas_rate_page"));
const ListLightRatesPage = lazy(() => import("@/src/ui/pages/rate/views/list_light_rate_page/list_light_rate_page"));

const ID_PATH_PARAM = ":rateId";

export default function RatePages() {
  const page = useRoutes([
    {
      path: paths.rate.create,
      element: (
        <useAutocompleteMarketersProvider.State builderProps={{ filterByActiveMarketers: true }}>
          <useAutocompleteRateTypesProvider.State
            builderProps={{
              filterByActiveRateTypes: true
            }}>
            <CreateRatePage />
          </useAutocompleteRateTypesProvider.State>
        </useAutocompleteMarketersProvider.State>
      )
    },
    {
      path: paths.rate.gas,
      element: (
        <useAutocompleteRateTypesProvider.State builderProps={{ energyType: EnergyTypes.GAS }}>
          <useAutocompleteMarketersProvider.State>
            <useListRateProvider.State
              key={EnergyTypes.GAS}
              builderProps={{
                filters: {
                  energyType: EnergyTypes.GAS
                }
              }}>
              <ListGasRatesPage />
            </useListRateProvider.State>
          </useAutocompleteMarketersProvider.State>
        </useAutocompleteRateTypesProvider.State>
      )
    },
    {
      path: paths.rate.light,
      element: (
        <useAutocompleteRateTypesProvider.State builderProps={{ energyType: EnergyTypes.LIGHT }}>
          <useAutocompleteMarketersProvider.State>
            <useListRateProvider.State
              key={EnergyTypes.LIGHT}
              builderProps={{
                filters: {
                  energyType: EnergyTypes.LIGHT
                }
              }}>
              <ListLightRatesPage />
            </useListRateProvider.State>
          </useAutocompleteMarketersProvider.State>
        </useAutocompleteRateTypesProvider.State>
      )
    },
    {
      path: paths.rate.detail + ID_PATH_PARAM,
      element: <DetailRatePage />
    },
    {
      path: paths.rate.edit + ID_PATH_PARAM,
      element: (
        <useAutocompleteMarketersProvider.State builderProps={{ filterByActiveMarketers: true }}>
          <useAutocompleteRateTypesProvider.State
            builderProps={{
              filterByActiveRateTypes: true
            }}>
            <EditRatePage />
          </useAutocompleteRateTypesProvider.State>
        </useAutocompleteMarketersProvider.State>
      )
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.rate.create} replace /> }
  ]);
  return (
    <AppErrorBoundary key="rate-error">
      <useMutationRateProvider.State>{page}</useMutationRateProvider.State>
    </AppErrorBoundary>
  );
}
