import { useTranslation } from "react-i18next";
import Styled from "./enabled.styled";

interface Props {
  isEnabled: boolean;
}

export default function Enabled({ isEnabled }: Props) {
  const { t } = useTranslation("profile");

  return (
    <Styled.EnabledWrapper isEnabled={isEnabled}>
      <Styled.Ring isEnabled={isEnabled} />
      <Styled.EnabledText>{t(isEnabled ? "enabled" : "disabled")}</Styled.EnabledText>
    </Styled.EnabledWrapper>
  );
}
