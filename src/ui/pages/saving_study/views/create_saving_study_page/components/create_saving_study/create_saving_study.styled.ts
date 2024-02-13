import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { typography } from "@/src/ui/styles/typography";

const FormWrapper = styled.div`
  max-width: ${px2rem(340)};
  margin: auto;
  padding-top: ${px2rem(spacing.size12)};
  padding-bottom: ${px2rem(270)};

  h1 {
    margin-bottom: ${px2rem(spacing.size4)};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(spacing.size6)};
    margin-top: ${px2rem(spacing.size6)};

    & div:has(input) {
      margin-bottom: 0;
    }

    & .MuiFormControl-root {
      max-height: ${px2rem(spacing.size10)};

      &:input {
        padding-left: ${px2rem(38)} !important;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${colors["grayscale-white-accent"]};
  z-index: 100;
  width: 100%;
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size6)};
  margin-left: ${px2rem(38)};

  & > div {
    max-width: ${px2rem(340)};
    margin: auto;
    display: flex;
    flex-direction: column;
    row-gap: ${px2rem(spacing.size6)};
  }

  button {
    text-transform: none;
    height: ${px2rem(spacing.size9)};
    font-weight: 500;
    font-size: ${px2rem(spacing.size4)};
    line-height: ${px2rem(22)};
  }

  button.MuiButton-text {
    color: ${colors["grayscale-charcoal-accent"]};
    ${typography.bodyLCaption};
  }

  button:disabled {
    padding: ${px2rem(14)} ${px2rem(spacing.size9)} ${px2rem(spacing.size3)};
  }
`;

const FormGroupLabel = styled.p`
  ${typography.bodyLBold};
`;

const AlertWrapper = styled.div`
  margin-top: ${px2rem(spacing.size6)};
  padding-bottom: ${px2rem(spacing.size5)};
`;

const InputWithTooltip = styled.div`
  display: flex;
  gap: ${px2rem(spacing.size2)};
  align-items: center;

  div:not(:has(svg)) {
    flex: 1;
  }

  svg {
    height: ${px2rem(spacing.size3)};
    width: ${px2rem(spacing.size3)};
  }
`;

export default { FormWrapper, ButtonsWrapper, FormGroupLabel, AlertWrapper, InputWithTooltip };
