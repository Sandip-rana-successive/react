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
import { columns, clientData, tableData } from "./constant";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#fff",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#f0f0f0",
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

let name = "";
let levelName = [];
let isleaf = false;
let value = "";



const data = (label) => {
  name = label?.name;
  if (label.sub) {
    isleaf = true;
    levelName.push(label.levelName);
    value = `${value}${label?.accountId}_`;
    label?.sub?.map((e) => data(e));
  } else {
    return value;
  }
  return {
    name: name,
    value: value,
    isLeaf: isleaf,
    LevelName: levelName,
  };
};
console.log("Data =>", JSON.stringify(data(H1), null, 4));
console.log("Data H2=>", JSON.stringify(data(H2), null, 4));

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
            {tableData.map((Data) => (
              <StyledTableRow key={Math.random()} selected role="checkbox">
                {columns.map(({ field }) => (
                  <StyledTableCell key={Math.random()} align="center">
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
