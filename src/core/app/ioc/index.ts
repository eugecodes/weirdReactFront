import "reflect-metadata";
import { Container } from "inversify";
import type { IEnvVars } from "@/src/core/app/domain/interfaces/env_vars";
import type { IRestDataSource } from "@/src/common/interfaces/rest_data_source";
import { bindDynamicModule, bindSingletonDynamicModule } from "./utils";
import type { IocProvider } from "./interfaces";
import { TYPES } from "./types";
import { EnvVars } from "@/src/core/app/domain/models/env_vars";
import type { testApiService } from "../data/services/test_api_service";
import type { IAuthTokenService } from "../domain/interfaces/i_auth_token_service";

import type { IAuthRepository } from "../../user/domain/interfaces/i_auth_repository";
import type { LoginUseCase } from "../../user/domain/use_cases/login_use_case";
import type { LogoutUseCase } from "../../user/domain/use_cases/logout_use_case";
import type { ForgotPasswordUseCase } from "../../user/domain/use_cases/forgot_password_use_case";
import type { ResetPasswordUseCase } from "../../user/domain/use_cases/reset_password_use_case";
import type { MeUseCase } from "../../user/domain/use_cases/me_use_case";

import type { IProfileRepository } from "../../profile/domain/interfaces/i_profile_repository";
import type { GetProfilesUseCase } from "../../profile/domain/use_cases/get_profiles_use_case";
import type { CreateProfileUseCase } from "../../profile/domain/use_cases/create_profile_use_case";
import type { PatchProfileUseCase } from "../../profile/domain/use_cases/patch_profile_use_case";
import type { EditProfileUseCase } from "../../profile/domain/use_cases/edit_profile_use_case";
import type { GetProfileDetailUseCase } from "../../profile/domain/use_cases/get_profile_detail_use_case";
import type { ExportProfilesUseCase } from "../../profile/domain/use_cases/export_profiles_use_case";
import type { DeleteManyProfilesUseCase } from "../../profile/domain/use_cases/delete_many_profiles_use_case";

import type { IRateTypeRepository } from "../../rate_type/domain/interfaces/i_rate_type_repository";
import type { GetRateTypesUseCase } from "../../rate_type/domain/use_cases/get_rate_types_use_case";
import type { CreateRateTypeUseCase } from "../../rate_type/domain/use_cases/create_rate_type_use_case";
import type { PatchRateTypeUseCase } from "../../rate_type/domain/use_cases/patch_rate_type_use_case";
import type { EditRateTypeUseCase } from "../../rate_type/domain/use_cases/edit_rate_type_use_case";
import type { GetRateTypeDetailUseCase } from "../../rate_type/domain/use_cases/get_rate_type_detail_use_case";
import type { ExportRateTypesUseCase } from "../../rate_type/domain/use_cases/export_rate_types_use_case";
import type { DeleteManyRateTypesUseCase } from "../../rate_type/domain/use_cases/delete_many_rate_types_use_case";

import type { IRateRepository } from "../../rate/domain/interfaces/i_rate_repository";
import type { GetRatesUseCase } from "../../rate/domain/use_cases/get_rates_use_case";
import type { CreateRateUseCase } from "../../rate/domain/use_cases/create_rate_use_case";
import type { PatchRateUseCase } from "../../rate/domain/use_cases/patch_rate_use_case";
import type { EditRateUseCase } from "../../rate/domain/use_cases/edit_rate_use_case";
import type { GetRateDetailUseCase } from "../../rate/domain/use_cases/get_rate_detail_use_case";
import type { ExportRatesUseCase } from "../../rate/domain/use_cases/export_rates_use_case";
import type { DeleteManyRatesUseCase } from "../../rate/domain/use_cases/delete_many_rates_use_case";

import type { IEnergyCostRepository } from "../../energy_cost/domain/interfaces/i_energy_cost_repository";
import type { GetEnergyCostsUseCase } from "../../energy_cost/domain/use_cases/get_energy_costs_use_case";
import type { CreateEnergyCostUseCase } from "../../energy_cost/domain/use_cases/create_energy_cost_use_case";
import type { PatchEnergyCostUseCase } from "../../energy_cost/domain/use_cases/patch_energy_cost_use_case";
import type { EditEnergyCostUseCase } from "../../energy_cost/domain/use_cases/edit_energy_cost_use_case";
import type { GetEnergyCostDetailUseCase } from "../../energy_cost/domain/use_cases/get_energy_cost_detail_use_case";
import type { ExportEnergyCostsUseCase } from "../../energy_cost/domain/use_cases/export_energy_costs_use_case";
import type { DeleteManyEnergyCostsUseCase } from "../../energy_cost/domain/use_cases/delete_many_energy_costs_use_case";

import type { ICostRepository } from "../../cost/domain/interfaces/i_cost_repository";
import type { GetCostsUseCase } from "../../cost/domain/use_cases/get_costs_use_case";
import type { CreateCostUseCase } from "../../cost/domain/use_cases/create_cost_use_case";
import type { PatchCostUseCase } from "../../cost/domain/use_cases/patch_cost_use_case";
import type { EditCostUseCase } from "../../cost/domain/use_cases/edit_cost_use_case";
import type { GetCostDetailUseCase } from "../../cost/domain/use_cases/get_cost_detail_use_case";
import type { ExportCostsUseCase } from "../../cost/domain/use_cases/export_costs_use_case";
import type { DeleteManyCostsUseCase } from "../../cost/domain/use_cases/delete_many_costs_use_case";

