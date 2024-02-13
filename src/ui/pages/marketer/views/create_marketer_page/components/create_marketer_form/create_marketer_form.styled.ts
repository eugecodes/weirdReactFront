import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { formContainerFlex, formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import { CreateMarketerForm } from "./create_marketer_form";

const CreateMarketerFlex = styled(CreateMarketerForm)`
  & > h2 {
    ${formSubtitle}
  }

  & > div {
    ${formContainerFlex}
    &:not(div:has(input):last-child) {
      margin-bottom: ${px2rem(spacing.size6)};
    }
  }
`;

const CreateMarketerGrid = styled(CreateMarketerForm)`
  padding-bottom: ${px2rem(spacing.size6)};
  ${formContainerGrid}

  & > h2 {
    ${formSubtitle}
  }
`;

export default { CreateMarketerFlex, CreateMarketerGrid };
