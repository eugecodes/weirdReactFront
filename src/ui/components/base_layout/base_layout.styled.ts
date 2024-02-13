import styled from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";
import { SIDEBAR_WIDTH, BACKOFFICE_MAX_WIDTH } from "@/src/ui/styles/spacing";

const Wrapper = styled.div`
  padding: ${px2rem(SIDEBAR_WIDTH)} 0 0 ${px2rem(SIDEBAR_WIDTH)};
  max-width: ${px2rem(BACKOFFICE_MAX_WIDTH)};
  margin: auto;
  min-height: 100vh;
`;

const BaseLayoutStyled = {
  Wrapper
};

export default BaseLayoutStyled;
