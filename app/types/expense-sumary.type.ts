export type ExpenseSummary = {
    id: number;
    name : string;
    limit: number;
    spentAmount: number;
    availableOrOverdueAmount: number;
    percentage: number;
    icon: string;
    chartColor: string;
}