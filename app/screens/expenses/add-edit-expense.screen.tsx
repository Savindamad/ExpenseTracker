import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import { Button, Text } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import { FakeCurrencyInput } from 'react-native-currency-input';

import { PickerData } from "../../types/picker-data.type";

export const AddEditExpense = ({ navigation }) => {
    const [nameValue, onChangeName] = useState<string>('');
    const [typeValue, onChangeType] = useState('');
    const [amountValue, onChangeAmount] = useState<number | null>(0);
    let database;

    const [typeListItems, setTypeListItems] = useState<PickerData[]>([]);
    useEffect(() => {
        database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction((txn) => {
            txn.executeSql(
                `SELECT * FROM expense_type`,
                [],
                (tx, res) => {
                    let expensesTypes: PickerData[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expensesTypes.push({ key: item.id, label: item.name, value: item.id })
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
                [nameValue, parseInt(typeValue), new Date().toISOString(), amountValue],
                (tx, res) => {
                    navigation.navigate("ListExpense");
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View>
                <Text style={styles.label}>Expense<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <TextInput style={[styles.input, styles.mh10, styles.p10]}
                    onChangeText={onChangeName} value={nameValue} placeholder="Ex: Grossay items for week" />
            </View>
            <View>
                <Text style={styles.label}>Amount<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <FakeCurrencyInput
                    style={[styles.input, styles.mh10, {paddingHorizontal: 10, paddingVertical: 7}]}
                    value={amountValue}
                    onChangeValue={value => onChangeAmount(value)}
                    prefix="€"
                    delimiter=","
                    separator="."
                    precision={2}
                />
            </View>
            <View>
                <Text style={styles.label}>Choose expense type<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <RNPickerSelect
                    placeholder={{}}
                    items={typeListItems}
                    onValueChange={value => onChangeType(value)}
                    style={pickerSelectStyles}
                    value={typeValue}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColorAndroid: 'cyan' }}
                />
            </View>
            <Button
                style={[styles.p10, { marginTop: 10 }]}
                title="Add expense"
                onPress={() => addExpense()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 16
    },
    m10: {
        margin: 10
    },
    mh10: {
        marginHorizontal: 10
    },
    p10: {
        padding: 10
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'grey',
        fontSize: 14,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 2,
        color: 'black',
        marginHorizontal: 10
    },
    inputAndroid: {
        fontSize: 14,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 2,
        color: 'black',
        marginHorizontal: 10
    },
});