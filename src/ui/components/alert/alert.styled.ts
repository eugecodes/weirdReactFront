import styled from "styled-components";
import { spacing } from "@/src/ui/styles/spacing";
import { colors } from "@/src/ui/styles/colors";
import { px2rem } from "@/src/ui/styles/utils";

const AlertWrapper = styled.div`
  padding: ${px2rem(14)} ${px2rem(spacing.size4)};
  background-color: ${colors["brand-ivory-subtle"]};
  border-radius: ${px2rem(spacing.size1)};
  border: ${px2rem(1)} solid ${colors["brand-tangerine-accent"]};
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${px2rem(spacing.size2)};

  img {
    height: ${px2rem(20)};
  }

  span {
    color: ${colors["brand-tangerine-accent"]};
  }
`;

export default { AlertWrapper, Alert };
