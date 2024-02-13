import { formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { typography } from "@/src/ui/styles/typography";
import { colors } from "@/src/ui/styles/colors";

const SupplyPointData = styled.div`
  padding-top: ${px2rem(spacing.size6)};
  padding-bottom: ${px2rem(100)};

  h2 {
    ${formSubtitle}
  }

  h4 {
    font-weight: 600;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(12)};
  }
`;

const FormGrid = styled.div`
  ${formContainerGrid};
  padding-bottom: ${px2rem(spacing.size3)};
  margin-bottom: ${px2rem(spacing.size3)};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
`;

const Header = styled.div`
  padding: ${px2rem(38)} 0 ${px2rem(spacing.size8)};

  h2 {
    padding-bottom: ${px2rem(spacing.size4)};
  }

  p {
    color: ${colors["grayscale-charcoal-accent"]};
    line-height: ${px2rem(22)};
  }
`;

const FormGroupLabel = styled.p`
  ${typography.bodyLBold};
  margin-bottom: ${px2rem(spacing.size4)};
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
    margin-bottom: ${px2rem(spacing.size4)};
  }
`;

const Button = styled.div`
  // TODO formButton changes color of all buttons and override color for states for example disabled, not good practice
  button {
    display: grid;
    place-items: center;
    width: ${px2rem(300)};
    padding: ${px2rem(spacing.size3)} 0 ${px2rem(12)};
    border-radius: ${px2rem(spacing.size1)};
    font-weight: 500;
    font-size: ${px2rem(spacing.size4)};
    line-height: ${px2rem(22)};
    text-transform: none;
  }

  display: flex;
  padding: ${px2rem(spacing.size6)} 0;

  > button {
    &:first-of-type {
      margin-right: ${px2rem(spacing.size3)};
    }
  }
`;

const AlertWrapper = styled.div`
  margin-top: ${px2rem(spacing.size4)};
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

export default { SupplyPointData, Button, ButtonsWrapper, FormGroupLabel, InputWithTooltip, Header, FormGrid, AlertWrapper };
