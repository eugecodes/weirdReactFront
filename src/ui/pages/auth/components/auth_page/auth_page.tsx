import AuthImage from "../auth_image/auth_image";
import Styled from "./auth_page.styled";

interface Props {
  children: JSX.Element;
}

export default function AuthPage({ children }: Props) {
  return (
    <Styled.AuthPage>
      <AuthImage />
      {children}
    </Styled.AuthPage>
  );
}
