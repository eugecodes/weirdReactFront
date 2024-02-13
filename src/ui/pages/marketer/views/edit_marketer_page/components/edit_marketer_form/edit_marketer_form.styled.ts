import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { formContainerGrid, formSubtitle, px2rem, formButton } from "@/src/ui/styles/utils";
import styled from "styled-components";
import DatePicker from "@/src/ui/components/date_picker/date_picker";

const MarketerData = styled.div`
  padding-top: ${px2rem(spacing.size6)};

  & > div {
    ${formContainerGrid}
    padding-bottom:  ${px2rem(spacing.size6)};
    border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  }

  h2 {
    ${formSubtitle}
  }

  h4 {
    font-weight: 600;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(12)};
  }
`;

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

const Button = styled.div`
  ${formButton}
`;

const DatePickerS = styled(DatePicker)`
  flex: 1;
  margin-bottom: ${px2rem(spacing.size5)};

  & div:has(input) {
    height: ${px2rem(58)};
    padding-left: ${px2rem(spacing.size2)};
  }

  input {
    opacity: 0;
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  & button {
    width: 100%;
    left: 0;
  }

  & span {
    width: 100%;
    vertical-align: middle;
  }
`;

const InputWithTooltip = styled.div`
  display: flex;
  gap: ${px2rem(spacing.size2)};
  align-items: center;

  div:not(:has(svg)) {
    flex: 1;
  }

  svg {
    height: ${px2rem(spacing.size3)};
    width: ${px2rem(spacing.size3)};
    margin-bottom: ${px2rem(spacing.size5)};
  }
`;

export default { MarketerData, Header, Button, DatePickerS, InputWithTooltip };
