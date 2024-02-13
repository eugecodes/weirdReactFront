import { px2rem } from "@/src/ui/styles/utils";
import { SIDEBAR_WIDTH, spacing } from "@/src/ui/styles/spacing";
import styled from "styled-components";
import { colors } from "@/src/ui/styles/colors";
import { typography } from "@/src/ui/styles/typography";

const Page = styled.div`
  padding-right: ${px2rem(40)};
`;

const Header = styled.div`
  margin: ${px2rem(spacing.size11)} 0;

  h1 {
    padding-bottom: ${px2rem(spacing.size4)};
  }

  p {
    ${typography.bodyL}
    color: ${colors["grayscale-850"]};
  }
`;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr) ${px2rem(85)};
  gap: 16px;
  position: relative;

  .MuiFormControl-root {
    width: 100%;

    .MuiSelect-select {
      padding-top: 6px;
      padding-bottom: 6px;
    }
  }

  & > div {
    max-height: ${px2rem(35)};
    & > div > div {
      margin-bottom: 0;

      input {
        height: ${px2rem(35)};
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
`;

const CleanButtonWrapper = styled.div`
  position: absolute;
  right: -${px2rem(90)};
  top: 50%;
  translate: 0 -50%;

  & > button {
    color: ${colors["grayscale-gray-accent"]};
    text-transform: none;
  }
`;

const SelectRateFooter = styled.div`
  position: absolute;
  left: ${px2rem(SIDEBAR_WIDTH)};
  bottom: 0;
  width: calc(100% - ${px2rem(SIDEBAR_WIDTH)});
  height: ${px2rem(100)};
  border-top: 1px solid ${colors["grayscale-silver-accent"]};
  padding: ${px2rem(spacing.size3)} ${px2rem(spacing.size9)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${px2rem(spacing.size9)};

  p {
    ${typography.bodyM}
  }
`;

export default { FilterWrapper, CleanButtonWrapper, Header, Page, SelectRateFooter };
