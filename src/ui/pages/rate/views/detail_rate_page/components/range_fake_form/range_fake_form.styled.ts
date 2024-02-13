import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const RateRangeFormGrid = styled.div`
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding: ${px2rem(spacing.size6)} 0;

  & > h2 {
    padding-bottom: ${px2rem(spacing.size6)};
  }

  & > div {
    ${formContainerGrid}
  }
`;

export default { RateRangeFormGrid };
