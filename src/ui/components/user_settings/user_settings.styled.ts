import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { shadows } from "@/src/ui/styles/shadows";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import { typography } from "@/src/ui/styles/typography";

const UserSettings = styled.button`
  margin-left: ${px2rem(spacing.size4)};
  display: flex;
  align-items: center;
  gap: ${px2rem(spacing.size4)};
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
  }

  svg {
    height: ${px2rem(spacing.size4)};
    width: ${px2rem(spacing.size4)};
  }
`;

const UserImg = styled.span`
  color: ${colors["grayscale-white-accent"]};
  font-weight: 500;
  position: relative;
  font-size: ${px2rem(spacing.size5)};
  border: ${px2rem(2)} solid transparent;
  background-color: ${colors["brand-peach-accent"]};
  border-radius: 100%;
  height: ${px2rem(36)};
  width: ${px2rem(36)};
  display: grid;
  place-items: center;
`;

const UserSettingsInfoWrapper = styled.div`
  display: flex;
  align-items: center;

  & > span {
    height: ${px2rem(spacing.size8)};
    width: ${px2rem(spacing.size8)};
  }

  & span + div:first-of-type {
    display: flex;
    flex-direction: column;
    border-bottom: 0;
    padding: 0;
    padding-left: ${px2rem(spacing.size4)};

    & p {
      color: ${colors["grayscale-charcoal-accent"]};
      line-height: ${px2rem(18)};
    }

    & p:first-of-type {
      font-weight: 500;
      margin-bottom: ${px2rem(2)};
    }

    & span {
      margin-top: ${px2rem(spacing.size1)};
      padding: ${px2rem(3)} ${px2rem(spacing.size2)};
      background-color: ${colors["grayscale-charcoal-accent"]};
      width: ${px2rem(spacing.size9)};
      border-radius: ${px2rem(spacing.size1)};
      font-size: ${px2rem(10)};
      font-weight: 600;
      color: ${colors["grayscale-white-accent"]};
      text-transform: uppercase;
    }
  }
`;

interface UserSettingsPopUpProps {
  isOpen: boolean;
}

const UserSettingsPopUp = styled.div<UserSettingsPopUpProps>`
  position: absolute;
  top: calc(100% + ${px2rem(spacing.size7)});
  right: 0;
  background-color: ${colors["grayscale-white-accent"]};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  border-radius: ${px2rem(spacing.size1)};
  box-sizing: ${shadows[30]};
  transform: ${(props) => (props.isOpen ? "scaley(1)" : "scaley(0)")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform-origin: top;
  transition: transform 0.5s, opacity 0.33s;

  div {
    padding: ${px2rem(spacing.size6)};

    &:first-of-type {
      border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
    }
  }
`;

const UserSettingsLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(14)};

  button.MuiButton-text {
    padding: 0;
    justify-content: flex-start;
    transition: color 0.33s;
    ${typography.buttonSettingsText}

    &:hover {
      background-color: transparent;
      color: ${colors["brand-tangerine-accent"]};
    }
  }

  a {
    color: ${colors["grayscale-charcoal-accent"]};
    text-decoration: none;
    ${typography.buttonSettingsText}
  }
`;

const UserSettingsWrapper = styled.div`
  position: relative;
`;

export default {
  UserSettings,
  UserImg,
  UserSettingsInfoWrapper,
  UserSettingsPopUp,
  UserSettingsLinksWrapper,
  UserSettingsWrapper
};
