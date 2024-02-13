import { colors } from "@/src/ui/styles/colors";
import { typography } from "@/src/ui/styles/typography";
import styled from "styled-components";

const FormFooter = styled.div`
  display: flex;
  justify-content: center;

  a {
    ${typography.bodyLCaption}
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;

const SuccessWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const ErrorMessage = styled.span`
  ${typography.errorText}
`;

export default { FormFooter, SuccessWrapper, ErrorMessage };
