import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";
import { typography } from "../../styles/typography";

const Page = styled.div`
  padding-top: ${px2rem(70)};
`;

const Breadcrumbs = styled.div`
  a,
  p {
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;

const HeaderWrapper = styled.div`
  padding-bottom: ${px2rem(spacing.size6)};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
`;

const Header = styled.div`
  padding: ${px2rem(spacing.size7)} 0 ${px2rem(spacing.size6)};
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: ${px2rem(spacing.size6)};
    align-items: center;
  }

  h3 {
    color: ${colors["brand-tangerine-accent"]};
  }
`;

const CreationInfo = styled.div`
  display: flex;
  gap: ${px2rem(spacing.size8)};

  div {
    display: flex;
    gap: ${px2rem(spacing.size2)};

    & > p:first-child {
      color: ${colors["grayscale-gray-accent"]};
    }

    & > p:nth-child(2) {
      color: ${colors["grayscale-charcoal-accent"]};
    }
  }
`;

const IconWrapper = styled.div`
  svg {
    fill: ${colors["grayscale-gray-subtle"]};
    height: ${px2rem(spacing.size6)};
    width: ${px2rem(spacing.size6)};
  }
`;

const IconButton = styled.div`
  svg {
    height: ${px2rem(spacing.size6)};
    width: ${px2rem(spacing.size6)};
    padding: ${px2rem(1.5)};
  }
`;

const ActionButton = styled.div`
  button {
    ${typography.bodyLCaption};
    text-transform: none;
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;
export default { Page, Breadcrumbs, Header, CreationInfo, ActionButton, HeaderWrapper, IconWrapper, IconButton };
