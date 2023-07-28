import { createColumnHelper } from "@tanstack/react-table";
import { Users, userColumn } from "../Types/user";
import ImageRender from "../Components/ImageRender";
import { formatDate } from "./helper";
import { checkBoxForHeaderSelection } from "../Components/TanstackTable/CheckBoxForRowSelection/CheckBoxForHeaderSelection";
import { checkBoxForCellSelection } from "../Components/TanstackTable/CheckBoxForRowSelection/CheckBoxForCellSelection";

const columnHelper = createColumnHelper<userColumn>();

export const userColumnsDef = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => checkBoxForHeaderSelection(table),
    cell: ({ row }) => checkBoxForCellSelection(row),
  }),
  columnHelper.accessor("picture", {
    header: "Picture",
    cell: ImageRender,
  }),
  columnHelper.accessor("gender", { header: "Gender" }),
  columnHelper.group({
    header: "Name",
    columns: [
      columnHelper.accessor("prefix", { header: "Prefix" }),
      columnHelper.accessor("first_name", { header: "First Name" }),
      columnHelper.accessor("last_name", { header: "Last Name" }),
    ],
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.group({
    header: "Date of Birth Section",
    columns: [
      columnHelper.accessor("date_of_birth", {
        header: "Date of Birth",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("age", {
        header: "Age",
      }),
    ],
  }),
];

export const generateTableData = (data: Users) => {
  let arr: Array<userColumn> = [];

  arr = data?.map((d) => ({
    gender: d.gender,
    first_name: d.name.first,
    last_name: d.name.last,
    prefix: d.name.title,
    age: d.dob.age,
    date_of_birth: d.dob.date,
    email: d.email,
    picture: d.picture.thumbnail,
  }));

  return arr;
};
