import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";
import { px2rem } from "./utils";
import { fonts } from "./fonts";
import { colors } from "./colors";

export interface Typography {
  bodyXSUpperCase: FlattenSimpleInterpolation;
  bodySUppercaseBold: FlattenSimpleInterpolation;
  bodySUpperCase: FlattenSimpleInterpolation;
  bodySItalic: FlattenSimpleInterpolation;
  bodySCaption: FlattenSimpleInterpolation;
  bodySBold: FlattenSimpleInterpolation;
  bodyS: FlattenSimpleInterpolation;
  bodyMItalic: FlattenSimpleInterpolation;
  bodyMCaption: FlattenSimpleInterpolation;
  bodyMBold: FlattenSimpleInterpolation;
  bodyM: FlattenSimpleInterpolation;
  bodyLItalic: FlattenSimpleInterpolation;
  bodyLCaption: FlattenSimpleInterpolation;
  bodyLBold: FlattenSimpleInterpolation;
  bodyL: FlattenSimpleInterpolation;
  errorText: FlattenSimpleInterpolation;
  buttonPrimaryText: FlattenSimpleInterpolation;
  buttonSettingsText: FlattenSimpleInterpolation;
  heading4: FlattenSimpleInterpolation;
  heading3: FlattenSimpleInterpolation;
  heading2: FlattenSimpleInterpolation;
  heading1: FlattenSimpleInterpolation;
}

// Body
const bodyXSUpperCase = css`
  ${fonts.Body};
  font-size: ${px2rem(10)};
  line-height: ${px2rem(10)};
  font-weight: 600;
  text-transform: uppercase;
`;

const bodySUpperCase = css`
  ${fonts.Body};
  font-size: ${px2rem(12)};
  line-height: ${px2rem(12)};
  font-weight: 600;
  text-transform: uppercase;
`;

const bodySUppercaseBold = css`
  ${bodySUpperCase};
  font-weight: 700;
`;

const bodyS = css`
  ${fonts.Body};
  font-size: ${px2rem(12)};
  line-height: ${px2rem(16)};
  font-weight: 400;
  letter-spacing: 0.4px;
`;

const bodySCaption = css`
  ${fonts.Body};
  font-size: ${px2rem(12)};
  line-height: ${px2rem(16)};
  font-weight: 500;
  text-decoration: underline;
`;

const bodySBold = css`
  ${bodyS};
  font-weight: 500;
`;

const bodySItalic = css`
  ${bodyS};
  letter-spacing: 0;
  font-size: italic;
`;

const bodyM = css`
  ${fonts.Body};
  font-size: ${px2rem(14)};
  line-height: ${px2rem(18)};
  font-weight: 400;
`;

const bodyMCaption = css`
  ${fonts.Body};
  font-size: ${px2rem(14)};
  line-height: ${px2rem(18)};
  font-weight: 500;
  text-decoration: underline;
`;

const bodyMBold = css`
  ${bodyM};
  font-weight: 500;
`;

const bodyMItalic = css`
  ${bodyM};
  font-size: italic;
`;

const bodyL = css`
  ${fonts.Body};
  font-size: ${px2rem(16)};
  line-height: ${px2rem(22)};
  font-weight: 400;
`;

const bodyLCaption = css`
  ${fonts.Body};
  font-size: ${px2rem(16)};
  line-height: ${px2rem(22)};
  font-weight: 500;
  text-decoration: underline;
`;

const bodyLBold = css`
  ${bodyL};
  font-weight: 500;
`;

const bodyLItalic = css`
  ${bodyL};
  font-size: italic;
`;

const buttonPrimaryText = css`
  ${fonts.Body};
  font-weight: 500;
  font-size: ${px2rem(16)};
  line-height: ${px2rem(22)};
  text-transform: none;
`;

const errorText = css`
  color: ${colors["secondary-alert-red-accent"]};
  ${bodyS};
`;

const buttonSettingsText = css`
  color: ${colors["grayscale-charcoal-accent"]};
  ${buttonPrimaryText};
  line-height: ${px2rem(22.65)};
`;

const heading4 = css`
  ${fonts.Title};
  font-size: ${px2rem(16)};
  line-height: ${px2rem(20)};
  font-weight: 600;
`;
const heading3 = css`
  ${fonts.Title};
  font-size: ${px2rem(18)};
  line-height: ${px2rem(22)};
  font-weight: 600;
`;
const heading2 = css`
  ${fonts.Title};
  font-weight: 600;
  font-size: ${px2rem(24)};
  line-height: ${px2rem(28)};
`;
const heading1 = css`
  ${fonts.Title};
  font-weight: 700;
  font-size: ${px2rem(48)};
  line-height: ${px2rem(48)};
`;

export const typography: Typography = {
  bodyXSUpperCase,
  bodySUppercaseBold,
  bodySUpperCase,
  bodySItalic,
  bodySCaption,
  bodySBold,
  bodyS,
  bodyMItalic,
  bodyMCaption,
  bodyMBold,
  bodyM,
  bodyLItalic,
  bodyLCaption,
  bodyLBold,
  bodyL,
  buttonPrimaryText,
  buttonSettingsText,
  errorText,
  heading4,
  heading3,
  heading2,
  heading1
};
