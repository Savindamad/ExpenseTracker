import { ExpenseType } from "./expense-type.type";

export type Expense = {
    name : string;
    time: Date;
    amount: number;
    icon: string;
}