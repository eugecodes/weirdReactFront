import styled from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { typography } from "@/src/ui/styles/typography";

const ButtonWrapper = styled.div`
  & button {
    margin: ${px2rem(spacing.size6)} 0 0;
    height: ${px2rem(spacing.size9)};
    width: 100%;
    ${typography.buttonPrimaryText}
  }
`;

const Success = styled.div`
  h1 {
    margin-bottom: ${px2rem(spacing.size2)};
  }

  p {
    line-height: ${px2rem(22)};
    margin: 0;
  }

  svg {
    width: ${px2rem(spacing.size7)};
  }
`;

export default { ButtonWrapper, Success };
