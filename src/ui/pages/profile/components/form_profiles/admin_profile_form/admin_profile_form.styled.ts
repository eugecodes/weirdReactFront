import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerFlex, formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";
import { AdminProfile } from "./admin_profile_form";

const AdminProfileFlex = styled(AdminProfile)`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size6)};

  & > h2 {
    ${formSubtitle}
  }

  & > div {
    ${formContainerFlex}
  }
`;

const AdminProfileGrid = styled(AdminProfile)`
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-bottom: ${px2rem(spacing.size6)};

  & > h2 {
    ${formSubtitle}
  }

  & > div {
    ${formContainerGrid}
  }
`;

export default { AdminProfileFlex, AdminProfileGrid };
