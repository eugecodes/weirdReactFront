import { Navigate, useRoutes } from "react-router-dom";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useMutationContractProvider } from "@/src/ui/pages/contract/provider/mutation_contract.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import React, { lazy } from "react";
import { useListContractProvider } from "@/src/ui/pages/contract/views/contract_page/provider/list_contract.provider";
import { useAutocompleteClientsProvider } from "@/src/ui/pages/contract/provider/autocomplete_client.provider";
import { useAutocompleteSupplyPointsProvider } from "../provider/autocomplete_supply_points.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { useAutocompleteMarketersProvider } from "@/src/ui/pages/rate/provider/autocomplete_marketer.provider";

const ListContractPage = lazy(() => import("@/src/ui/pages/contract/views/contract_page/contract_page"));
const CreateContractPage = lazy(() => import("@/src/ui/pages/contract/views/create_contract_page/create_contract_page"));
const DetailContractPage = lazy(() => import("@/src/ui/pages/contract/views/detail_contract_page/detail_contract_page"));
const EditContractPage = lazy(() => import("@/src/ui/pages/contract/views/edit_contract_page/edit_contract_page"));
const ContractStatusPage = lazy(() => import("@/src/ui/pages/contract/views/contract_status_page/contract_status_page"));

const ID_PATH_PARAM = ":contractId";

export default function ContractPages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListContractProvider.State>
          <ListContractPage />
        </useListContractProvider.State>
      )
    },
    {
      path: paths.contract.create,
      element: (
        <useAutocompleteClientsProvider.State builderProps={{ filterByActiveClients: true }}>
          <useAutocompleteSupplyPointsProvider.State>
            <useAutocompleteRateTypesProvider.State
              builderProps={{
                filterByActiveRateTypes: true
              }}
            >
              <useAutocompleteMarketersProvider.State
                builderProps={{
                  filterByActiveMarketers: true
                }}
              >
                <useAutocompleteRateProvider.State
                  builderProps={{
                    filterByActiveRate: true
                  }}
                >
                  <CreateContractPage />
                </useAutocompleteRateProvider.State>
              </useAutocompleteMarketersProvider.State>
            </useAutocompleteRateTypesProvider.State>
          </useAutocompleteSupplyPointsProvider.State>
        </useAutocompleteClientsProvider.State>
      )
    },
    {
      path: paths.contract.detail + ID_PATH_PARAM,
      element: <DetailContractPage />
    },
    {
      path: paths.contract.edit + ID_PATH_PARAM,
      element: (
        <useAutocompleteRateTypesProvider.State
          builderProps={{
            filterByActiveRateTypes: true
          }}
        >
          <useAutocompleteMarketersProvider.State
            builderProps={{
              filterByActiveMarketers: true
            }}
          >
            <useAutocompleteRateProvider.State
              builderProps={{
                filterByActiveRate: true
              }}
            >
              <EditContractPage />
            </useAutocompleteRateProvider.State>
          </useAutocompleteMarketersProvider.State>
        </useAutocompleteRateTypesProvider.State>
      )
    },
    {
      path: paths.contract.status + ID_PATH_PARAM,
      element: <ContractStatusPage />
    },
    {
      path: WILDCARD_PATH,
      element: <Navigate to={paths.contract.index} replace />
    }
  ]);
  return (
    <AppErrorBoundary key="contract-error">
      <useMutationContractProvider.State>{page}</useMutationContractProvider.State>
    </AppErrorBoundary>
  );
}
