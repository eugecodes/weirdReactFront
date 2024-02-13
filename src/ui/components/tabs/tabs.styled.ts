import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { px2rem } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { Tab as MuiTab } from "@mui/material";
import { styled as muiStyled } from "@mui/system";

const TabWrapper = styled.div`
  background-color: ${colors["grayscale-silver-subtle"]};
  border-radius: ${px2rem(spacing.size1)};
  margin-bottom: ${px2rem(spacing.size4)};

  & .MuiTabs-flexContainer > button {
    padding: 0 ${px2rem(spacing.size4)};
  }
`;

const Tab = muiStyled(MuiTab)({
  fontWeight: "700",
  fontSize: px2rem(spacing.size3),
  lineHeight: px2rem(spacing.size3),
  padding: px2rem(spacing.size3) + " 0 " + px2rem(10)
});

const TabPanel = styled.div`
  width: 100%;
  display: block;
`;

export default { TabWrapper, Tab, TabPanel };
