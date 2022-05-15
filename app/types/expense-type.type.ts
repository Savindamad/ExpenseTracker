export type ExpenseType = {
    id: number;
    name: string;
    isSystem: boolean;
    description?: string;
    icon: string;
    limit: number;
}