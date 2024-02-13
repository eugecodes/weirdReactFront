import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import EditContract from "@/src/ui/pages/contract/views/edit_contract_page/components/edit_contract/edit_contract";
import ContractController from "@/src/ui/pages/contract/controllers/contract_controller";
import useShowToast from "@/src/ui/hooks/useShowToast";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import Styled from "@/src/ui/pages/contract/views/detail_contract_page/detail_contract_page.styled";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import { BarChart } from "@/src/ui/assets/icons";
import paths from "@/src/ui/router/paths";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import { useMutationContractProvider } from "@/src/ui/pages/contract/provider/mutation_contract.provider";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";

export default function EditContractPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["contract"]);
  const { showToast } = useShowToast();
  const [showModal, setShowModal] = useState(false);
  const [modalData] = useState<ModalData>();
  const onCloseModal = useCallback(() => setShowModal(false), []);
  const contract = useMutationContractProvider((state) => state.item);
  const { contractId } = useParams();
  const getContractById = useMutationContractProvider((state) => state.getById);

  const onEditContract = useCallback(
    async (input: EditContractModel) => {
      await ContractController.edit(input, Number(contractId));
      showToast({ message: t("contract:actions.edited") });
      navigate(-1);
    },
    [navigate, t, showToast, contractId]
  );

  const getContract = useCallback(async () => {
    if (contractId) {
      const id = Number(contractId);
      const response = await getContractById(id);
      if (!response) {
        navigate(-1);
      }
    }
  }, [getContractById, navigate, contractId]);

  useEffectRunOnce(() => {
    getContract();
  }, [getContract]);

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={BarChart}
        showBreadcrumbs
        resourcePath={paths.contract.index}
        resourceName={t("contract:contracts")}
        headerText={contract ? String(contract.id) : ""}
        creationInformation={contract ? contract.creationData() : undefined}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <EditContract onSubmitForm={onEditContract} contract={contract} />
    </Styled.Page>
  );
}
