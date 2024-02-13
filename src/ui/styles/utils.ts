import { css } from "styled-components";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { spacing } from "./spacing";

export const px2rem = (target: string | number): string => {
  typeof target === "string" && (target = target.replace("px", ""));
  const fontSizeBase = 16;
  const remSize = Number(target) / fontSizeBase;
  return `${remSize}rem`;
};

export const wrapperStyles = css`
  margin: ${px2rem(spacing.size4)} auto;
  width: 100%;
  height: 100%;
  max-width: ${px2rem(breakpoints.lg)};
`;

export const TextOverflowHidden = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const formSubtitle = css`
  padding-bottom: ${px2rem(spacing.size6)};
`;

export const formContainerFlex = css`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(spacing.size2)};
`;

export const formContainerGrid = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${px2rem(spacing.size6)};
`;

export const formButton = css`
  margin-top: ${px2rem(spacing.size6)};
  button {
    display: grid;
    place-items: center;
    width: ${px2rem(300)};
    padding: ${px2rem(spacing.size3)} 0 ${px2rem(12)};
    border-radius: ${px2rem(spacing.size1)};
    color: ${colors["grayscale-white-accent"]};
    font-weight: 500;
    font-size: ${px2rem(spacing.size4)};
    line-height: ${px2rem(22)};
    text-transform: none;
  }
`;
