import styled from "styled-components";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import { typography } from "@/src/ui/styles/typography";

const InputWrapper = styled.div`
  & > div {
    width: 100%;
    margin-bottom: ${px2rem(spacing.size5)};
  }

  svg {
    width: ${px2rem(spacing.size5)};
  }
`;

const Error = styled.div`
  margin: ${px2rem(spacing.size1)} 0;

  p {
    ${typography.errorText}
  }
`;

const InputStyled = {
  Error,
  InputWrapper
};

export default InputStyled;
