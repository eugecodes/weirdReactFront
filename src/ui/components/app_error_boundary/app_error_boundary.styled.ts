import styled from "styled-components";
import { colors } from "../../styles/colors";
import { px2rem } from "@/src/ui/styles/utils";
import { shadows } from "@/src/ui/styles/shadows";
import { spacing } from "../../styles/spacing";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 90vh;

  > div {
    padding: ${px2rem(spacing.size8)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 80%;
    background-color: ${colors["grayscale-white-accent"]};
    margin: auto;
    box-shadow: ${shadows[60]};
    border-radius: ${px2rem(6)};
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;

const AppErrorBoundaryStyled = {
  Wrapper
};

export default AppErrorBoundaryStyled;
