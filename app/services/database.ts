import { openDatabase } from 'react-native-sqlite-storage';

const database_name = "expenses.db";
const connection = openDatabase({ name: database_name, createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });

export class Database {
    static getConnection() {
        return connection;
    }
}