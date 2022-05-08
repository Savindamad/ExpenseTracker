import { ExpenseType } from "./expense-type.type";

export type Expense = {
    description : string;
    type: ExpenseType;
    time: Date;
    amount: number;
}