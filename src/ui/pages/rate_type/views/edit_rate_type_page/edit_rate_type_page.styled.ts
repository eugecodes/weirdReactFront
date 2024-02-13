import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formButton, formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Header = styled.div`
  padding: ${px2rem(38)} 0 ${px2rem(spacing.size8)};

  h2 {
    padding-bottom: ${px2rem(spacing.size4)};
  }

  p {
    color: ${colors["grayscale-charcoal-accent"]};
    line-height: ${px2rem(22)};
  }
`;

const RateTypeForm = styled.div`
  padding-bottom: ${px2rem(28)};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  ${formContainerGrid}

  & > div div {
    margin-bottom: 0;
  }
`;

const Button = styled.div`
  ${formButton}
`;

export default { Header, RateTypeForm, Button };
