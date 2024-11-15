import * as SelectPrimitive from "@/src/components/shared/react-native-reusables/primitives/select";

export enum IconPaths {
  cashIn = "https://cdn-icons-png.flaticon.com/512/4256/4256796.png",
  cashOut = "https://cdn-icons-png.flaticon.com/512/4221/4221548.png",
}
export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
} as const;

export const TYPE_OPTIONS: NonNullable<SelectPrimitive.Option>[] = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];
export const EXPENSE_CATEGORY_OPTIONS: NonNullable<SelectPrimitive.Option>[] = [
  { value: "Basic Need", label: "Basic Need" },
  { value: "Desire", label: "Desire" },
  { value: "Investment", label: "Investment" },
  { value: "Uncategorized", label: "Uncategorized" },
];
export const INCOME_CATEGORY_OPTIONS: NonNullable<SelectPrimitive.Option>[] = [
  { value: "Salary", label: "Salary" },
  { value: "Bonus", label: "Bonus" },
  { value: "Investment Return", label: "Investment Return" },
  { value: "Uncategorized", label: "Uncategorized" },
];
export const FUND_OPTIONS: NonNullable<SelectPrimitive.Option>[] = [
  { value: "Cash", label: "Cash" },
];
