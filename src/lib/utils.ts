import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(data: number) {
  return Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumSignificantDigits: 2,
    useGrouping: true,
  }).format(data);
}

export function formatCurrency(data: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  }).format(data);
}

export function formatDate(period: string) {
  return new Date(period).toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}
