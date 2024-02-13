import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Data = styled.div`
  padding-top: ${px2rem(spacing.size10)};
`;

const ProfileData = styled.div`
  padding-top: ${px2rem(spacing.size8)};

  & > div {
    ${formContainerGrid}
    padding-bottom:  ${px2rem(spacing.size6)};
    border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  }

  h2 {
    ${formSubtitle}
  }
`;

export default { Data, ProfileData };
