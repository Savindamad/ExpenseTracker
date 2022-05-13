import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";
import { Button } from "react-native-elements";
import { openDatabase } from 'react-native-sqlite-storage';

import { common } from "../../../styles/common.style";

export const AddEditExpenseType = ({ navigation }) => {

    const [nameValue, onChangeName] = useState<string>('');
    const [descValue, onChangeDesc] = useState<string>('');
    const [limitValue, onChangeLimit] = useState<number | null>(0);

    const addExpenseType = () => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });

        database.transaction((txn) => {
            txn.executeSql(
                `INSERT INTO expense_type (name, icon_id, cat_limit, is_system, description, type) VALUES (?, ?, ?, ?, ?, ?)`,
                [nameValue, 11, limitValue, 0, descValue, 'PRIMARY'],
                (tx, res) => {
                    navigation.navigate("ListExpenseType");
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    return (
        <View style={common.bc_white}>
            <View>
                <Text style={common.label}>Expense Type<Text style={common.c_red}>*</Text>
                </Text>
                <TextInput style={[common.input, common.mh_10, common.p_10]}
                    onChangeText={onChangeName} value={nameValue} placeholder="Enter expense type " />
            </View>
            <View>
                <Text style={common.label}>Expense Description
                </Text>
                <TextInput style={[common.input, common.mh_10, common.p_10]}
                    onChangeText={onChangeDesc} value={descValue} placeholder="Enter description" />
            </View>
            <View>
                <Text style={common.label}>Expense Limit<Text style={common.c_red}>*</Text>
                </Text>
                <FakeCurrencyInput
                    style={[common.input, common.mh_10, common.ph_10, common.pv_7]}
                    value={limitValue}
                    onChangeValue={value => onChangeLimit(value)}
                    prefix="€"
                    delimiter=","
                    separator="."
                    precision={2}
                />
            </View>
            <Button
                style={[common.p_10, { marginTop: 10 }]}
                title="Add expense type"
                onPress={() => addExpenseType()}
            />
        </View>
    );
}