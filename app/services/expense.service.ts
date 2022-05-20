import { ExpenseType } from '../types/expense-type.type';
import { Expense } from '../types/expense.type';
import { FixedExpense } from '../types/fixed-expense.type';
import { PickerData } from '../types/picker-data.type';
import { getDBConnection } from './database';

export const getExpenses = (): Promise<Expense[]> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                `SELECT expense.id, expense.name, expense.date_time, expense.amount, expense.type_id, icon.name as icon FROM expense
                INNER JOIN expense_type on expense.type_id = expense_type.id
                INNER JOIN icon ON expense_type.icon_id = icon.id
                WHERE strftime('%Y',expense.date_time) = strftime('%Y',date('now')) AND  strftime('%m',expense.date_time) = strftime('%m',date('now'))
                ORDER BY date(expense.date_time) DESC`,
                [],
                (tx, res) => {
                    let expenses: Expense[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenses.push({
                            id: item.id,
                            name: item.name,
                            time: new Date(item.date_time),
                            typeId: item.type_id,
                            amount: item.amount,
                            icon: item.icon,
                        });
                    }
                    resolve(expenses);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

export const addExpense = (expense: Expense): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                'INSERT INTO expense (name, type_id, date_time, amount) VALUES (?, ?, ?, ?)',
                [expense.name, expense.typeId, expense.time, expense.amount],
                () => {
                    resolve(true);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

export const updateExpense = (expense: Expense): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                'UPDATE expense SET name=?, amount=?, type_id=? WHERE id=?;',
                [expense.name, expense.amount, expense.typeId, expense.id],
                () => {
                    resolve(true);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

export const deleteExpense = (id: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                'DELETE FROM expense WHERE id = ?',
                [id],
                () => {
                    resolve(true);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

export const getExpenseTypes = (): Promise<ExpenseType[]> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                `SELECT expense_type.id, expense_type.name, expense_type.cat_limit, expense_type.is_system, expense_type.description, icon.name As icon FROM expense_type
                    INNER JOIN icon ON expense_type.icon_id = icon.id
                    WHERE expense_type.type = 'PRIMARY';`,
                [],
                (tx, res) => {
                    let expenseTypes: ExpenseType[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenseTypes.push({
                            id: item.id,
                            name: item.name,
                            isSystem: item.is_system,
                            limit: item.cat_limit,
                            icon: item.icon,
                        });
                    }
                    resolve(expenseTypes);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

export const getExpenseTypesForDropdown = (
    type: 'PRIMARY' | 'FIXED',
): Promise<PickerData[]> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                'SELECT * FROM expense_type where type=?',
                [type],
                (tx, res) => {
                    let expensesTypes: PickerData[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expensesTypes.push({
                            key: item.id,
                            label: item.name,
                            value: item.id,
                        });
                    }
                    resolve(expensesTypes);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};

export const getFixedExpenses = (): Promise<FixedExpense[]> => {
    return new Promise(async (resolve, reject) => {
        const db = getDBConnection();
        db.transaction(async txn => {
            txn.executeSql(
                `SELECT EF.id, EF.name, EF.type_id, EF.date_time, EF.amount, EF.start_date, EF.end_date, I.name 
                FROM expense_fixed EF
                INNER JOIN expense_type ET ON EF.type_id = ET.id
                INNER JOIN icon I on ET.icon_id = I.id;`,
                [],
                (tx, res) => {
                    let expenseTypes: FixedExpense[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenseTypes.push({
                            id: item.id,
                            name: item.name,
                            createdTime: new Date(),
                            amount: item.amount,
                            typeId: item.type_id,
                            icon: item.icon,
                            startedDate: new Date(),
                            endDate: new Date(),
                        });
                    }
                    resolve(expenseTypes);
                },
                error => {
                    reject(error);
                },
            );
        });
    });
};
