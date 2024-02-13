import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { fonts } from "@/src/ui/styles/fonts";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import { Link } from "react-router-dom";
import { typography } from "../../styles/typography";

const BackofficeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px2rem(72)} 0 ${px2rem(63)};

  & div {
    display: flex;
    align-items: center;
    gap: ${px2rem(spacing.size4)};

    h3 {
      ${typography.heading2}
      line-height: ${px2rem(spacing.size6)};
      color: ${colors["grayscale-charcoal-subtle"]};
    }

    button {
      text-transform: none;
    }
  }
`;

const IconWrapper = styled.div`
  svg {
    width: ${px2rem(25)};
    height: ${px2rem(25)};
    fill: ${colors["grayscale-gray-subtle"]};
  }
`;

const CreateLink = styled(Link)`
  background-color: ${colors["brand-tangerine-accent"]};
  color: ${colors["grayscale-white-accent"]};
  padding: 0 ${px2rem(spacing.size4)};
  height: ${px2rem(spacing.size8)};
  display: grid;
  place-items: center;
  text-decoration: none;
  border-radius: ${px2rem(spacing.size1)};
  font-size: ${px2rem(spacing.size4)};
  font-weight: 500;
  min-width: ${px2rem(160)};
  ${fonts.Body};
`;

export default { BackofficeHeader, IconWrapper, CreateLink };
