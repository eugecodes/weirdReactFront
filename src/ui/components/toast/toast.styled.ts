import styled, { css } from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { colors } from "@/src/ui/styles/colors";
import type { ToastVariants } from "@/src/ui/view_models/toast";
import { typography } from "@/src/ui/styles/typography";

const variantOptions = {
  information: {
    backgroundColor: colors["grayscale-charcoal-accent"],
    color: colors["grayscale-white-accent"]
  },
  primary: {
    backgroundColor: colors["secondary-ok-green-accent"],
    color: colors["grayscale-white-accent"]
  },
  error: {
    backgroundColor: colors["brand-peach-accent"],
    color: colors["grayscale-white-accent"]
  }
};

interface ToastProps {
  variant: ToastVariants;
}

const Toast = styled.div<ToastProps>`
  padding: ${px2rem(spacing.size4)};
  min-width: ${px2rem(248)};
  border-radius: ${px2rem(3)};
  display: flex;
  gap: ${px2rem(spacing.size4)};
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  align-items: center;
  justify-content: space-between;
  transition: all 0.33s;

  svg {
    height: ${px2rem(spacing.size3)};
    width: ${px2rem(spacing.size3)};
    fill: ${colors["grayscale-white-accent"]};
  }

  span {
    ${typography.bodyL}
  }

  ${({ variant }: { variant: ToastVariants }) =>
    variant &&
    variantOptions[variant] &&
    css`
      background-color: ${variantOptions[variant].backgroundColor};
      color: ${variantOptions[variant].color};
    `}
`;

export default { Toast };
