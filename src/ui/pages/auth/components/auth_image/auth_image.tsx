import Styled from "./auth_image.styled";
import { Logo } from "@/src/ui/assets/icons";
import { useTranslation } from "react-i18next";

export default function AuthImage() {
  const { t } = useTranslation("common");

  return (
    <Styled.AuthImageWrapper>
      <Styled.AuthImageContent>
        <Logo />
        <Styled.AuthImageText>
          <h1>{t("auth.weAreYour")}</h1>
          <h1>{t("auth.energyAdministrator")}</h1>
        </Styled.AuthImageText>
      </Styled.AuthImageContent>
    </Styled.AuthImageWrapper>
  );
}
