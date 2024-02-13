import { createGlobalStyle } from "styled-components";
import { ResetCSS } from "@/src/ui/styles/reset";
import { colors } from "./colors";
import { fonts, FontStyled } from "./fonts";
import { typography } from "@/src/ui/styles/typography";
import { px2rem } from "@/src/ui/styles/utils";

const Styles = createGlobalStyle`
  body {
    background-color: ${colors["grayscale-white-accent"]};
  }
  
  * {
    ${fonts.Title};

    &:focus {
      outline: ${px2rem(2)} solid ${colors["grayscale-gray-subtle"]};
    }
  }

  h1 {
    ${typography.heading2}
    color: ${colors["grayscale-black-accent"]};
  }

  h2 {
    ${typography.heading3}
    color: ${colors["grayscale-black-accent"]};
  }

  h3 {
    ${typography.heading4}
    color: ${colors["grayscale-black-accent"]};
  }


  p {
    ${typography.bodyL}
    color: ${colors["grayscale-charcoal-accent"]}
  }

  small {
    ${typography.bodyS}
  }

  input:disabled, div:has(& > input:disabled){
    background-color: ${colors["grayscale-gray-subtle"]};
    pointer-events: none;
  }

  .MuiButton-contained.MuiButton-containedPrimary:hover{
    background-color: ${colors["brand-peach-accent"]};
  }

  a:focus:has(img){
    outline: none;
  }

  .MuiFormControl-root:has(input:disabled) label{
    color: ${colors["grayscale-charcoal-subtle"]}
  }

  .MuiAutocomplete-root .MuiFormControl-root:has(input:disabled) label{
    background-image: unset;
  }

  .numeric-input-without-arrows input::-webkit-outer-spin-button,
  .numeric-input-without-arrows input::-webkit-inner-spin-button {
    appearance: textfield;
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GlobalStyles = () => (
  <>
    <Styles />
    <ResetCSS />
    <FontStyled />
  </>
);
