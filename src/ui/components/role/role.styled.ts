import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { fonts } from "@/src/ui/styles/fonts";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";

interface RoleProps {
  value: number;
}

const getColorByRole = (role: number) => {
  switch (role) {
    case 1:
      return colors["grayscale-charcoal-accent"];
    case 2:
      return colors["brand-peach-accent"];
  }
};

const RoleWrapper = styled.div<RoleProps>`
  background-color: ${(props) => getColorByRole(props.value)};
  padding: ${px2rem(3)} ${px2rem(spacing.size2)};
  border-radius: ${px2rem(spacing.size1)};
  color: ${colors["grayscale-white-accent"]};
  font-weight: 600;
  font-size: ${px2rem(10)};
  line-height: ${px2rem(10)};
  text-transform: uppercase;
  width: fit-content;
  ${fonts.Body}
`;

export default { RoleWrapper };
