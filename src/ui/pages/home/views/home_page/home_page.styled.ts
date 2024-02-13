import { colors } from "@/src/ui/styles/colors";
import { shadows } from "@/src/ui/styles/shadows";
import { SIDEBAR_WIDTH, spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const HomePage = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - ${px2rem(SIDEBAR_WIDTH)});
`;

const HomePageCard = styled.div`
  background-color: ${colors["grayscale-white-accent"]};
  box-shadow: ${shadows[60]};
  border: 1px solid ${colors["grayscale-silver-subtle"]};
  border-radius: ${px2rem(spacing.size1)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: ${px2rem(460)};
  height: ${px2rem(480)};

  p {
    margin: ${px2rem(spacing.size1)} 0;
    font-size: ${px2rem(spacing.size4)};
    line-height: ${px2rem(22)};
  }
`;

export default { HomePageCard, HomePage };
