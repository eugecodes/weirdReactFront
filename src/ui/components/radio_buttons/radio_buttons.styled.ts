import styled from "styled-components";
import { typography } from "@/src/ui/styles/typography";
import { colors } from "@/src/ui/styles/colors";
import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";

const Wrapper = styled.div`
  p {
    color: ${colors["grayscale-charcoal-subtle"]};
    ${typography.bodyS};
  }
`;

const Error = styled.div`
  margin: ${px2rem(spacing.size1)} 0;

  p {
    ${typography.errorText}
  }
`;

export default { Wrapper, Error };
