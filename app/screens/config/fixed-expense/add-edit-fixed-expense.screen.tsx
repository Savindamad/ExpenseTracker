import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";
import { Button } from "react-native-elements";
import { openDatabase } from 'react-native-sqlite-storage';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker'

import { common } from "../../../styles/common.style";
import { pickerSelectStyles } from "../../../styles/picker.style";
import { PickerData } from "../../../types/picker-data.type";

export const AddEditFixedExpense = ({ navigation }) => {

    const [nameValue, onChangeName] = useState<string>('');
    const [typeValue, onChangeType] = useState<number>(0);
    const [amountValue, onChangeAmount] = useState<number | null>(0);
    const [typeListItems, setTypeListItems] = useState<PickerData[]>([]);
    const [sDate, setSDate] = useState(new Date())
    const [sdOpen, setSOpen] = useState(false)
    const [eDate, setEDate] = useState(new Date())
    const [edOpen, setEOpen] = useState(false)

    useEffect(() => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction((txn) => {
            txn.executeSql(
                `SELECT * FROM expense_type where type='FIXED'`,
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

    const addExpenseType = () => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });

        database.transaction((txn) => {
            txn.executeSql(
                `INSERT INTO expense_type (name, icon_id, cat_limit, is_system, description, type) VALUES (?, ?, ?, ?, ?, ?)`,
                [nameValue, 11, amountValue, 0, typeValue, 'PRIMARY'],
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
                    onChangeText={onChangeName} value={nameValue} placeholder="Enter fixed expense" />
            </View>
            <View>
                <Text style={common.label}>Expense amount<Text style={common.c_red}>*</Text>
                </Text>
                <FakeCurrencyInput
                    style={[common.input, common.mh_10, common.ph_10, common.pv_7]}
                    value={amountValue}
                    onChangeValue={value => onChangeAmount(value)}
                    prefix="€"
                    delimiter=","
                    separator="."
                    precision={2}
                />
            </View>
            <View>
                <Text style={common.label}>Choose expense type<Text style={common.c_red}>*</Text>
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
            <View>
                <Text style={common.label}>Start date<Text style={common.c_red}>*</Text>
                </Text>
                <Pressable onPress={() => setSOpen(true)}>
                    <View pointerEvents="none">
                        <TextInput style={[common.input, common.mh_10, common.p_10]}
                            value={sDate.toDateString()} placeholder="Set start date" />
                    </View>
                </Pressable>
                <DatePicker
                    mode="date"
                    modal
                    open={sdOpen}
                    date={sDate}
                    onConfirm={(sDate) => {
                        setSOpen(false)
                        setSDate(sDate)
                    }}
                    onCancel={() => {
                        setSOpen(false)
                    }}
                />
            </View>
            <View>
                <Text style={common.label}>End date<Text style={common.c_red}>*</Text>
                </Text>
                <Pressable onPress={() => setEOpen(true)}>
                    <View pointerEvents="none">
                        <TextInput style={[common.input, common.mh_10, common.p_10]}
                            value={eDate.toDateString()} placeholder="Set end date" />
                    </View>
                </Pressable>
                <DatePicker
                    mode="date"
                    modal
                    open={edOpen}
                    date={eDate}
                    onConfirm={(eDate) => {
                        setEOpen(false)
                        setEDate(eDate)
                    }}
                    onCancel={() => {
                        setEOpen(false)
                    }}
                />
            </View>
            <Button
                style={[common.p_10, { marginTop: 10 }]}
                title="Add fixed expense"
                onPress={() => addExpenseType()}
            />
        </View>
    );
}