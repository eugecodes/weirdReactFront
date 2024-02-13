import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { shadows } from "@/src/ui/styles/shadows";
import { px2rem } from "@/src/ui/styles/utils";
import { typography } from "@/src/ui/styles/typography";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;

  width: 100%;
  height: 100vh;
  background-color: ${colors["overlay-20"]};

  display: grid;
  place-content: center;
`;

const Popup = styled.div`
  border: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding: ${px2rem(spacing.size6)};
  border-radius: ${px2rem(spacing.size1)};
  background-color: ${colors["grayscale-white-accent"]};
  ${shadows[30]}
  max-width: ${px2rem(390)};

  display: flex;
  flex-direction: column;
  gap: ${px2rem(spacing.size6)};

  p {
    ${typography.bodyLBold}
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: ${px2rem(spacing.size4)};

  button {
    flex-grow: 1;
    ${typography.buttonPrimaryText}
    text-transform: none;
  }

  button.MuiButton-text {
    ${typography.bodyLCaption}
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;

export default { Wrapper, Popup, ButtonsWrapper };
