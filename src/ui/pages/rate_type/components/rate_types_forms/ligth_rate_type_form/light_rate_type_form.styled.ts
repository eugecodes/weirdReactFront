import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { formContainerFlex, formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import { LightRateType } from "./light_rate_type_form";

const LightRateTypeFlex = styled(LightRateType)`
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

const LightRateTypeGrid = styled(LightRateType)`
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-bottom: ${px2rem(spacing.size6)};

  & > h2 {
    ${formSubtitle}
  }

  & > div {
    ${formContainerGrid}
  }
`;

export default { LightRateTypeFlex, LightRateTypeGrid };
