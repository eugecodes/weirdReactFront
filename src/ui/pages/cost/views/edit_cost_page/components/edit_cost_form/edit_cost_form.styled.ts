import { formButton, formContainerGrid, px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { typography } from "@/src/ui/styles/typography";

const FormWrapper = styled.div`
  padding-bottom: ${px2rem(spacing.size8)};
  form {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(spacing.size6)};
    margin-top: ${px2rem(spacing.size4)};

    h2 {
      padding-bottom: ${px2rem(spacing.size6)};
    }

    & > div > div {
      margin-bottom: ${px2rem(spacing.size3)};
    }
  }
`;

const Header = styled.div`
  padding: ${px2rem(38)} 0 ${px2rem(spacing.size8)};

  h1 {
    margin-bottom: ${px2rem(spacing.size4)};
  }
`;

const Button = styled.div`
  ${formButton}
`;

const Error = styled.div`
  margin: ${px2rem(spacing.size1)} 0;

  p {
    ${typography.errorText}
  }
`;

const Data = styled.div`
  ${formContainerGrid}
`;

export default { FormWrapper, Button, Error, Data, Header };
