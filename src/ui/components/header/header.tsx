import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BlackLettersLogo, Home } from "../../assets/icons";
import paths from "@/src/ui/router/paths";
import IconWithTooltip from "../icon_with_tooltip/icon_with_tooltip";
import UserSettings from "../user_settings/user_settings";
import Styled from "./header.styled";

export default function Header() {
  const { t } = useTranslation("common");

  return (
    <Styled.Header>
      <Styled.HeaderContent>
        <Styled.HomeContent>
          <Link to={paths.home}>
            <BlackLettersLogo />
          </Link>
          <Link to={paths.home}>
            <IconWithTooltip tooltip={t("header.home")}>
              <Home />
            </IconWithTooltip>
          </Link>
        </Styled.HomeContent>
        <Styled.UserContent>
          {/* <Styled.IconsWrapper>
            <IconWithTooltip tooltip={t("header.notifications")}>
              <Notifications />
            </IconWithTooltip>
            <IconWithTooltip tooltip={t("header.settings")}>
              <Settings />
            </IconWithTooltip>
          </Styled.IconsWrapper> */}
          <UserSettings />
        </Styled.UserContent>
      </Styled.HeaderContent>
    </Styled.Header>
  );
}
