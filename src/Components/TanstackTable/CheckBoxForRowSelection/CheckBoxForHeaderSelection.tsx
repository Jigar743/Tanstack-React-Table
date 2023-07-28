import { Table } from "@tanstack/react-table";
import { userColumn } from "../../../Types/user";
import ChechBox from "./ChechBox";

export const checkBoxForHeaderSelection = (table: Table<userColumn>) => {
  return (
    <ChechBox
      {...{
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onChange: table.getToggleAllRowsSelectedHandler(),
      }}
    />
  );
};
