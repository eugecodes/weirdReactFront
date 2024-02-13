import { spacing } from "@/src/ui/styles/spacing";
import { typography } from "@/src/ui/styles/typography";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Error = styled.div`
  margin: ${px2rem(spacing.size1)} 0;

  p {
    ${typography.errorText}
  }
`;

export default { Error };
