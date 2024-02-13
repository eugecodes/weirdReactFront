import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";

const Page = styled.div`
  padding-bottom: ${px2rem(spacing.size4)};
`;

const TabWrapper = styled.div`
  border-top: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  padding-top: ${px2rem(spacing.size10)};
  margin-top: ${px2rem(spacing.size6)};
`;

export default { TabWrapper, Page };
