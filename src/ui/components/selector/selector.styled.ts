import styled from "styled-components";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import { colors } from "@/src/ui/styles/colors";
import { InputLabel } from "@mui/material";
import { typography } from "@/src/ui/styles/typography";

const ClearButton = styled.div`
  min-width: unset !important;
  padding: 0 !important;

  button {
    padding: 0;
  }
  svg {
    min-width: ${px2rem(spacing.size3)};
    fill: ${colors["grayscale-black-accent"]};
  }
`;

const Label = styled(InputLabel)`
  background: ${colors["grayscale-white-accent"]};
  padding: 0 ${px2rem(spacing.size2)} !important;
`;

const Error = styled.div`
  margin: ${px2rem(spacing.size1)} 0;

  p {
    ${typography.errorText}
  }
`;

export default { ClearButton, Label, Error };
