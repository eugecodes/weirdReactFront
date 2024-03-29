import styled from "styled-components";
import { animated } from "react-spring";
import { px2rem } from "@/src/ui/styles/utils";
import { colors } from "../../styles/colors";

const Wrapper = styled(animated.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 20%);
  width: 100%;
  height: 100%;
  z-index: 9;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 900;
  min-height: ${px2rem(100)};
  margin: ${px2rem(16)};
  padding: ${px2rem(16)};
  background-color: ${colors["grayscale-white-accent"]};
  pointer-events: all;
  width: 93%;
  max-width: 700px;
`;

const ModalStyled = {
  Wrapper,
  Content
};

export default ModalStyled;
