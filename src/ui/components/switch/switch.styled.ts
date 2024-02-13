import styled from "styled-components";
import { typography } from "../../styles/typography";
import { px2rem } from "../../styles/utils";
import { spacing } from "../../styles/spacing";
import { colors } from "../../styles/colors";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:has(input:disabled) {
    color: ${colors["grayscale-gray-accent"]};
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${px2rem(spacing.size2)};

    & svg {
      height: ${px2rem(spacing.size3)};
    }
  }
`;

export const Label = styled.label`
  ${typography.bodyL}
`;

export default { Wrapper, Label };
