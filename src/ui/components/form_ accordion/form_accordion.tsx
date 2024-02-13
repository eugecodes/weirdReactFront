import { IconButton } from "@mui/material";
import Styled from "./form_accordion.styled";
import { useState } from "react";

interface Props {
  title: string;
  children: JSX.Element;
}

export default function FormAccordion({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Styled.AccordionWrapper>
      <div>
        <h2>{title}</h2>
        <IconButton onClick={() => setIsOpen((prevValue) => !prevValue)}>
          <Styled.AccordionButton isOpen={isOpen} />
        </IconButton>
      </div>
      <Styled.Accordion isOpen={isOpen}>
        <div>{children}</div>
      </Styled.Accordion>
    </Styled.AccordionWrapper>
  );
}
