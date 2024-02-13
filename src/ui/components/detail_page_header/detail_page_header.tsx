import { emptyFunction, emptyString } from "@/src/common/utils";
import { Breadcrumbs, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import IconWithTooltip from "../icon_with_tooltip/icon_with_tooltip";
import SureModal from "../sure_modal/sure_modal";
import Styled from "./detail_page_header.styled";

interface CreationItemInformation {
  createdAt: string;
  createdBy: string;
}

interface Action {
  Icon?: string;
  text: string;
  onClick: () => void;
}

interface Props {
  Icon: string;
  resourcePath?: string;
  resourceName?: string;
  creationInformation?: CreationItemInformation;
  headerText: string;
  showBreadcrumbs?: boolean;
  actions?: Action[];
  modalDescription?: string;
  modalPrimaryButtonText?: string;
  showModal?: boolean;
  onCloseModal?: () => void;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

export default function DetailPageHeader({
  Icon,
  headerText,
  resourceName,
  resourcePath,
  creationInformation,
  actions,
  showBreadcrumbs = false,
  modalDescription = emptyString,
  modalPrimaryButtonText = emptyString,
  showModal = false,
  onCloseModal = emptyFunction,
  onPrimaryButtonClick = emptyFunction,
  onSecondaryButtonClick = onCloseModal
}: Props) {
  const { t } = useTranslation("common");

  return (
    <Styled.Page>
      {showBreadcrumbs && resourcePath && (
        <Styled.Breadcrumbs>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={resourcePath}>{resourceName}</Link>
            <Typography color="text.secondary">{headerText}</Typography>
          </Breadcrumbs>
        </Styled.Breadcrumbs>
      )}
      <Styled.Header>
        <div>
          <Styled.IconWrapper>
            <Icon />
          </Styled.IconWrapper>
          <h1>{headerText}</h1>
        </div>
        {actions?.length ? (
          <div>
            {actions.map((action) => {
              return <ActionButton key={action.text} {...action} />;
            })}
          </div>
        ) : null}
      </Styled.Header>
      {creationInformation ? (
        <Styled.CreationInfo>
          <div>
            <p>{t("detailPage.createdAt")}</p>
            <p>{creationInformation.createdAt}</p>
          </div>
          {creationInformation.createdBy && (
            <div>
              <p>{t("detailPage.createdBy")}</p>
              <p>{creationInformation.createdBy}</p>
            </div>
          )}
        </Styled.CreationInfo>
      ) : null}
      {showModal && (
        <SureModal
          primaryButtonText={modalPrimaryButtonText}
          description={modalDescription}
          onSecondaryButtonClick={onSecondaryButtonClick}
          onPrimaryButtonClick={onPrimaryButtonClick}
        />
      )}
    </Styled.Page>
  );
}

function ActionButton({ text, onClick, Icon }: Action) {
  if (Icon) {
    return (
      <Styled.IconButton>
        <IconButton onClick={onClick}>
          <IconWithTooltip tooltip={text}>
            <Icon />
          </IconWithTooltip>
        </IconButton>
      </Styled.IconButton>
    );
  }

  return (
    <Styled.ActionButton>
      <Button onClick={onClick}>{text}</Button>
    </Styled.ActionButton>
  );
}
