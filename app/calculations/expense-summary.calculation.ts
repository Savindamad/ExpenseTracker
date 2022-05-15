import { ExpenseSummary } from "../types/expense-sumary.type";
import { ExpenseType } from "../types/expense-type.type";
import { Expense } from "../types/expense.type";

const getChartColor = (percentage: number) => {
    if (percentage >= 0.75) {
        return 'red';
    }
    else if (percentage >= 0.25) {
        return 'blue';
    }
    else {
        return 'green';
    }
}

export const ExpenseSummaryCal = (expenses: Expense[], expenseTypes: ExpenseType[]): ExpenseSummary[] => {
    let summaryList: ExpenseSummary[] = [];
    expenseTypes.forEach(ex => {
        const spentAmount = expenses.filter(x => x.typeId === ex.id).reduce((accumulator, current) => accumulator + Number(current.amount), 0);
        const percentage = (ex.limit === 0) ? 0 : Number((spentAmount / ex.limit).toFixed(3));
        summaryList.push({
            id: ex.id,
            name: ex.name,
            icon: ex.icon,
            limit: ex.limit,
            spentAmount,
            availableOrOverdueAmount: Number(Math.abs(ex.limit - spentAmount).toFixed(2)),
            percentage: percentage,
            chartColor: getChartColor(percentage)
        });
    });
    return summaryList;
};