
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const convertDateIntoTwoDigit = (nu: number) => {
  if (nu < 9 && nu >= 1) {
    return ("0" + nu).slice(-2);
  }

  return nu;
};

// Formating Date like : 01 Jan 2023
export const formatDate = (dateObj: Date) => {
  const date = new Date(dateObj);

  const format =
    convertDateIntoTwoDigit(date.getDate()) +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear();
  return format;
};


