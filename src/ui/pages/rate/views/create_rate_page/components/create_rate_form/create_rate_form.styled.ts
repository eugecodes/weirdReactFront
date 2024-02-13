import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { typography } from "@/src/ui/styles/typography";

const FormWrapper = styled.div`
  max-width: ${px2rem(340)};
  margin: auto;
  padding-top: ${px2rem(spacing.size12)};

  h1 {
    margin-bottom: ${px2rem(spacing.size4)};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(spacing.size6)};
    margin-top: ${px2rem(spacing.size6)};

    & > div > div {
      margin-bottom: ${px2rem(spacing.size3)};
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${px2rem(spacing.size6)};

  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size6)};

  button {
    text-transform: none;
    height: ${px2rem(spacing.size9)};
    font-weight: 500;
    font-size: ${px2rem(spacing.size4)};
    line-height: ${px2rem(22)};
  }

  button:disabled {
    padding: ${px2rem(14)} ${px2rem(spacing.size9)} ${px2rem(spacing.size3)};
    color: ${colors["grayscale-white-accent"]};
  }
`;

const Error = styled.div`
  margin: ${px2rem(spacing.size1)} 0;

  p {
    ${typography.errorText}
  }
`;

export default { FormWrapper, ButtonsWrapper, Error };
