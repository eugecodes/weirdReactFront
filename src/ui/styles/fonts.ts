import type { FlattenSimpleInterpolation } from "styled-components";
import { createGlobalStyle, css } from "styled-components";
import InterBold from "@/src/ui/assets/fonts/Inter-Bold.ttf";
import InterItalic from "@/src/ui/assets/fonts/Inter-Italic.ttf";
import InterRegular from "@/src/ui/assets/fonts/Inter-Regular.ttf";
import InterMedium from "@/src/ui/assets/fonts/Inter-Medium.ttf";
import InterSemiBold from "@/src/ui/assets/fonts/Inter-SemiBold.ttf";

export const FontStyled = createGlobalStyle`
  /* Inter */

  @font-face {
    font-family: Inter;
    src: url(${InterRegular}) format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: Inter;
    font-style: italic;
    src: url(${InterItalic}) format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: Inter;
    src: url(${InterMedium}) format('truetype');
    font-weight: 500;
  }

  @font-face {
    font-family: Inter;
    src: url(${InterSemiBold}) format('truetype');
    font-weight: 600;
  }

  @font-face {
    font-family: Inter;
    src: url(${InterBold}) format('truetype');
    font-weight: 700;
  }

`;

declare type FontType = "Title" | "Body";

export const fonts: Record<FontType, FlattenSimpleInterpolation> = {
  Title: css`
    font-family: Inter, sans-serif;

    * {
      font-family: Inter, sans-serif;
    }
  `,
  Body: css`
    font-family: Inter, sans-serif;

    * {
      font-family: Inter, sans-serif;
    }
  `
};
