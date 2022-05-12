import { ExpenseType } from "./expense-type.type";

export type Expense = {
    id: number;
    name : string;
    time: Date;
    amount: number;
    typeId?: number;
    icon: string;
}