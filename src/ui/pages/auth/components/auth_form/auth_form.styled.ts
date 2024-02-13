import { colors } from "@/src/ui/styles/colors";
import { shadows } from "@/src/ui/styles/shadows";
import { spacing } from "@/src/ui/styles/spacing";
import { typography } from "@/src/ui/styles/typography";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

export const AuthForm = styled.div`
  background-color: ${colors["grayscale-white-accent"]};
  padding: ${px2rem(spacing.size11)};
  box-shadow: ${shadows[60]};
  margin: auto;
  width: ${px2rem(500)};
  border-radius: ${px2rem(spacing.size1)};

  h1 {
    color: ${colors["grayscale-black-accent"]};
  }

  svg {
    margin-bottom: ${px2rem(28)};
  }

  form svg {
    margin-bottom: 0;
  }

  h1 + form {
    margin-top: ${px2rem(spacing.size7)};
  }

  p + form {
    margin-top: ${px2rem(spacing.size6)};
  }

  p {
    color: ${colors["grayscale-charcoal-accent"]};
    margin-top: ${px2rem(spacing.size2)};
    ${typography.bodyL}
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form p {
    color: ${colors["secondary-alert-red-accent"]};
  }

  form + div {
    margin-top: ${px2rem(spacing.size8)};
  }

  form > button {
    margin: ${px2rem(spacing.size8)} 0 0;
    height: ${px2rem(spacing.size9)};
    width: 100%;
    ${typography.buttonPrimaryText}
  }
`;

export default { AuthForm };
