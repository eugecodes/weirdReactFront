import { px2rem } from "@/src/ui/styles/utils";
import styled from "styled-components";
import muiStyled from "@emotion/styled";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

const Wrapper = styled.div`
  height: ${px2rem(368)};
`;

const DataGrid = muiStyled(MuiDataGrid)`
  border: none;

  .MuiDataGrid-columnHeaderTitleContainer:focus {
    outline: none;
  }

  .MuiDataGrid-columnHeader--sortable:focus{
    outline: none;
  }
`;

export default { Wrapper, DataGrid };
