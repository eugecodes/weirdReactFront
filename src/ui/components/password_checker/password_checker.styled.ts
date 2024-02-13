import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { typography } from "@/src/ui/styles/typography";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";

const MeterWrapper = styled.div`
  meter {
    width: 100%;

    &::-webkit-meter-bar {
      background: ${colors["grayscale-silver-subtle"]};
    }

    &::-webkit-meter-even-less-good-value {
      background: ${colors["secondary-alert-red-accent"]};
    }

    &::-webkit-meter-suboptimum-value {
      background: ${colors["brand-peach-subtle"]};
    }

    &::-webkit-meter-optimum-value {
      background: ${colors["secondary-ok-green-accent"]};
    }
  }
`;

const RequirementWrapper = styled.div`
  & > label {
    ${typography.bodyM}
    color: ${colors["grayscale-charcoal-accent"]};
    margin: ${px2rem(9)} 0 ${px2rem(14)};
    display: block;
  }

  svg {
    width: ${px2rem(16)};
  }
`;

interface RequirementProps {
  checked?: boolean;
}

const Requirement = styled.div<RequirementProps>`
  filter: grayscale(${(props) => (props.checked ? "0" : "100%")});
  display: flex;
  align-items: flex-end;
  gap: ${px2rem(spacing.size2)};
  margin-top: ${px2rem(3)};
  transition: filter 0.5s;

  & > svg:is(svg) {
    margin-bottom: 0;
  }

  svg + p {
    transition: color 0.33s;
    ${typography.bodyM}
    color: ${(props) => (props.checked ? colors["grayscale-charcoal-accent"] : colors["grayscale-gray-accent"])};
  }
`;

export default { MeterWrapper, RequirementWrapper, Requirement };