import type { IMarketerRepository } from "../../marketer/domain/interfaces/i_marketer_repository";
import type { GetMarketersUseCase } from "../../marketer/domain/use_cases/get_marketers_use_case";
import type { CreateMarketerUseCase } from "../../marketer/domain/use_cases/create_marketer_use_case";
import type { PatchMarketerUseCase } from "../../marketer/domain/use_cases/patch_marketer_use_case";
import type { EditMarketerUseCase } from "../../marketer/domain/use_cases/edit_marketer_use_case";
import type { GetMarketerDetailUseCase } from "../../marketer/domain/use_cases/get_marketer_detail_use_case";
import type { ExportMarketerUseCase } from "../../marketer/domain/use_cases/export_marketer_use_case";
import type { DeleteManyMarketerUseCase } from "../../marketer/domain/use_cases/delete_many_marketer_use_case";

import type { IMarketerMarginRepository } from "../../marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { GetMarketerMarginsUseCase } from "../../marketer_margin/domain/use_cases/get_marketer_margins_use_case";
import type { CreateMarketerMarginUseCase } from "../../marketer_margin/domain/use_cases/create_marketer_margin_use_case";
import type { PatchMarketerMarginUseCase } from "../../marketer_margin/domain/use_cases/patch_marketer_margin_use_case";
import type { EditMarketerMarginUseCase } from "../../marketer_margin/domain/use_cases/edit_marketer_margin_use_case";
import type { GetMarketerMarginDetailUseCase } from "../../marketer_margin/domain/use_cases/get_marketer_margin_detail_use_case";
import type { ExportMarketerMarginsUseCase } from "../../marketer_margin/domain/use_cases/export_marketer_margins_use_case";
import type { DeleteManyMarketerMarginsUseCase } from "../../marketer_margin/domain/use_cases/delete_many_marketer_margins_use_case";

import type { ICommissionRepository } from "../../commission/domain/interfaces/i_commission_repository";
import type { GetCommissionsUseCase } from "../../commission/domain/use_cases/get_commissions_use_case";
import type { CreateCommissionUseCase } from "../../commission/domain/use_cases/create_commission_use_case";
import type { PatchCommissionUseCase } from "../../commission/domain/use_cases/patch_commission_use_case";
import type { EditCommissionUseCase } from "../../commission/domain/use_cases/edit_commission_use_case";
import type { GetCommissionDetailUseCase } from "../../commission/domain/use_cases/get_commission_detail_use_case";
import type { ExportCommissionsUseCase } from "../../commission/domain/use_cases/export_commissions_use_case";
import type { DeleteManyCommissionsUseCase } from "../../commission/domain/use_cases/delete_many_commissions_use_case";

import type { ISavingStudyRepository } from "../../saving_study/domain/interfaces/i_saving_study_repository";
import type { GetSavingStudiesUseCase } from "../../saving_study/domain/use_cases/get_saving_studies_use_case";
import type { CreateSavingStudyUseCase } from "../../saving_study/domain/use_cases/create_saving_study_use_case";
import type { PatchSavingStudyUseCase } from "../../saving_study/domain/use_cases/patch_saving_study_use_case";
import type { EditSavingStudyUseCase } from "../../saving_study/domain/use_cases/edit_saving_study_use_case";
import type { GetSavingStudyDetailUseCase } from "../../saving_study/domain/use_cases/get_saving_study_detail_use_case";
import type { ExportSavingStudiesUseCase } from "../../saving_study/domain/use_cases/export_saving_studies_use_case";
import type { DeleteManySavingStudiesUseCase } from "../../saving_study/domain/use_cases/delete_many_saving_studies_use_case";
import type { GetSipsUseCase } from "../../saving_study/domain/use_cases/get_sips_use_case";
import type { GetSuggestedRatesUseCase } from "../../saving_study/domain/use_cases/get_suggested_rates_use_case";
import type { GenerateSuggestedRatesUseCase } from "../../saving_study/domain/use_cases/generate_suggested_rates_use_case";
import type { FinishSavingStudyUseCase } from "../../saving_study/domain/use_cases/finish_saving_study_use_case";
import type { EditSuggestedRateUseCase } from "../../saving_study/domain/use_cases/edit_suggested_rate_use_case";
import type { DuplicateSavingStudyUseCase } from "../../saving_study/domain/use_cases/duplicate_saving_study_use_case";

import type { IClientRepository } from "../../client/domain/interfaces/i_client_repository";
import type { CreateClientUseCase } from "../../client/domain/use_cases/create_client_use_case";
import type { PatchClientUseCase } from "../../client/domain/use_cases/patch_client_use_case";
import type { EditClientUseCase } from "../../client/domain/use_cases/edit_client_use_case";
import type { GetClientDetailUseCase } from "../../client/domain/use_cases/get_client_detail_use_case";
import type { ExportClientsUseCase } from "../../client/domain/use_cases/export_clients_use_case";
import type { DeleteManyClientsUseCase } from "../../client/domain/use_cases/delete_many_clients_use_case";
import type { GetClientsUseCase } from "../../client/domain/use_cases/get_clients_use_case";

import type { IContactRepository } from "../../contact/domain/interfaces/i_contact_repository";
import type { CreateContactUseCase } from "../../contact/domain/use_cases/create_contact_use_case";
import type { PatchContactUseCase } from "../../contact/domain/use_cases/patch_contact_use_case";
import type { EditContactUseCase } from "../../contact/domain/use_cases/edit_contact_use_case";
import type { GetContactDetailUseCase } from "../../contact/domain/use_cases/get_contact_detail_use_case";
import type { ExportContactsUseCase } from "../../contact/domain/use_cases/export_contacts_use_case";
import type { DeleteManyContactsUseCase } from "../../contact/domain/use_cases/delete_many_contacts_use_case";
import type { GetContactsUseCase } from "../../contact/domain/use_cases/get_contacts_use_case";

