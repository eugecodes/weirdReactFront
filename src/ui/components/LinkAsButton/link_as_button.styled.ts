import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import { typography } from "../../styles/typography";

const Link = styled.div`
  margin-top: ${px2rem(spacing.size6)};
  a {
    display: grid;
    place-items: center;
    width: ${px2rem(300)};
    background-color: ${colors["brand-tangerine-accent"]};
    padding: ${px2rem(spacing.size3)} 0 ${px2rem(12)};
    border-radius: ${px2rem(spacing.size1)};
    text-decoration: none;
    color: ${colors["grayscale-white-accent"]};
    ${typography.buttonPrimaryText}
  }
`;

export default { Link };
