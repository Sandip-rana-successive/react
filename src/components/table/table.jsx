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
  MenuItem,
  Select,
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
let finalData = [];
const transformedData = (obj, id) => {
  let data = {};
  let final = {
    name: "",
    h1: "",
    h2: "",
  };
  let Id = "";
  if (typeof obj == "object") {
    const { name, levelName, sub, accountId } = obj;
    data.levelName = levelName;
    if (id) {
      Id = `${id}_${accountId}`;
    } else {
      Id = accountId;
    }
    data.name = name;
    if (sub) {
      data.isLeaf = false;
    } else data.isLeaf = true;
    if (sub) {
      obj.children = sub && sub.map((e) => transformedData(e, Id));
    }
    data.id = Id;
  }
  if (data.isLeaf) {
    if (data.levelName.toLowerCase() === "market") {
      final.name = data.levelName;
      final.h1 = data.name;
    } else if (data.levelName.toLowerCase() === "product") {
      final.h2 = data.name;
    }
    finalData.push(final);
  }
  return data;
};

const { H1, H2 } = clientData;
transformedData(H1);  

const TableDisplay = () => {
  let data = [];
  const [dropDown, setDropDown] = React.useState([]);
  const lastnode = (obj) => {
    let temp = {};
    if (obj.sub) {
      obj.sub.map((e) => lastnode(e));
    } else {
      temp.name = obj.levelName;
      temp.h1 = obj.name;
      data.push({ name: temp.name, h1: temp.h1, h2: temp.h1 });
    }
    if (data.length > 0) {
      return data;
    }
  };
  const arr = [lastnode(H1), lastnode(H2)];
  const finalArr = arr.pop();
  const handleOnSelect = (element) => {
    const data = arr[0].filter((e) => {
      return e.name.includes(element?.target?.value?.name);
    });
    setDropDown(data);
  };

  return (
    <>
      <Select
        labelId="dropdown-select"
        id="dropdown-name-select"
        align="center"
        placeholder="a"
        onChange={handleOnSelect}
        sx={{ mt: 1, mr: 20, width: "20ch" }}
      >
        {finalArr.map((Data) => (
          <MenuItem value={Data}>{Data.name}</MenuItem>
        ))}
      </Select>
      {dropDown?.length > 0 && (
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
                {dropDown.map((Data) => (
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
      )}
    </>
  );
};

export default TableDisplay;