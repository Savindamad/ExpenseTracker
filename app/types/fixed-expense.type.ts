export type FixedExpense = {
    id: number;
    name: string;
    createdTime: Date;
    amount: number;
    typeId?: number;
    icon: string;
    startedDate: Date;
    endDate: Date;
}