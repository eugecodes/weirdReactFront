import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const RatePriceFormGrid = styled.div`
  & > h2 {
    padding-top: ${px2rem(spacing.size6)};
    ${formSubtitle}
  }

  & > div {
    ${formContainerGrid}
    border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
    padding-bottom: ${px2rem(spacing.size6)};
  }
`;

export default { RatePriceFormGrid };
