import styled from "styled-components";
import { colors } from "../../styles/colors";
import { px2rem } from "@/src/ui/styles/utils";

const LoaderStyled = styled.div`
  position: relative;
  width: ${px2rem(10)};
  height: ${px2rem(10)};
  border-radius: ${px2rem(5)};
  background-color: ${colors["grayscale-gray-accent"]};
  color: ${colors["grayscale-gray-accent"]};
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: ${px2rem(-15)};
    width: ${px2rem(10)};
    height: ${px2rem(10)};
    border-radius: ${px2rem(5)};
    background-color: ${colors["grayscale-gray-accent"]};
    color: ${colors["grayscale-gray-accent"]};
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: ${px2rem(15)};
    width: ${px2rem(10)};
    height: ${px2rem(10)};
    border-radius: ${px2rem(5)};
    background-color: ${colors["grayscale-gray-accent"]};
    color: ${colors["grayscale-gray-accent"]};
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: ${colors["grayscale-gray-accent"]};
    }

    50%,
    100% {
      background-color: ${colors["grayscale-gray-subtle"]};
    }
  }
`;

export default LoaderStyled;
