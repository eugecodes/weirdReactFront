import { emptyFunction, emptyString } from "@/src/common/utils";
import SureModal from "../sure_modal/sure_modal";
import Styled from "./tabs_list_page.styled";

interface Props {
  title: string;
  children: JSX.Element;
  createUrl: string;
  createButtonText: string;
  modalDescription?: string;
  modalPrimaryButtonText?: string;
  showModal?: boolean;
  onCloseModal?: () => void;
  onPrimaryButtonClick?: () => void;
}

export default function TabsListPage({
  title,
  children,
  createUrl,
  createButtonText,
  modalDescription = emptyString,
  modalPrimaryButtonText = emptyString,
  showModal = false,
  onCloseModal = emptyFunction,
  onPrimaryButtonClick = emptyFunction
}: Props) {
  return (
    <>
      <Styled.Page>
        <Styled.Header>
          <h2>{title}</h2>
          <Styled.CreateLink to={createUrl}>{createButtonText}</Styled.CreateLink>
        </Styled.Header>
      </Styled.Page>
      <>{children}</>
      {showModal && (
        <SureModal
          primaryButtonText={modalPrimaryButtonText}
          description={modalDescription}
          onSecondaryButtonClick={onCloseModal}
          onPrimaryButtonClick={onPrimaryButtonClick}
        />
      )}
    </>
  );
}
