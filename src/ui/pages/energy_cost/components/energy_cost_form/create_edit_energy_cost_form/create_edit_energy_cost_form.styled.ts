import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { formContainerFlex, formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import { CreateEditEnergyCostForm } from "./create_edit_energy_cost_form";

const CreateEditEnergyCostFlex = styled(CreateEditEnergyCostForm)`
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

const CreateEditEnergyCostGrid = styled(CreateEditEnergyCostForm)`
  padding-bottom: ${px2rem(spacing.size6)};
  ${formContainerGrid}

  & > h2 {
    ${formSubtitle}
  }
`;

export default { CreateEditEnergyCostFlex, CreateEditEnergyCostGrid };