import type { ISupplyPointRepository } from "../../supply_point/domain/interfaces/i_supply_point_repository";
import type { CreateSupplyPointUseCase } from "../../supply_point/domain/use_cases/create_supply_point_use_case";
import type { PatchSupplyPointUseCase } from "../../supply_point/domain/use_cases/patch_supply_point_use_case";
import type { EditSupplyPointUseCase } from "../../supply_point/domain/use_cases/edit_supply_point_use_case";
import type { GetSupplyPointDetailUseCase } from "../../supply_point/domain/use_cases/get_supply_point_detail_use_case";
import type { ExportSupplyPointsUseCase } from "../../supply_point/domain/use_cases/export_supply_points_use_case";
import type { DeleteManySupplyPointsUseCase } from "../../supply_point/domain/use_cases/delete_many_supply_points_use_case";
import type { GetSupplyPointsUseCase } from "../../supply_point/domain/use_cases/get_supply_points_use_case";

import type { IContractRepository } from "../../contract/domain/interfaces/i_contract_repository";
import type { CreateContractUseCase } from "../../contract/domain/use_cases/create_contract_use_case";
import type { PatchContractUseCase } from "../../contract/domain/use_cases/patch_contract_use_case";
import type { EditContractUseCase } from "../../contract/domain/use_cases/edit_contract_use_case";
import type { GetContractDetailUseCase } from "../../contract/domain/use_cases/get_contract_detail_use_case";
import type { ExportContractsUseCase } from "../../contract/domain/use_cases/export_contracts_use_case";
import type { DeleteManyContractsUseCase } from "../../contract/domain/use_cases/delete_many_contracts_use_case";
import type { GetContractsUseCase } from "../../contract/domain/use_cases/get_contracts_use_case";

