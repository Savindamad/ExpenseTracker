import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Expense } from '../types/expense.type';

const database_name = 'expenses.db';

export const getDBConnection = async () => {
    return openDatabase(
        { name: database_name, createFromLocation: 1 },
        () => {},
        e => {
            console.log(e);
        },
    );
};
