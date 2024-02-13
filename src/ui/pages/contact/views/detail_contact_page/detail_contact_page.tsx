import { BarChart, Delete } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactController from "@/src/ui/pages/contact/controllers/contact_controller";
import { useMutationContactProvider } from "@/src/ui/pages/contact/provider/mutation_contact.provider";
import Styled from "./detail_contact_page.styled";
import type { Id } from "@/src/common/utils/types";
import DetailContact from "@/src/ui/pages/contact/views/detail_contact_page/components/detail_contact/tabs/detail_contact/detail_contact";

export default function DetailContactPage() {
  const { t } = useTranslation(["contact", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const navigate = useNavigate();
  const { showToast } = useShowToast();
  const getContactById = useMutationContactProvider((state) => state.getById);
  const contact = useMutationContactProvider((state) => state.item);
  const { contactId } = useParams();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const getContact = useCallback(async () => {
    if (contactId) {
      const id = Number(contactId);
      const response = await getContactById(id);
      if (!response) {
        navigate(paths.contact.index);
      }
    }
  }, [getContactById, contactId, navigate]);

  useEffectRunOnce(() => {
    getContact();
  }, [getContact]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("contact:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await ContactController.delete(id);
          onCloseModal();
          navigate(paths.contact.index);
          showToast({ message: t("contact:actions.deleted") });
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast]
  );

  const actions = useMemo(
    () =>
      contact
        ? [
            {
              Icon: Delete,
              text: t("contact:actions.delete", { ns: "contact" }),
              onClick: () => onClickDelete(Number(contactId))
            }
          ]
        : [],
    [contact, onClickDelete, contactId, t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        resourcePath={paths.client.index + paths.client.detail + contact?.clientId}
        resourceName={t("contact:client")}
        headerText={contact ? contact.name : ""}
        creationInformation={contact ? contact.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <DetailContact contact={contact} />
    </Styled.Page>
  );
}
