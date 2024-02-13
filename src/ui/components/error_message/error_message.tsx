import Styled from "./error_message.styled";

interface Props {
  children: JSX.Element;
}

export default function ErrorMessage({ children }: Props) {
  return <Styled.Error>{children}</Styled.Error>;
}
