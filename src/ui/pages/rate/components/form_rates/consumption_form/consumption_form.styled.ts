import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerFlex, formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";
import { RateConsumptionForm } from "./consumption_form";

const RateConsumptionFormFlex = styled(RateConsumptionForm)`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size6)};

  & > h2 {
    padding-bottom: ${px2rem(spacing.size6)};
  }

  & > div {
    ${formContainerFlex}
  }
`;

const RateConsumptionFormGrid = styled(RateConsumptionForm)`
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-bottom: ${px2rem(spacing.size6)};

  & > div {
    ${formContainerGrid}
  }
`;

export default { RateConsumptionFormFlex, RateConsumptionFormGrid };
