import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import ProfilePages from "@/src/ui/pages/profile/routes/profile_pages";
import RateTypePages from "@/src/ui/pages/rate_type/routes/rate_type_pages";
import { RouteMiddleware } from "./route_middleware";
import { useAuthMiddleware } from "./middlewares/auth_middleware.hook";
import { useLoggedUserMiddleware } from "@/src/ui/router/middlewares/logged_user_middleware.hook";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import HomePage from "@/src/ui/pages/home/views/home_page/home_page";
import EnergyCostPages from "@/src/ui/pages/energy_cost/routes/energy_cost_pages";
import MarketerPages from "@/src/ui/pages/marketer/routes/marketer_pages";
import RatePages from "@/src/ui/pages/rate/routes/rate_pages";
import MarketerMarginPages from "@/src/ui/pages/marketer_margin/routes/marketer_margin_pages";
import CostPages from "@/src/ui/pages/cost/routes/cost_pages";
import ToastHandler from "@/src/ui/components/toast_handler/toast_handler";
import SalvingStudyPages from "@/src/ui/pages/saving_study/routes/saving_study_pages";
import CommissionPages from "@/src/ui/pages/commission/routes/commission_pages";
import ClientPages from "@/src/ui/pages/client/routes/client_pages";
import ContactPages from "@/src/ui/pages/contact/routes/contact_pages";
import SupplyPointPages from "@/src/ui/pages/supply_point/routes/supply_point_pages";
import ContractPages from "@/src/ui/pages/contract/routes/contract_pages";

const LoginPage = lazy(() => import("@/src/ui/pages/auth/login/ components/login_page/login_page"));
const ForgotPasswordPage = lazy(() => import("@/src/ui/pages/auth/forgot_password/components/forgot_password_page/forgot_password_page"));
const ResetPasswordPage = lazy(() => import("@/src/ui/pages/auth/reset_password/components/reset_password_page/reset_password_page"));

export const routes: Array<RouteObject> = [
  {
    path: paths.auth.login,
    element: (
      <RouteMiddleware validationHook={useLoggedUserMiddleware} key="loggin-middelware">
        <LoginPage />
      </RouteMiddleware>
    )
  },
  {
    path: paths.auth.forgotPassword,
    element: <ForgotPasswordPage />
  },
  {
    path: paths.auth.resetPassword + "/:userId",
    element: (
      <>
        <ToastHandler />
        <ResetPasswordPage />
      </>
    )
  },
  {
    path: "/",
    element: (
      <RouteMiddleware key="app-auth-middleware" validationHook={useAuthMiddleware}>
        <BaseLayout />
      </RouteMiddleware>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: paths.profile.index + WILDCARD_PATH, element: <ProfilePages /> },
      { path: paths.rateType.index + WILDCARD_PATH, element: <RateTypePages /> },
      { path: paths.energyCost.index + WILDCARD_PATH, element: <EnergyCostPages /> },
      { path: paths.marketer.index + WILDCARD_PATH, element: <MarketerPages /> },
      { path: paths.rate.index + WILDCARD_PATH, element: <RatePages /> },
      { path: paths.marketerMargin.index + WILDCARD_PATH, element: <MarketerMarginPages /> },
      { path: paths.cost.index + WILDCARD_PATH, element: <CostPages /> },
      { path: paths.savingStudy.index + WILDCARD_PATH, element: <SalvingStudyPages /> },
      { path: paths.commission.index + WILDCARD_PATH, element: <CommissionPages /> },
      { path: paths.client.index + WILDCARD_PATH, element: <ClientPages /> },
      { path: paths.contact.index + WILDCARD_PATH, element: <ContactPages /> },
      { path: paths.supplyPoint.index + WILDCARD_PATH, element: <SupplyPointPages /> },
      { path: paths.contract.index + WILDCARD_PATH, element: <ContractPages /> },
      { path: WILDCARD_PATH, element: <Navigate to={paths.home} replace /> }
    ]
  }
];
