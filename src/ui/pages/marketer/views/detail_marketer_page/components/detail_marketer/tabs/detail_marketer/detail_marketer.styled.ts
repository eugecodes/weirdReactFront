import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const MarketerData = styled.div`
  padding-top: ${px2rem(spacing.size6)};

  & > div {
    ${formContainerGrid}
    padding-bottom:  ${px2rem(spacing.size6)};
    border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  }

  h2 {
    ${formSubtitle}
  }

  h4 {
    font-weight: 600;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(12)};
  }
`;

export default { MarketerData };
