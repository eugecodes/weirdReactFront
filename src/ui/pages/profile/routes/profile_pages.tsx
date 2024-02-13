import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import paths, { WILDCARD_PATH } from "@/src/ui/router/paths";
import { useListProfileProvider } from "@/src/ui/pages/profile/views/profile_page/provider/list_profile.provider";
import { useMutationProfileProvider } from "@/src/ui/pages/profile/provider/mutation_profile.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

const ListProfilePage = lazy(() => import("@/src/ui/pages/profile/views/profile_page/profile_page"));
const CreateProfilePage = lazy(() => import("@/src/ui/pages/profile/views/create_profile_page/create_profile_page"));
const EditProfilePage = lazy(() => import("@/src/ui/pages/profile/views/edit_profile_page/edit_profile_page"));
const DetailProfilePage = lazy(() => import("@/src/ui/pages/profile/views/detail_profile_page/detail_profile_page"));
const ResetPasswordPage = lazy(() => import("@/src/ui/pages/profile/views/reset_password_page/reset_password_page"));
const ChangePasswordPage = lazy(() => import("@/src/ui/pages/profile/views/change_password_page/change_password_page"));

const ID_PATH_PARAM = ":profileId";

export default function ProfilePages() {
  const page = useRoutes([
    {
      index: true,
      element: (
        <useListProfileProvider.State>
          <ListProfilePage />
        </useListProfileProvider.State>
      )
    },
    {
      path: paths.profile.create,
      element: <CreateProfilePage />
    },
    {
      path: paths.profile.edit + ID_PATH_PARAM,
      element: <EditProfilePage />
    },
    {
      path: paths.profile.detail + ID_PATH_PARAM,
      element: <DetailProfilePage />
    },
    {
      path: paths.profile.changePassword,
      element: <ResetPasswordPage />
    },
    {
      path: paths.profile.changePassword + ID_PATH_PARAM,
      element: <ChangePasswordPage />
    },
    { path: WILDCARD_PATH, element: <Navigate to={paths.energyCost.index} replace /> }
  ]);
  return (
    <AppErrorBoundary key="profile-error">
      <useMutationProfileProvider.State>{page}</useMutationProfileProvider.State>
    </AppErrorBoundary>
  );
}
