import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";

import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";

const FormWrapper = styled.div`
  max-width: ${px2rem(380)};
  margin: auto;
  padding-top: ${px2rem(spacing.size12)};

  h1 {
    padding-bottom: ${px2rem(spacing.size4)};
  }

  h1 + p {
    color: ${colors["grayscale-charcoal-accent"]};
    line-height: ${px2rem(22)};
    padding-bottom: ${px2rem(spacing.size4)};
  }

  form > div > button {
    margin-bottom: ${px2rem(spacing.size6)};
  }
`;

export default { FormWrapper };
