import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { fonts } from "@/src/ui/styles/fonts";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";

interface EnabledProps {
  isEnabled: boolean;
}

const EnabledWrapper = styled.div<EnabledProps>`
  padding: ${px2rem(7.5)} ${px2rem(spacing.size4)};
  display: flex;
  align-items: center;
  column-gap: ${px2rem(spacing.size2)};
  background-color: ${(props) => (props.isEnabled ? colors["secondary-ok-green-subtle"] : colors["grayscale-silver-subtle"])};
  border-radius: ${px2rem(spacing.size1)};
  width: min-content;
`;

const Ring = styled.span<EnabledProps>`
  width: ${px2rem(spacing.size2)};
  height: ${px2rem(spacing.size2)};
  box-sizing: border-box;
  border: ${px2rem(1)} solid ${(props) => (props.isEnabled ? colors["secondary-ok-green-accent"] : colors["grayscale-gray-accent"])};
  border-radius: 100%;
  background: ${colors["grayscale-white-accent"]};
`;

const EnabledText = styled.span`
  font-size: ${px2rem(14)};
  line-height: ${px2rem(14)};
  font-weight: 500;
  color: ${colors["brand-tangerine-accent"]};
  ${fonts.Body}
`;

export default { EnabledWrapper, Ring, EnabledText };
