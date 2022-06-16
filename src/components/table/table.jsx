import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import { columns, clientData } from "./constant";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(n)": {
    backgroundColor: "#fff",
  },
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  "&:nth-of-type(even)": {
    border: "1px solid black",
  },
  "&:nth-of-type(odd)": {
    border: "1px solid black",
  },
}));

const { H1, H2 } = clientData;

let levelName = [];
let isleaf = false;
let value = "";

const data = (label) => {
  if (label.sub) {
    isleaf = true;
    levelName.push(label.levelName);
    value = `${value}${label?.accountId}_`;
    label?.sub?.map((e) => data(e));
  } else {
    return value;
  }
  return {
    name: label?.name,
    originalValue: label?.accountId,
    value: value,
    isLeaf: isleaf,
    LevelName: levelName,
  };
};

const dataArray = [data(H1), data(H2)];

const TableDisplay = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        flexGrow: 1,
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Paper>
        <Table>
          <TableHead>
            {columns.map(({ label }) => (
              <StyledTableCell
                align="center"
                sx={{ color: "black", fontWeight: "bold" }}
              >
                {label}
              </StyledTableCell>
            ))}
          </TableHead>
          <TableBody>
            {dataArray.map((Data) => (
              <StyledTableRow key={Math.random()} selected role="checkbox">
                {columns.map(({ field }) => (
                  <StyledTableCell key={field} align="center">
                    {Data[field]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default TableDisplay;
