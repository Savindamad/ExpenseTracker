import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { FakeCurrencyInput } from 'react-native-currency-input';

import { PickerData } from '../../types/picker-data.type';
import { Expense } from '../../types/expense.type';
import { pickerSelectStyles } from '../../styles/picker.style';
import { common } from '../../styles/common.style';
import {
    addExpense,
    getExpenseTypesForDropdown,
    updateExpense,
} from '../../services/expense.service';

export const AddEditExpense = ({ navigation, route }) => {
    let editData: Expense = route.params ? JSON.parse(route.params) : null;
    // if (editData) {
    //     navigation.setOptions({ title: 'Edit expense' });
    // }

    const [nameValue, onChangeName] = useState<string>(
        editData ? editData.name : '',
    );
    const [typeValue, onChangeType] = useState(editData ? editData.typeId : 0);
    const [amountValue, onChangeAmount] = useState<number | null>(
        editData ? editData.amount : 0,
    );
    const [typeListItems, setTypeListItems] = useState<PickerData[]>([]);

    useEffect(() => {
        getExpenseTypesForDropdown('PRIMARY').then(expensesTypes => {
            setTypeListItems(expensesTypes);
        });
    }, []);

    const addEditExpense = () => {
        const expense: Expense = {
            id: editData ? editData.id : 0,
            name: nameValue,
            typeId: typeValue,
            time: new Date(),
            amount: amountValue ? amountValue : 0,
            icon: '',
        };

        if (editData) {
            updateExpense(expense);
        } else {
            addExpense(expense).then(() => {
                navigation.navigate('ListExpense');
            });
        }
    };

    return (
        <View style={[common.bc_white, common.f_1]}>
            <View>
                <Text style={common.label}>
                    Expense<Text style={common.c_red}>*</Text>
                </Text>
                <TextInput
                    style={[common.input, common.mh_10, common.p_10]}
                    onChangeText={onChangeName}
                    value={nameValue}
                    placeholder="Ex: Grossay items for week"
                />
            </View>
            <View>
                <Text style={common.label}>
                    Amount<Text style={common.c_red}>*</Text>
                </Text>
                <FakeCurrencyInput
                    style={[
                        common.input,
                        common.mh_10,
                        common.ph_10,
                        common.pv_7,
                    ]}
                    value={amountValue}
                    onChangeValue={value => onChangeAmount(value)}
                    prefix="€"
                    delimiter=","
                    separator="."
                    precision={2}
                />
            </View>
            <View>
                <Text style={common.label}>
                    Choose expense type<Text style={common.c_red}>*</Text>
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
                style={[common.p_10, common.mt_10]}
                title={editData ? 'Update expense' : 'Add expense'}
                onPress={() => addEditExpense()}
            />
        </View>
    );
};
