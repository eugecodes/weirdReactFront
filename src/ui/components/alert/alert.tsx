import { Caution } from "../../assets/icons";
import Styled from "./alert.styled";

interface Props {
  text: string;
  className?: string;
}

export default function Alert({ text, className = "" }: Props) {
  return (
    <Styled.AlertWrapper className={className}>
      <Styled.Alert>
        <img src={Caution} alt="caution" />
        <span>{text}</span>
      </Styled.Alert>
    </Styled.AlertWrapper>
  );
}
