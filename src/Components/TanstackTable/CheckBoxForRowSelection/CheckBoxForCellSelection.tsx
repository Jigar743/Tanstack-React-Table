import { Row } from "@tanstack/react-table";
import { userColumn } from "../../../Types/user";
import ChechBox from "./ChechBox";

export const checkBoxForCellSelection = (row: Row<userColumn>) => {
  return (
    <ChechBox
      {...{
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
      }}
    />
  );
};
