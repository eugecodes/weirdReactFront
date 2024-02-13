import { colors } from "@/src/ui/styles/colors";
import { fonts } from "@/src/ui/styles/fonts";
import { typography } from "@/src/ui/styles/typography";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const AuthPage = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: ${colors["grayscale-silver-subtle"]};
  position: relative;
`;

const AuthFormFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: ${px2rem(10)};

  p {
    margin: 0;
  }

  a {
    color: ${colors["grayscale-charcoal-accent"]};
    ${fonts.Body}
    ${typography.bodyLCaption}
  }
`;

export default { AuthPage, AuthFormFooter };
