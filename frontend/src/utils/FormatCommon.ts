import dayjs from "dayjs";

type TDateFormat = "DD/MM/YYYY" | "YYYY-MM-DD";
export const formatDate = (date: any, formatType: TDateFormat) => {
  if (!date) return undefined;
  const result = dayjs(date).format(formatType);
  return result;
};
export const formatPrice = (type: "vi-VN" | "en-US", price: number) => {
  if (price) {
    let current = "VND";
    if (type === "en-US") {
      current = "USD";
    } else {
      current = "VND";
    }

    return new Intl.NumberFormat(type, {
      style: "currency",
      currency: current,
    }).format(price);
  }
  return "NotFound";
};
