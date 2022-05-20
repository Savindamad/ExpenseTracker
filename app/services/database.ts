import { openDatabase } from 'react-native-sqlite-storage';

const database_name = 'expenses.db';

export const getDBConnection = () => {
    return openDatabase(
        { name: database_name, createFromLocation: 1 },
        () => {},
        e => {
            console.log(e);
        },
    );
};
