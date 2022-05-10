import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { openDatabase } from 'react-native-sqlite-storage';
import CurrencyInput from 'react-native-currency-input';
import { Button } from "react-native-elements";

import { ExpenseType } from "../../types/expense-type.type";

export const AddExpense: React.FC = () => {
    const [nameValue, onChangeName] = useState<string>('');
    const [typeValue, onChangeType] = useState('');
    const [amountValue, onChangeAmount] = useState(null);

    const [typeListItems, setTypeListItems] = useState<ExpenseType[]>([]);
    useEffect(() => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction(async (txn) => {
            await txn.executeSql(
                `SELECT * FROM expense_type`,
                [],
                (tx, res) => {
                    let expensesTypes: ExpenseType[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expensesTypes.push({ id: item.id, name: item.name, isSystem: (item.is_system) })
                    }
                    setTypeListItems(expensesTypes);
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }, []);

    const renderTypeList = () => {
        return typeListItems.map((item) => {
            return <Picker.Item key={item.id} label={item.name} value={item.id} />
        })
    }
    return (
        <View>
            <TextInput style={[styles.input, styles.m10, styles.p10]} onChangeText={onChangeName} value={nameValue} placeholder="Expense" />
            <CurrencyInput style={[styles.input, styles.m10, styles.p10]}
                value={amountValue}
                placeholder="Amount"
                unit="$"
                delimiter=","
                separator="."
                precision={2}
            />
            <Picker
                selectedValue={typeValue}
                onValueChange={(value, itemIndex) => onChangeType(value)}>
                {renderTypeList()}
            </Picker>
            <Button
                style={styles.p10}
                type="outline"
                title="Add expense"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    m10: {
        margin: 10
    },
    p10: {
        padding: 10
    },
    input: {
        height: 40,
        borderWidth: 1
    },
});