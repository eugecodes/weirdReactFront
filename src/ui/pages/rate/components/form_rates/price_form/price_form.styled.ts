import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerFlex, formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";
import { RatePriceForm } from "./price_form";

const RatePriceFormFlex = styled(RatePriceForm)`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size6)};

  & > h2 {
    padding-bottom: ${px2rem(spacing.size6)};
  }

  & > div {
    ${formContainerFlex}
  }
`;

const RatePriceFormGrid = styled(RatePriceForm)`
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-bottom: ${px2rem(spacing.size6)};

  & > div {
    ${formContainerGrid}
  }
`;

export default { RatePriceFormFlex, RatePriceFormGrid };
