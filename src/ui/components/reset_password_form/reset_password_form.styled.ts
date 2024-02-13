import styled from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { colors } from "@/src/ui/styles/colors";
import { typography } from "@/src/ui/styles/typography";

const ButtonWrapper = styled.div`
  & button {
    margin: ${px2rem(spacing.size5)} 0 0;
    height: ${px2rem(spacing.size9)};
    width: 100%;
    ${typography.buttonPrimaryText}
  }
`;

const ChangePasswordText = styled.div`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding: ${px2rem(spacing.size6)} 0;
  font-size: ${px2rem(spacing.size4)};
  line-height: ${px2rem(22)};
  color: ${colors["brand-tangerine-accent"]};
`;

export default { ButtonWrapper, ChangePasswordText };
