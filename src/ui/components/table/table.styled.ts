import styled from "styled-components";
import { styled as muiStyled, Popper } from "@mui/material";
import { spacing } from "@/src/ui/styles/spacing";
import { px2rem, TextOverflowHidden } from "@/src/ui/styles/utils";
import { typography } from "@/src/ui/styles/typography";
import { colors } from "@/src/ui/styles/colors";
import { fonts } from "@/src/ui/styles/fonts";
import { shadows } from "@/src/ui/styles/shadows";
import { TableRow } from "@mui/material";

const Table = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
  overflow-x: auto;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  .subheader th {
    color: ${colors["grayscale-gray-accent"]};
  }

  background-color: ${colors["grayscale-white-accent"]};
  padding-top: ${px2rem(spacing.size2)};
`;

const Row = muiStyled(TableRow)(() => ({
  "&.Mui-selected": {
    backgroundColor: colors["grayscale-silver-accent"]
  },
  "&.Mui-selected:hover": {
    backgroundColor: colors["grayscale-gray-subtle"]
  }
}));

const CellWrapper = styled.td`
  height: 100%;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: ${px2rem(1)} solid rgba(224, 224, 224, 1);
  text-align: left;
  padding: ${px2rem(spacing.size4)};
  color: rgba(0, 0, 0, 0.87);
  max-width: ${px2rem(120)};
  ${TextOverflowHidden}
  cursor: default;

  span,
  p {
    ${typography.bodyS}
    font-weight: 500;
    color: ${colors["grayscale-charcoal-accent"]};
  }
`;

const TextCell = styled.span`
  ${typography.bodyS}
  font-weight: 500;
  color: ${colors["grayscale-charcoal-accent"]};
`;

const TheadCell = styled.th`
  padding: ${px2rem(7.5)} 0;
  display: table-cell;
  vertical-align: inherit;
  text-align: left;
  color: ${colors["grayscale-gray-accent"]};
  font-weight: 600;
  font-size: ${px2rem(11)};
  line-height: ${px2rem(spacing.size4)};
  text-transform: uppercase;
  letter-spacing: ${px2rem(0.8)};
  ${fonts.Title}
  box-sizing: content-box;

  button {
    color: ${colors["grayscale-charcoal-accent"]};
    text-decoration: underline;
    text-transform: none;
    letter-spacing: 0.5px;

    &:disabled {
      color: ${colors["grayscale-gray-subtle"]};
    }
  }

  &:has(input[type="checkbox"]) {
    padding-right: ${px2rem(spacing.size8)};
  }
`;

const FilterCell = styled.td`
  padding: ${px2rem(7.5)} ${px2rem(spacing.size7)} ${px2rem(7.5)} 0;
  display: table-cell;
  vertical-align: inherit;
  text-align: left;
  height: ${px2rem(spacing.size7)};
  min-width: ${px2rem(130)};
  max-width: ${px2rem(200)};
  overflow: hidden;

  & > div .MuiInputBase-root {
    max-width: ${px2rem(180)};
  }

  & > div:has(label) input[type="text"],
  & > div:has(label) input[type="number"] {
    padding: ${px2rem(6)} 0 ${px2rem(6)} ${px2rem(spacing.size3)};
    margin-bottom: 0;
  }

  div:has(input[type="text"]) > div,
  div:has(input[type="number"]) > div {
    margin-bottom: 0;
    padding-right: 0;
  }

  & > div:has(label) input {
    padding: 0;
  }

  div:not(:has(input[type="text"])) > div {
    padding: ${px2rem(3)} ${px2rem(spacing.size3)};
    min-width: ${px2rem(spacing.size12)};
  }

  div:has(input[type="number"]) > div {
    padding: ${px2rem(1)} ${px2rem(spacing.size3)} ${px2rem(1)} 0;
  }

  .MuiAutocomplete-root {
    min-width: ${px2rem(200)};

    label.MuiInputLabel-animated {
      top: -50%;
      translate: 0 50%;

      & + div {
        padding: 0;
      }
    }

    div:has(input) {
      padding: 0;
    }
  }
`;

const IconCell = styled.td`
  padding: ${px2rem(spacing.size5)} ${px2rem(6)} ${px2rem(spacing.size4)};
  border-bottom: ${px2rem(1)} solid rgba(224, 224, 224, 1);
  text-align: right;

  & button {
    padding: 0;
  }

  & button div:has(svg) {
    width: ${px2rem(36)};
  }

  svg {
    height: ${px2rem(spacing.size4)};
    width: ${px2rem(spacing.size4)};
  }
`;

const ActionsIconCell = styled.td`
  height: ${px2rem(spacing.size6)};
  width: ${px2rem(spacing.size6)};
  padding: ${px2rem(spacing.size1)};
  border-bottom: ${px2rem(1)} solid rgba(224, 224, 224, 1);
  display: table-cell;
  vertical-align: inherit;
  text-align: left;
  position: relative;

  svg {
    height: ${px2rem(spacing.size6)};
    width: ${px2rem(spacing.size6)};
  }
`;

const ActionsContainer = styled.div`
  position: absolute;
  background-color: ${colors["grayscale-white-accent"]};
  padding: ${px2rem(14)} ${px2rem(1)};
  box-shadow: ${shadows[60]};
  z-index: 50;
  top: -${px2rem(10)};
  left: -${px2rem(spacing.size12)};
  border: ${px2rem(1)} solid ${colors["grayscale-silver-subtle"]};
  border-radius: ${px2rem(spacing.size1)};
  min-width: ${px2rem(140)};

  display: flex;
  flex-direction: column;

  & button.MuiButton-text {
    ${typography.buttonSettingsText}

    &:disabled {
      color: ${colors["grayscale-gray-subtle"]};
    }

    padding: ${px2rem(10)} ${px2rem(spacing.size6)};
    &:hover {
      background-color: ${colors["grayscale-silver-subtle"]};
    }
  }
`;

const NoResultsText = styled.p`
  padding-top: ${px2rem(spacing.size8)};
  color: ${colors["grayscale-charcoal-subtle"]};
`;

const SelectedActions = styled.td`
  padding-left: ${px2rem(spacing.size6)};
  border-bottom: 1px solid ${colors["grayscale-silver-subtle"]};

  span {
    margin-right: ${px2rem(spacing.size8)};
    ${typography.bodyS}
    font-weight: 500;
  }

  & button {
    padding: 0;
  }

  & button div:has(svg) {
    width: ${px2rem(36)};
  }

  & button:not(:last-child) {
    margin-right: ${px2rem(spacing.size6)};
  }

  svg {
    height: ${px2rem(spacing.size4)};
    width: ${px2rem(spacing.size4)};
  }
`;

const PopperS = muiStyled(Popper)`
  z-index: 100;
`;

export default {
  Table,
  TableHead,
  Row,
  CellWrapper,
  TextCell,
  TheadCell,
  FilterCell,
  IconCell,
  ActionsIconCell,
  NoResultsText,
  ActionsContainer,
  SelectedActions,
  PopperS
};
