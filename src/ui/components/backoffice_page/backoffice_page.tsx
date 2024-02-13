import { emptyFunction, emptyString } from "@/src/common/utils";
import SureModal from "../sure_modal/sure_modal";
import Styled from "./backoffice_page.styled";

interface Props {
  title: string;
  Icon: string;
  children: JSX.Element;
  createUrl: string;
  createButtonText: string;
  modalDescription?: string;
  modalPrimaryButtonText?: string;
  showModal?: boolean;
  onCloseModal?: () => void;
  onPrimaryButtonClick?: () => void;
}

export default function BackofficePage({
  Icon,
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
      <Styled.BackofficeHeader>
        <div>
          <Styled.IconWrapper>
            <Icon />
          </Styled.IconWrapper>
          <h1>{title}</h1>
        </div>
        <div>
          <Styled.CreateLink to={createUrl}>{createButtonText}</Styled.CreateLink>
        </div>
      </Styled.BackofficeHeader>
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
