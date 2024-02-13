import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import Styled from "./link_as_button.styled";

export default function LinkAsButton(props: LinkProps) {
  return (
    <Styled.Link>
      <Link to={props.to}>{props.children}</Link>
    </Styled.Link>
  );
}
