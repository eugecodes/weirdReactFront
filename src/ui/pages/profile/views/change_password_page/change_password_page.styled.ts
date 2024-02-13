import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formButton, formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Header = styled.div`
  padding-top: ${px2rem(38)};

  h2 {
    padding-bottom: ${px2rem(spacing.size4)};
  }

  p {
    color: ${colors["grayscale-charcoal-accent"]};
    line-height: ${px2rem(22)};
  }
`;

const Alert = styled.div`
  margin: ${px2rem(spacing.size7)} 0 ${px2rem(spacing.size8)};
`;

const Form = styled.div`
  ${formContainerGrid}
  grid-template-columns: repeat(2,${px2rem(300)}) ${px2rem(60)};
  margin-bottom: ${px2rem(20)};
  align-items: flex-start;

  button {
    align-self: center;
  }

  img {
    height: ${px2rem(spacing.size6)};
  }

  div {
    margin-bottom: 0;
  }
`;

const PasswordCheckerWrapper = styled.div`
  max-width: ${px2rem(380)};
`;

const Button = styled.div`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size6)};
  ${formButton}
`;
export default { Header, Button, Form, PasswordCheckerWrapper, Alert };