const locator = new Container();
locator.bind<IEnvVars>(TYPES.IEnvVars).to(EnvVars);
bindDynamicModule<IocProvider<IRestDataSource>, testApiService>(TYPES.testApiService, () =>
  import("../data/services/test_api_service").then((module) => module.testApiService)
);
bindSingletonDynamicModule<IocProvider<IAuthTokenService>, IAuthTokenService>(TYPES.IAuthTokenService, () =>
  import("../data/services/auth_token_service").then((module) => module.AuthTokenService)
);
/* User */
bindDynamicModule<IocProvider<IAuthRepository>, IAuthRepository>(TYPES.IAuthRepository, () =>
  import("../../user/data/repositories/auth_repository").then((module) => module.AuthRepository)
);
bindDynamicModule<IocProvider<IProfileRepository>, IProfileRepository>(TYPES.IProfilesRepository, () =>
  import("../../profile/data/repositories/profile_repository").then((module) => module.ProfilesRepository)
);
bindDynamicModule<IocProvider<LoginUseCase>, LoginUseCase>(TYPES.LoginUseCase, () =>
  import("../../user/domain/use_cases/login_use_case").then((module) => module.LoginUseCase)
);
bindDynamicModule<IocProvider<LogoutUseCase>, LogoutUseCase>(TYPES.LogoutUseCase, () =>
  import("../../user/domain/use_cases/logout_use_case").then((module) => module.LogoutUseCase)
);
bindDynamicModule<IocProvider<ForgotPasswordUseCase>, ForgotPasswordUseCase>(TYPES.ForgotPasswordUseCase, () =>
  import("../../user/domain/use_cases/forgot_password_use_case").then((module) => module.ForgotPasswordUseCase)
);
bindDynamicModule<IocProvider<ResetPasswordUseCase>, ResetPasswordUseCase>(TYPES.ResetPasswordUseCase, () =>
  import("../../user/domain/use_cases/reset_password_use_case").then((module) => module.ResetPasswordUseCase)
);
bindDynamicModule<IocProvider<MeUseCase>, MeUseCase>(TYPES.MeUseCase, () =>
  import("../../user/domain/use_cases/me_use_case").then((module) => module.MeUseCase)
);
bindDynamicModule<IocProvider<GetProfilesUseCase>, GetProfilesUseCase>(TYPES.GetProfilesUseCase, () =>
  import("../../profile/domain/use_cases/get_profiles_use_case").then((module) => module.GetProfilesUseCase)
);
bindDynamicModule<IocProvider<CreateProfileUseCase>, CreateProfileUseCase>(TYPES.CreateProfileUseCase, () =>
  import("../../profile/domain/use_cases/create_profile_use_case").then((module) => module.CreateProfileUseCase)
);
bindDynamicModule<IocProvider<PatchProfileUseCase>, PatchProfileUseCase>(TYPES.PatchProfileUseCase, () =>
  import("../../profile/domain/use_cases/patch_profile_use_case").then((module) => module.PatchProfileUseCase)
);
bindDynamicModule<IocProvider<EditProfileUseCase>, EditProfileUseCase>(TYPES.EditProfileUseCase, () =>
  import("../../profile/domain/use_cases/edit_profile_use_case").then((module) => module.EditProfileUseCase)
);
bindDynamicModule<IocProvider<GetProfileDetailUseCase>, GetProfileDetailUseCase>(TYPES.GetProfileDetailUseCase, () =>
  import("../../profile/domain/use_cases/get_profile_detail_use_case").then((module) => module.GetProfileDetailUseCase)
);
bindDynamicModule<IocProvider<ExportProfilesUseCase>, ExportProfilesUseCase>(TYPES.ExportProfileUseCase, () =>
  import("../../profile/domain/use_cases/export_profiles_use_case").then((module) => module.ExportProfilesUseCase)
);
bindDynamicModule<IocProvider<DeleteManyProfilesUseCase>, DeleteManyProfilesUseCase>(TYPES.DeleteManyProfilesUseCase, () =>
  import("../../profile/domain/use_cases/delete_many_profiles_use_case").then((module) => module.DeleteManyProfilesUseCase)
);
/* Rate */
bindDynamicModule<IocProvider<IRateRepository>, IRateRepository>(TYPES.IRateRepository, () =>
  import("../../rate/data/repositories/rate_repository").then((module) => module.RateRepository)
);
bindDynamicModule<IocProvider<GetRatesUseCase>, GetRatesUseCase>(TYPES.GetRatesUseCase, () =>
  import("../../rate/domain/use_cases/get_rates_use_case").then((module) => module.GetRatesUseCase)
);
bindDynamicModule<IocProvider<CreateRateUseCase>, CreateRateUseCase>(TYPES.CreateRateUseCase, () =>
  import("../../rate/domain/use_cases/create_rate_use_case").then((module) => module.CreateRateUseCase)
);
bindDynamicModule<IocProvider<PatchRateUseCase>, PatchRateUseCase>(TYPES.PatchRateUseCase, () =>
  import("../../rate/domain/use_cases/patch_rate_use_case").then((module) => module.PatchRateUseCase)
);
bindDynamicModule<IocProvider<EditRateUseCase>, EditRateUseCase>(TYPES.EditRateUseCase, () =>
  import("../../rate/domain/use_cases/edit_rate_use_case").then((module) => module.EditRateUseCase)
);
bindDynamicModule<IocProvider<GetRateDetailUseCase>, GetRateDetailUseCase>(TYPES.GetRateDetailUseCase, () =>
  import("../../rate/domain/use_cases/get_rate_detail_use_case").then((module) => module.GetRateDetailUseCase)
);
bindDynamicModule<IocProvider<ExportRatesUseCase>, ExportRatesUseCase>(TYPES.ExportRateUseCase, () =>
  import("../../rate/domain/use_cases/export_rates_use_case").then((module) => module.ExportRatesUseCase)
);
bindDynamicModule<IocProvider<DeleteManyRatesUseCase>, DeleteManyRatesUseCase>(TYPES.DeleteManyRateUseCase, () =>
  import("../../rate/domain/use_cases/delete_many_rates_use_case").then((module) => module.DeleteManyRatesUseCase)
);
/* Rate type */
bindDynamicModule<IocProvider<IRateTypeRepository>, IRateTypeRepository>(TYPES.IRateTypeRepository, () =>
  import("../../rate_type/data/repositories/rate_type_repository").then((module) => module.RateTypeRepository)
);
bindDynamicModule<IocProvider<GetRateTypesUseCase>, GetRateTypesUseCase>(TYPES.GetRateTypesUseCase, () =>
  import("../../rate_type/domain/use_cases/get_rate_types_use_case").then((module) => module.GetRateTypesUseCase)
);
bindDynamicModule<IocProvider<CreateRateTypeUseCase>, CreateRateTypeUseCase>(TYPES.CreateRateTypeUseCase, () =>
  import("../../rate_type/domain/use_cases/create_rate_type_use_case").then((module) => module.CreateRateTypeUseCase)
);
bindDynamicModule<IocProvider<PatchRateTypeUseCase>, PatchRateTypeUseCase>(TYPES.PatchRateTypeUseCase, () =>
  import("../../rate_type/domain/use_cases/patch_rate_type_use_case").then((module) => module.PatchRateTypeUseCase)
);
bindDynamicModule<IocProvider<EditRateTypeUseCase>, EditRateTypeUseCase>(TYPES.EditRateTypeUseCase, () =>
  import("../../rate_type/domain/use_cases/edit_rate_type_use_case").then((module) => module.EditRateTypeUseCase)
);
bindDynamicModule<IocProvider<GetRateTypeDetailUseCase>, GetRateTypeDetailUseCase>(TYPES.GetRateTypeDetailUseCase, () =>
  import("../../rate_type/domain/use_cases/get_rate_type_detail_use_case").then((module) => module.GetRateTypeDetailUseCase)
);
bindDynamicModule<IocProvider<ExportRateTypesUseCase>, ExportRateTypesUseCase>(TYPES.ExportRateTypeUseCase, () =>
  import("../../rate_type/domain/use_cases/export_rate_types_use_case").then((module) => module.ExportRateTypesUseCase)
);
bindDynamicModule<IocProvider<DeleteManyRateTypesUseCase>, DeleteManyRateTypesUseCase>(TYPES.DeleteManyRateTypeUseCase, () =>
  import("../../rate_type/domain/use_cases/delete_many_rate_types_use_case").then((module) => module.DeleteManyRateTypesUseCase)
);
/* Energy Cost */
bindDynamicModule<IocProvider<IEnergyCostRepository>, IEnergyCostRepository>(TYPES.IEnergyCostRepository, () =>
  import("../../energy_cost/data/repositories/energy_cost_repository").then((module) => module.EnergyCostRepository)
);
bindDynamicModule<IocProvider<GetEnergyCostsUseCase>, GetEnergyCostsUseCase>(TYPES.GetEnergyCostsUseCase, () =>
  import("../../energy_cost/domain/use_cases/get_energy_costs_use_case").then((module) => module.GetEnergyCostsUseCase)
);
bindDynamicModule<IocProvider<CreateEnergyCostUseCase>, CreateEnergyCostUseCase>(TYPES.CreateEnergyCostUseCase, () =>
  import("../../energy_cost/domain/use_cases/create_energy_cost_use_case").then((module) => module.CreateEnergyCostUseCase)
);
bindDynamicModule<IocProvider<PatchEnergyCostUseCase>, PatchEnergyCostUseCase>(TYPES.PatchEnergyCostUseCase, () =>
  import("../../energy_cost/domain/use_cases/patch_energy_cost_use_case").then((module) => module.PatchEnergyCostUseCase)
);
bindDynamicModule<IocProvider<EditEnergyCostUseCase>, EditEnergyCostUseCase>(TYPES.EditEnergyCostUseCase, () =>
  import("../../energy_cost/domain/use_cases/edit_energy_cost_use_case").then((module) => module.EditEnergyCostUseCase)
);
bindDynamicModule<IocProvider<GetEnergyCostDetailUseCase>, GetEnergyCostDetailUseCase>(TYPES.GetEnergyCostDetailUseCase, () =>
  import("../../energy_cost/domain/use_cases/get_energy_cost_detail_use_case").then((module) => module.GetEnergyCostDetailUseCase)
);
bindDynamicModule<IocProvider<ExportEnergyCostsUseCase>, ExportEnergyCostsUseCase>(TYPES.ExportEnergyCostUseCase, () =>
  import("../../energy_cost/domain/use_cases/export_energy_costs_use_case").then((module) => module.ExportEnergyCostsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyEnergyCostsUseCase>, DeleteManyEnergyCostsUseCase>(TYPES.DeleteManyEnergyCostUseCase, () =>
  import("../../energy_cost/domain/use_cases/delete_many_energy_costs_use_case").then((module) => module.DeleteManyEnergyCostsUseCase)
);
/*  Cost */
bindDynamicModule<IocProvider<ICostRepository>, ICostRepository>(TYPES.ICostRepository, () =>
  import("../../cost/data/repositories/cost_repository").then((module) => module.CostRepository)
);
bindDynamicModule<IocProvider<GetCostsUseCase>, GetCostsUseCase>(TYPES.GetCostsUseCase, () =>
  import("../../cost/domain/use_cases/get_costs_use_case").then((module) => module.GetCostsUseCase)
);
bindDynamicModule<IocProvider<CreateCostUseCase>, CreateCostUseCase>(TYPES.CreateCostUseCase, () =>
  import("../../cost/domain/use_cases/create_cost_use_case").then((module) => module.CreateCostUseCase)
);
bindDynamicModule<IocProvider<PatchCostUseCase>, PatchCostUseCase>(TYPES.PatchCostUseCase, () =>
  import("../../cost/domain/use_cases/patch_cost_use_case").then((module) => module.PatchCostUseCase)
);
bindDynamicModule<IocProvider<EditCostUseCase>, EditCostUseCase>(TYPES.EditCostUseCase, () =>
  import("../../cost/domain/use_cases/edit_cost_use_case").then((module) => module.EditCostUseCase)
);
bindDynamicModule<IocProvider<GetCostDetailUseCase>, GetCostDetailUseCase>(TYPES.GetCostDetailUseCase, () =>
  import("../../cost/domain/use_cases/get_cost_detail_use_case").then((module) => module.GetCostDetailUseCase)
);
bindDynamicModule<IocProvider<ExportCostsUseCase>, ExportCostsUseCase>(TYPES.ExportCostUseCase, () =>
  import("../../cost/domain/use_cases/export_costs_use_case").then((module) => module.ExportCostsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyCostsUseCase>, DeleteManyCostsUseCase>(TYPES.DeleteManyCostUseCase, () =>
  import("../../cost/domain/use_cases/delete_many_costs_use_case").then((module) => module.DeleteManyCostsUseCase)
);
/* Marketers */
bindDynamicModule<IocProvider<IMarketerRepository>, IMarketerRepository>(TYPES.IMarketerRepository, () =>
  import("../../marketer/data/repositories/marketer_repository").then((module) => module.MarketerRepository)
);
bindDynamicModule<IocProvider<GetMarketersUseCase>, GetMarketersUseCase>(TYPES.GetMarketersUseCase, () =>
  import("../../marketer/domain/use_cases/get_marketers_use_case").then((module) => module.GetMarketersUseCase)
);
bindDynamicModule<IocProvider<CreateMarketerUseCase>, CreateMarketerUseCase>(TYPES.CreateMarketerUseCase, () =>
  import("../../marketer/domain/use_cases/create_marketer_use_case").then((module) => module.CreateMarketerUseCase)
);
bindDynamicModule<IocProvider<PatchMarketerUseCase>, PatchMarketerUseCase>(TYPES.PatchMarketerUseCase, () =>
  import("../../marketer/domain/use_cases/patch_marketer_use_case").then((module) => module.PatchMarketerUseCase)
);
bindDynamicModule<IocProvider<EditMarketerUseCase>, EditMarketerUseCase>(TYPES.EditMarketerUseCase, () =>
  import("../../marketer/domain/use_cases/edit_marketer_use_case").then((module) => module.EditMarketerUseCase)
);
bindDynamicModule<IocProvider<GetMarketerDetailUseCase>, GetMarketerDetailUseCase>(TYPES.GetMarketerDetailUseCase, () =>
  import("../../marketer/domain/use_cases/get_marketer_detail_use_case").then((module) => module.GetMarketerDetailUseCase)
);
bindDynamicModule<IocProvider<ExportMarketerUseCase>, ExportMarketerUseCase>(TYPES.ExportMarketerUseCase, () =>
  import("../../marketer/domain/use_cases/export_marketer_use_case").then((module) => module.ExportMarketerUseCase)
);
bindDynamicModule<IocProvider<DeleteManyMarketerUseCase>, DeleteManyMarketerUseCase>(TYPES.DeleteManyMarketerUseCase, () =>
  import("../../marketer/domain/use_cases/delete_many_marketer_use_case").then((module) => module.DeleteManyMarketerUseCase)
);
/* Marketer Margin */
bindDynamicModule<IocProvider<IMarketerMarginRepository>, IMarketerMarginRepository>(TYPES.IMarketerMarginRepository, () =>
  import("../../marketer_margin/data/repositories/marketer_margin_repository").then((module) => module.MarketerMarginRepository)
);
bindDynamicModule<IocProvider<GetMarketerMarginsUseCase>, GetMarketerMarginsUseCase>(TYPES.GetMarketerMarginsUseCase, () =>
  import("../../marketer_margin/domain/use_cases/get_marketer_margins_use_case").then((module) => module.GetMarketerMarginsUseCase)
);
bindDynamicModule<IocProvider<CreateMarketerMarginUseCase>, CreateMarketerMarginUseCase>(TYPES.CreateMarketerMarginUseCase, () =>
  import("../../marketer_margin/domain/use_cases/create_marketer_margin_use_case").then((module) => module.CreateMarketerMarginUseCase)
);
bindDynamicModule<IocProvider<PatchMarketerMarginUseCase>, PatchMarketerMarginUseCase>(TYPES.PatchMarketerMarginUseCase, () =>
  import("../../marketer_margin/domain/use_cases/patch_marketer_margin_use_case").then((module) => module.PatchMarketerMarginUseCase)
);
bindDynamicModule<IocProvider<EditMarketerMarginUseCase>, EditMarketerMarginUseCase>(TYPES.EditMarketerMarginUseCase, () =>
  import("../../marketer_margin/domain/use_cases/edit_marketer_margin_use_case").then((module) => module.EditMarketerMarginUseCase)
);
bindDynamicModule<IocProvider<GetMarketerMarginDetailUseCase>, GetMarketerMarginDetailUseCase>(TYPES.GetMarketerMarginDetailUseCase, () =>
  import("../../marketer_margin/domain/use_cases/get_marketer_margin_detail_use_case").then((module) => module.GetMarketerMarginDetailUseCase)
);
bindDynamicModule<IocProvider<ExportMarketerMarginsUseCase>, ExportMarketerMarginsUseCase>(TYPES.ExportMarketerMarginUseCase, () =>
  import("../../marketer_margin/domain/use_cases/export_marketer_margins_use_case").then((module) => module.ExportMarketerMarginsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyMarketerMarginsUseCase>, DeleteManyMarketerMarginsUseCase>(TYPES.DeleteManyMarketerMarginUseCase, () =>
  import("../../marketer_margin/domain/use_cases/delete_many_marketer_margins_use_case").then((module) => module.DeleteManyMarketerMarginsUseCase)
);

/*  Commission */
bindDynamicModule<IocProvider<ICommissionRepository>, ICommissionRepository>(TYPES.ICommissionRepository, () =>
  import("../../commission/data/repositories/commission_repository").then((module) => module.CommissionRepository)
);
bindDynamicModule<IocProvider<GetCommissionsUseCase>, GetCommissionsUseCase>(TYPES.GetCommissionsUseCase, () =>
  import("../../commission/domain/use_cases/get_commissions_use_case").then((module) => module.GetCommissionsUseCase)
);
bindDynamicModule<IocProvider<CreateCommissionUseCase>, CreateCommissionUseCase>(TYPES.CreateCommissionUseCase, () =>
  import("../../commission/domain/use_cases/create_commission_use_case").then((module) => module.CreateCommissionUseCase)
);
bindDynamicModule<IocProvider<PatchCommissionUseCase>, PatchCommissionUseCase>(TYPES.PatchCommissionUseCase, () =>
  import("../../commission/domain/use_cases/patch_commission_use_case").then((module) => module.PatchCommissionUseCase)
);
bindDynamicModule<IocProvider<EditCommissionUseCase>, EditCommissionUseCase>(TYPES.EditCommissionUseCase, () =>
  import("../../commission/domain/use_cases/edit_commission_use_case").then((module) => module.EditCommissionUseCase)
);
bindDynamicModule<IocProvider<GetCommissionDetailUseCase>, GetCommissionDetailUseCase>(TYPES.GetCommissionDetailUseCase, () =>
  import("../../commission/domain/use_cases/get_commission_detail_use_case").then((module) => module.GetCommissionDetailUseCase)
);
bindDynamicModule<IocProvider<ExportCommissionsUseCase>, ExportCommissionsUseCase>(TYPES.ExportCommissionUseCase, () =>
  import("../../commission/domain/use_cases/export_commissions_use_case").then((module) => module.ExportCommissionsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyCommissionsUseCase>, DeleteManyCommissionsUseCase>(TYPES.DeleteManyCommissionUseCase, () =>
  import("../../commission/domain/use_cases/delete_many_commissions_use_case").then((module) => module.DeleteManyCommissionsUseCase)
);

/* Saving Study */
bindDynamicModule<IocProvider<ISavingStudyRepository>, ISavingStudyRepository>(TYPES.ISavingStudyRepository, () =>
  import("../../saving_study/data/repositories/saving_study_repository").then((module) => module.SavingStudyRepository)
);
bindDynamicModule<IocProvider<GetSavingStudiesUseCase>, GetSavingStudiesUseCase>(TYPES.GetSavingStudiesUseCase, () =>
  import("../../saving_study/domain/use_cases/get_saving_studies_use_case").then((module) => module.GetSavingStudiesUseCase)
);
bindDynamicModule<IocProvider<CreateSavingStudyUseCase>, CreateSavingStudyUseCase>(TYPES.CreateSavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/create_saving_study_use_case").then((module) => module.CreateSavingStudyUseCase)
);
bindDynamicModule<IocProvider<PatchSavingStudyUseCase>, PatchSavingStudyUseCase>(TYPES.PatchSavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/patch_saving_study_use_case").then((module) => module.PatchSavingStudyUseCase)
);
bindDynamicModule<IocProvider<EditSavingStudyUseCase>, EditSavingStudyUseCase>(TYPES.EditSavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/edit_saving_study_use_case").then((module) => module.EditSavingStudyUseCase)
);
bindDynamicModule<IocProvider<GetSavingStudyDetailUseCase>, GetSavingStudyDetailUseCase>(TYPES.GetSavingStudyDetailUseCase, () =>
  import("../../saving_study/domain/use_cases/get_saving_study_detail_use_case").then((module) => module.GetSavingStudyDetailUseCase)
);
bindDynamicModule<IocProvider<ExportSavingStudiesUseCase>, ExportSavingStudiesUseCase>(TYPES.ExportSavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/export_saving_studies_use_case").then((module) => module.ExportSavingStudiesUseCase)
);
bindDynamicModule<IocProvider<DeleteManySavingStudiesUseCase>, DeleteManySavingStudiesUseCase>(TYPES.DeleteManySavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/delete_many_saving_studies_use_case").then((module) => module.DeleteManySavingStudiesUseCase)
);
bindDynamicModule<IocProvider<GetSipsUseCase>, GetSipsUseCase>(TYPES.GetSipsUseCase, () =>
  import("../../saving_study/domain/use_cases/get_sips_use_case").then((module) => module.GetSipsUseCase)
);
bindDynamicModule<IocProvider<GetSuggestedRatesUseCase>, GetSuggestedRatesUseCase>(TYPES.GetSuggestedRatesUseCase, () =>
  import("../../saving_study/domain/use_cases/get_suggested_rates_use_case").then((module) => module.GetSuggestedRatesUseCase)
);
bindDynamicModule<IocProvider<GenerateSuggestedRatesUseCase>, GenerateSuggestedRatesUseCase>(TYPES.GenerateSuggestedRatesUseCase, () =>
  import("../../saving_study/domain/use_cases/generate_suggested_rates_use_case").then((module) => module.GenerateSuggestedRatesUseCase)
);
bindDynamicModule<IocProvider<FinishSavingStudyUseCase>, FinishSavingStudyUseCase>(TYPES.FinishSavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/finish_saving_study_use_case").then((module) => module.FinishSavingStudyUseCase)
);
bindDynamicModule<IocProvider<EditSuggestedRateUseCase>, EditSuggestedRateUseCase>(TYPES.EditSuggestedRateUseCase, () =>
  import("../../saving_study/domain/use_cases/edit_suggested_rate_use_case").then((module) => module.EditSuggestedRateUseCase)
);
bindDynamicModule<IocProvider<DuplicateSavingStudyUseCase>, DuplicateSavingStudyUseCase>(TYPES.DuplicateSavingStudyUseCase, () =>
  import("../../saving_study/domain/use_cases/duplicate_saving_study_use_case").then((module) => module.DuplicateSavingStudyUseCase)
);

/* Client */
bindDynamicModule<IocProvider<IClientRepository>, IClientRepository>(TYPES.IClientRepository, () =>
  import("../../client/data/repositories/client_repository").then((module) => module.ClientRepository)
);
bindDynamicModule<IocProvider<GetClientsUseCase>, GetClientsUseCase>(TYPES.GetClientsUseCase, () =>
  import("../../client/domain/use_cases/get_clients_use_case").then((module) => module.GetClientsUseCase)
);
bindDynamicModule<IocProvider<CreateClientUseCase>, CreateClientUseCase>(TYPES.CreateClientUseCase, () =>
  import("../../client/domain/use_cases/create_client_use_case").then((module) => module.CreateClientUseCase)
);
bindDynamicModule<IocProvider<PatchClientUseCase>, PatchClientUseCase>(TYPES.PatchClientUseCase, () =>
  import("../../client/domain/use_cases/patch_client_use_case").then((module) => module.PatchClientUseCase)
);
bindDynamicModule<IocProvider<EditClientUseCase>, EditClientUseCase>(TYPES.EditClientUseCase, () =>
  import("../../client/domain/use_cases/edit_client_use_case").then((module) => module.EditClientUseCase)
);
bindDynamicModule<IocProvider<GetClientDetailUseCase>, GetClientDetailUseCase>(TYPES.GetClientDetailUseCase, () =>
  import("../../client/domain/use_cases/get_client_detail_use_case").then((module) => module.GetClientDetailUseCase)
);
bindDynamicModule<IocProvider<ExportClientsUseCase>, ExportClientsUseCase>(TYPES.ExportClientUseCase, () =>
  import("../../client/domain/use_cases/export_clients_use_case").then((module) => module.ExportClientsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyClientsUseCase>, DeleteManyClientsUseCase>(TYPES.DeleteManyClientUseCase, () =>
  import("../../client/domain/use_cases/delete_many_clients_use_case").then((module) => module.DeleteManyClientsUseCase)
);

/* Contact */
bindDynamicModule<IocProvider<IContactRepository>, IContactRepository>(TYPES.IContactRepository, () =>
  import("../../contact/data/repositories/contact_repository").then((module) => module.ContactRepository)
);
bindDynamicModule<IocProvider<GetContactsUseCase>, GetContactsUseCase>(TYPES.GetContactsUseCase, () =>
  import("../../contact/domain/use_cases/get_contacts_use_case").then((module) => module.GetContactsUseCase)
);
bindDynamicModule<IocProvider<CreateContactUseCase>, CreateContactUseCase>(TYPES.CreateContactUseCase, () =>
  import("../../contact/domain/use_cases/create_contact_use_case").then((module) => module.CreateContactUseCase)
);
bindDynamicModule<IocProvider<PatchContactUseCase>, PatchContactUseCase>(TYPES.PatchContactUseCase, () =>
  import("../../contact/domain/use_cases/patch_contact_use_case").then((module) => module.PatchContactUseCase)
);
bindDynamicModule<IocProvider<EditContactUseCase>, EditContactUseCase>(TYPES.EditContactUseCase, () =>
  import("../../contact/domain/use_cases/edit_contact_use_case").then((module) => module.EditContactUseCase)
);
bindDynamicModule<IocProvider<GetContactDetailUseCase>, GetContactDetailUseCase>(TYPES.GetContactDetailUseCase, () =>
  import("../../contact/domain/use_cases/get_contact_detail_use_case").then((module) => module.GetContactDetailUseCase)
);
bindDynamicModule<IocProvider<ExportContactsUseCase>, ExportContactsUseCase>(TYPES.ExportContactUseCase, () =>
  import("../../contact/domain/use_cases/export_contacts_use_case").then((module) => module.ExportContactsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyContactsUseCase>, DeleteManyContactsUseCase>(TYPES.DeleteManyContactUseCase, () =>
  import("../../contact/domain/use_cases/delete_many_contacts_use_case").then((module) => module.DeleteManyContactsUseCase)
);

/* SupplyPoint */
bindDynamicModule<IocProvider<ISupplyPointRepository>, ISupplyPointRepository>(TYPES.ISupplyPointRepository, () =>
  import("../../supply_point/data/repositories/supply_point_repository").then((module) => module.SupplyPointRepository)
);
bindDynamicModule<IocProvider<GetSupplyPointsUseCase>, GetSupplyPointsUseCase>(TYPES.GetSupplyPointsUseCase, () =>
  import("../../supply_point/domain/use_cases/get_supply_points_use_case").then((module) => module.GetSupplyPointsUseCase)
);
bindDynamicModule<IocProvider<CreateSupplyPointUseCase>, CreateSupplyPointUseCase>(TYPES.CreateSupplyPointUseCase, () =>
  import("../../supply_point/domain/use_cases/create_supply_point_use_case").then((module) => module.CreateSupplyPointUseCase)
);
bindDynamicModule<IocProvider<PatchSupplyPointUseCase>, PatchSupplyPointUseCase>(TYPES.PatchSupplyPointUseCase, () =>
  import("../../supply_point/domain/use_cases/patch_supply_point_use_case").then((module) => module.PatchSupplyPointUseCase)
);
bindDynamicModule<IocProvider<EditSupplyPointUseCase>, EditSupplyPointUseCase>(TYPES.EditSupplyPointUseCase, () =>
  import("../../supply_point/domain/use_cases/edit_supply_point_use_case").then((module) => module.EditSupplyPointUseCase)
);
bindDynamicModule<IocProvider<GetSupplyPointDetailUseCase>, GetSupplyPointDetailUseCase>(TYPES.GetSupplyPointDetailUseCase, () =>
  import("../../supply_point/domain/use_cases/get_supply_point_detail_use_case").then((module) => module.GetSupplyPointDetailUseCase)
);
bindDynamicModule<IocProvider<ExportSupplyPointsUseCase>, ExportSupplyPointsUseCase>(TYPES.ExportSupplyPointUseCase, () =>
  import("../../supply_point/domain/use_cases/export_supply_points_use_case").then((module) => module.ExportSupplyPointsUseCase)
);
bindDynamicModule<IocProvider<DeleteManySupplyPointsUseCase>, DeleteManySupplyPointsUseCase>(TYPES.DeleteManySupplyPointUseCase, () =>
  import("../../supply_point/domain/use_cases/delete_many_supply_points_use_case").then((module) => module.DeleteManySupplyPointsUseCase)
);

/* Contract */
bindDynamicModule<IocProvider<IContractRepository>, IContractRepository>(TYPES.IContractRepository, () =>
  import("../../contract/data/repositories/contract_repository").then((module) => module.ContractRepository)
);
bindDynamicModule<IocProvider<GetContractsUseCase>, GetContractsUseCase>(TYPES.GetContractsUseCase, () =>
  import("../../contract/domain/use_cases/get_contracts_use_case").then((module) => module.GetContractsUseCase)
);
bindDynamicModule<IocProvider<CreateContractUseCase>, CreateContractUseCase>(TYPES.CreateContractUseCase, () =>
  import("../../contract/domain/use_cases/create_contract_use_case").then((module) => module.CreateContractUseCase)
);
bindDynamicModule<IocProvider<PatchContractUseCase>, PatchContractUseCase>(TYPES.PatchContractUseCase, () =>
  import("../../contract/domain/use_cases/patch_contract_use_case").then((module) => module.PatchContractUseCase)
);
bindDynamicModule<IocProvider<EditContractUseCase>, EditContractUseCase>(TYPES.EditContractUseCase, () =>
  import("../../contract/domain/use_cases/edit_contract_use_case").then((module) => module.EditContractUseCase)
);
bindDynamicModule<IocProvider<GetContractDetailUseCase>, GetContractDetailUseCase>(TYPES.GetContractDetailUseCase, () =>
  import("../../contract/domain/use_cases/get_contract_detail_use_case").then((module) => module.GetContractDetailUseCase)
);
bindDynamicModule<IocProvider<ExportContractsUseCase>, ExportContractsUseCase>(TYPES.ExportContractUseCase, () =>
  import("../../contract/domain/use_cases/export_contracts_use_case").then((module) => module.ExportContractsUseCase)
);
bindDynamicModule<IocProvider<DeleteManyContractsUseCase>, DeleteManyContractsUseCase>(TYPES.DeleteManyContractUseCase, () =>
  import("../../contract/domain/use_cases/delete_many_contracts_use_case").then((module) => module.DeleteManyContractsUseCase)
);

export { locator };
