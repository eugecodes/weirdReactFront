import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { formContainerFlex, px2rem } from "@/src/ui/styles/utils";
import { fonts } from "@/src/ui/styles/fonts";
import { typography } from "@/src/ui/styles/typography";
import FakeInputComponent from "./fake_input";

const FakeInput = styled.div`
  ${formContainerFlex}
  ${fonts.Body}
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(10)};

  svg {
    height: ${px2rem(10)};
    width: ${px2rem(10)};
  }
`;

const Label = styled.span`
  ${typography.bodyXSUpperCase}
  color: ${colors["grayscale-gray-accent"]};
`;

const Value = styled.p`
  ${typography.bodyL}
  color: ${colors["grayscale-charcoal-accent"]};
`;

const FakeInputNormalCase = styled(FakeInputComponent)`
  & > div > span {
    text-transform: none;
  }
`;

export default { FakeInput, Label, Value, LabelWrapper, FakeInputNormalCase };
