import { formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";

const FormGrid = styled.div`
  ${formContainerGrid};
  padding-bottom: ${px2rem(spacing.size3)};
  margin-bottom: ${px2rem(spacing.size3)};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
`;

export default { FormGrid };
