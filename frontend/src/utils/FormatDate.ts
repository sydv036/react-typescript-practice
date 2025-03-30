import dayjs from "dayjs";

type TDateFormat = "DD/MM/YYYY" | "YYYY-MM-DD";
export const formatDate = (date: any, formatType: TDateFormat) => {
  if (!date) return undefined;
  const result = dayjs(date).format(formatType);
  return result;
};
