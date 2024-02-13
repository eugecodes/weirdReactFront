import styled from "styled-components";
import { formContainerFlex, px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { colors } from "@/src/ui/styles/colors";

interface AccordionProps {
  isOpen: boolean;
}

const AccordionWrapper = styled.div`
  div:has(h2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Accordion = styled.div<AccordionProps>`
  display: grid;
  grid-template-rows: ${(props) => (props.isOpen ? 1 : 0)}fr;
  transform-origin: top;
  transition: grid-template-rows 0.5s ease-in-out;
  padding-top: ${(props) => (props.isOpen ? px2rem(spacing.size6) : 0)};

  & > div {
    overflow: hidden;
    ${formContainerFlex}
    row-gap: ${px2rem(spacing.size8)};

    & > div:first-child {
      margin-top: ${px2rem(5)};
    }
  }
`;

const AccordionButton = styled.span<AccordionProps>`
  position: relative;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    background-color: ${colors["grayscale-black-accent"]};
  }

  &::after {
    content: "";
    display: inline-block;
    width: ${px2rem(11)};
    height: ${px2rem(2)};
  }

  &::before {
    content: "";
    height: ${px2rem(11)};
    width: ${px2rem(2)};
    scale: 1 ${(props) => (props.isOpen ? 0 : 1)};
    transition: scale 0.33s;
  }
`;

export default { AccordionWrapper, Accordion, AccordionButton };
