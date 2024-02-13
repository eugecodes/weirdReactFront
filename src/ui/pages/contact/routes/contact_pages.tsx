import { useRoutes } from "react-router-dom";
import paths from "@/src/ui/router/paths";
import { useMutationContactProvider } from "@/src/ui/pages/contact/provider/mutation_contact.provider";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { lazy } from "react";

const CreateContactPage = lazy(() => import("@/src/ui/pages/contact/views/create_contact_page/create_contact_page"));
const DetailContactPage = lazy(() => import("@/src/ui/pages/contact/views/detail_contact_page/detail_contact_page"));
const EditContactPage = lazy(() => import("@/src/ui/pages/contact/views/edit_contact_page/edit_contact_page"));

const ID_PATH_PARAM = ":contactId";

export default function ContactPages() {
  const page = useRoutes([
    {
      path: paths.contact.create,
      element: <CreateContactPage />
    },
    {
      path: paths.contact.detail + ID_PATH_PARAM,
      element: <DetailContactPage />
    },
    {
      path: paths.contact.edit + ID_PATH_PARAM,
      element: <EditContactPage />
    }
  ]);
  return (
    <AppErrorBoundary key="contact-error">
      <useMutationContactProvider.State>{page}</useMutationContactProvider.State>
    </AppErrorBoundary>
  );
}
