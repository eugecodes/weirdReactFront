import styled from "styled-components";
import { AuthImage } from "@/src/ui/assets/icons";
import { colors } from "@/src/ui/styles/colors";
import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { typography } from "@/src/ui/styles/typography";

const AuthImageWrapper = styled.div`
  height: 100%;
  background: url(${AuthImage});
  background-size: cover;

  svg {
    height: ${px2rem(spacing.size7)};
  }
`;

const AuthImageContent = styled.div`
  padding: ${px2rem(spacing.size12)} ${px2rem(72)} 0;

  svg {
    fill: ${colors["grayscale-white-accent"]};
  }
`;

const AuthImageText = styled.div`
  margin-top: ${px2rem(spacing.size10)};

  & h1 {
    ${typography.heading1}
    color: ${colors["grayscale-white-accent"]};
  }

  & h1:nth-child(2) {
    color: ${colors["brand-tangerine-accent"]};
  }
`;

export default { AuthImageWrapper, AuthImageContent, AuthImageText };
