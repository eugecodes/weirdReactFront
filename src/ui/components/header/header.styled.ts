import styled, { keyframes } from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { spacing, SIDEBAR_WIDTH } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";

const bouncingAnimation = keyframes`
  0%{
    rotate: 30deg;
  }
  100%{
    rotate: -30deg;
  }
`;

const Header = styled.nav`
  position: absolute;
  top: 0;
  left: ${px2rem(SIDEBAR_WIDTH)};
  right: 0;
  background-color: ${colors["brand-ivory-subtle"]};
  display: flex;
  z-index: 120;
  padding: ${px2rem(spacing.size4)} ${px2rem(spacing.size9)};
  height: ${px2rem(72)};

  svg {
    height: ${px2rem(spacing.size6)};
    width: ${px2rem(spacing.size6)};
    padding: ${px2rem(2)};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: center;

  a:first-of-type svg {
    box-sizing: content-box;
    width: ${px2rem(130)};
    padding-right: ${px2rem(spacing.size6)};
    border-right: ${px2rem(1)} solid ${colors["grayscale-charcoal-accent"]};
  }

  a:nth-of-type(2) {
    box-sizing: content-box;
    margin-left: ${px2rem(spacing.size6)};
  }

  a:focus {
    outline: none;
  }
`;

const UserContent = styled.div`
  display: flex;
  align-items: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  gap: ${px2rem(spacing.size5)};
  padding-right: ${px2rem(spacing.size6)};
  border-right: ${px2rem(1)} solid ${colors["grayscale-charcoal-accent"]};

  & svg:first-child {
    fill: ${colors["grayscale-charcoal-accent"]};
    &:hover {
      animation-name: ${bouncingAnimation};
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }

  & svg:nth-child(2) {
    transition: rotate 0.25s;
    &:hover {
      rotate: 120deg;
    }
  }
`;

export default { Header, HeaderContent, UserContent, IconsWrapper, HomeContent };
