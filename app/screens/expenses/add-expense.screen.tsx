import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { openDatabase } from 'react-native-sqlite-storage';
import { Button } from "react-native-elements";

import { ExpenseType } from "../../types/expense-type.type";

export const AddExpense = ({ navigation }) => {
    const [nameValue, onChangeName] = useState<string>('');
    const [typeValue, onChangeType] = useState('');
    const [amountValue, onChangeAmount] = useState('');
    let database;

    const [typeListItems, setTypeListItems] = useState<ExpenseType[]>([]);
    useEffect(() => {
        database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction((txn) => {
            txn.executeSql(
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


    const addExpense = () => {
        database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction((txn) => {
            txn.executeSql(
                `INSERT INTO expense (name, type_id, date_time, amount) VALUES (?, ?, ?, ?)`,
                [nameValue, parseInt(typeValue), new Date().toISOString(), parseFloat(amountValue)],
                (tx, res) => {
                    navigation.navigate("ListExpense");
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    const renderTypeList = () => {
        return typeListItems.map((item) => {
            return <Picker.Item key={item.id} label={item.name} value={item.id} />
        });
    }
    return (
        <View>
            <TextInput style={[styles.input, styles.m10, styles.p10]}
                onChangeText={onChangeName} value={nameValue} placeholder="Expense" />
            <TextInput style={[styles.input, styles.m10, styles.p10]}
                onChangeText={onChangeAmount} value={amountValue} placeholder="Amount" keyboardType="numeric" />
            <Picker
                selectedValue={typeValue}
                onValueChange={(value, itemIndex) => onChangeType(value)}>
                {renderTypeList()}
            </Picker>
            <Button
                style={styles.p10}
                type="outline"
                title="Add expense"
                onPress={() => addExpense()}
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
        borderWidth: 1,
        borderRadius: 3
    },
});