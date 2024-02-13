import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import { fonts } from "@/src/ui/styles/fonts";

interface DatePickerStlyeProps {
  value?: unknown;
}

const DatePickerWrapper = styled.div`
  position: relative;
`;

const DatePicker = styled.div<DatePickerStlyeProps>`
  display: flex;
  border: ${px2rem(1)} solid ${colors["grayscale-gray-accent"]};
  border-radius: ${px2rem(spacing.size1)};
  align-items: center;
  padding: ${px2rem(6)} ${px2rem(spacing.size5)};
  height: ${px2rem(36)};
  position: relative;
  padding-right: ${(props) => px2rem(props.value ? spacing.size7 : spacing.size2)} !important;

  input {
    border-radius: ${px2rem(spacing.size1)};
    border: none;
    padding: 0;
    width: 0;

    &:focus {
      outline: none;
    }
  }

  span {
    position: relative;
    text-align: center;

    ${fonts.Body};
    font-size: ${px2rem(14)};
    line-height: ${px2rem(14)};
    font-weight: 500;
  }

  & button {
    border-radius: ${px2rem(spacing.size1)};
    height: ${px2rem(36)};

    position: absolute;
    bottom: -50%;
    left: -${px2rem(15)};
    top: -${px2rem(10)};
    min-width: ${px2rem(100)};
  }

  & button svg {
    opacity: 0;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: ${px2rem(3)};
  right: ${px2rem(2)};
  padding: 0 !important;
  min-width: unset !important;

  & button {
    position: static;
    min-width: unset;
  }

  & button svg {
    opacity: 1;
    padding: 0;
    height: ${px2rem(12)};
    min-width: ${px2rem(12)};
    fill: ${colors["grayscale-black-accent"]};
  }
`;

export default { DatePicker, CloseIcon, DatePickerWrapper };
