import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { typography } from "@/src/ui/styles/typography";
import { formContainerGrid, formSubtitle, px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Page = styled.div`
  padding-bottom: ${px2rem(spacing.size6)};

  h2 {
    margin-top: ${px2rem(spacing.size4)};
    ${formSubtitle}
  }
`;

const TabWrapper = styled.div`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size10)};
  margin-top: ${px2rem(spacing.size6)};
`;

const FormGroupLabel = styled.p`
  ${typography.bodyLBold};
  margin-bottom: ${px2rem(spacing.size4)};
`;

const FormGrid = styled.div`
  ${formContainerGrid};
  padding-bottom: ${px2rem(spacing.size3)};
  margin-bottom: ${px2rem(spacing.size3)};
  border-bottom: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
`;

const Form = styled.div`
  padding-top: ${px2rem(spacing.size6)};
`;

export default { TabWrapper, Page, FormGroupLabel, FormGrid, Form };
