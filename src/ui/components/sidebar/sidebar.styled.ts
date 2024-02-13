import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { SIDEBAR_OPEN_WIDTH, SIDEBAR_WIDTH, spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";

const Sidebar = styled.nav<SidebarProps>`
  width: ${(props) => (props.isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_WIDTH)}px;
  transition: width 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 120;
  overflow: visible;
  background-color: ${colors["grayscale-black-subtle"]};
`;

interface SidebarProps {
  isOpen: boolean;
}

const SidebarButton = styled.div<SidebarProps>`
  width: ${(props) => (props.isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_WIDTH)}px;
  transition: width 0.5s;
  display: grid;
  grid-template-columns: ${px2rem(SIDEBAR_WIDTH)} 1fr;
  overflow: hidden;
  align-items: center;
  background-color: ${colors["grayscale-black-accent"]};

  svg {
    height: ${px2rem(28)};
    translate: 0 ${px2rem(2)};
    fill: ${colors["grayscale-white-accent"]};
  }

  button {
    cursor: pointer;
    background-color: inherit;
    border: none;
    height: ${px2rem(SIDEBAR_WIDTH)};
    width: ${px2rem(SIDEBAR_WIDTH)};
    display: grid;
    place-items: center;

    &:focus {
      outline: none;
    }

    span {
      height: ${px2rem(2)};
      width: ${px2rem(18)};
      position: relative;
      background-color: ${(props) => (props.isOpen ? "transparent" : colors["grayscale-white-accent"])};

      &::before,
      &::after {
        content: "";
        display: block;
        background-color: ${colors["grayscale-white-accent"]};
        position: absolute;
        left: 0;

        height: ${px2rem(2)};
        width: ${px2rem(18)};
        transition: all 0.5s;
      }

      &::before {
        top: ${px2rem(spacing.size1)};
        rotate: ${(props) => (props.isOpen ? 45 : 0)}deg;
      }

      &::after {
        top: ${(props) => (props.isOpen ? px2rem(spacing.size1) : px2rem(spacing.size1 * -1))};
        rotate: ${(props) => (props.isOpen ? 130 : 0)}deg;
      }
    }
  }
`;

const Submenu = styled.div<SidebarProps>`
  position: absolute;
  left: 100%;
  top: ${px2rem(SIDEBAR_WIDTH)};
  z-index: 300;

  height: calc(100% - ${SIDEBAR_WIDTH}px);
  transform: ${(props) => (props.isOpen ? "scalex(1)" : "scalex(0)")};
  transform-origin: left;
  transition: all 0.5s;
  background-color: ${colors["grayscale-black-accent"]};
`;

const SubmenuHeader = styled.div`
  padding: 0 ${px2rem(spacing.size6)};

  svg {
    fill: ${colors["grayscale-white-accent"]};
    height: ${px2rem(spacing.size6)};
    width: ${px2rem(spacing.size6)};
  }

  div {
    padding: ${px2rem(spacing.size6)} 0;
    border-bottom: ${px2rem(1)} solid ${colors["grayscale-gray-accent"]};
    display: flex;
    align-items: center;
    gap: ${px2rem(spacing.size6)};
    opacity: 0.5;
  }

  span {
    font-weight: 600;
    font-size: ${px2rem(spacing.size4)};
    line-height: ${px2rem(spacing.size5)};
    color: ${colors["grayscale-white-accent"]};
    width: ${px2rem(220)};
  }
`;

const Links = styled.div<SidebarProps>`
  padding: ${px2rem(spacing.size3)};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  button,
  a {
    cursor: pointer;
    display: grid;
    grid-template-columns: ${px2rem(spacing.size11)} ${px2rem(205)} ${px2rem(spacing.size6)};
    align-items: center;
    border-radius: ${px2rem(spacing.size1)};
    transition: all 0.25s;
    text-decoration: none;
    height: ${px2rem(spacing.size9)};
    background-color: transparent;
    border: none;
    padding: 0;

    &:focus {
      outline: none;
    }

    &:hover,
    &:focus {
      background-color: ${(props) => (props.isOpen ? colors["grayscale-charcoal-subtle"] : colors["brand-tangerine-subtle"])};
      svg {
        fill: ${(props) => (props.isOpen ? colors["brand-tangerine-subtle"] : colors["grayscale-white-accent"])};
      }
    }

    & > svg {
      box-sizing: content-box;
      padding: ${px2rem(14.5)};
      transition: all 0.25s;
      fill: ${colors["grayscale-white-accent"]};
      width: ${px2rem(17)};
    }

    span {
      color: ${colors["grayscale-white-accent"]};
      line-height: ${px2rem(22)};
      font-size: ${px2rem(spacing.size4)};
      justify-self: start;
    }
  }
`;

const ArrowIcon = styled.div`
  height: ${px2rem(spacing.size4)};
  width: ${px2rem(spacing.size4)};
  padding: ${px2rem(1)} ${px2rem(spacing.size1)};
`;

interface SubmenuTitleProps {
  border?: boolean;
}

const SubmenuTitle = styled.p<SubmenuTitleProps>`
  color: ${colors["grayscale-gray-subtle"]};
  font-weight: 600;
  font-size: ${px2rem(spacing.size3)};
  line-height: ${px2rem(spacing.size3)};
  text-transform: uppercase;
  padding: 0 ${px2rem(14.5)} ${px2rem(spacing.size3)};
  padding-top: ${(props) => (props.border ? px2rem(spacing.size5) : px2rem(spacing.size3))};
  letter-spacing: 0.25px;
  border-top: ${(props) => (props.border ? `1px solid ${colors["grayscale-white-with-opacity"]}` : "none")};
`;

export default { Sidebar, SidebarButton, Submenu, Links, SubmenuHeader, ArrowIcon, SubmenuTitle };
