import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from "react-native";

import { ListExpenseTypes } from "./list-expense-types.screen";
import { AddEditExpenseType } from "./add-edit-expense-typese.screen";


const Stack = createNativeStackNavigator();

export const ExpenseTypes = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListExpenseTypes" component={ListExpenseTypes}
                options={{
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.navigate("ConfigMenu")}>
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    headerBackButtonMenuEnabled: true,
                    headerTitle: 'Expense types',
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate("AddExpenseType")}>
                            <Icon name="plus-circle-outline" size={30} />
                        </Pressable>
                    ),
                }} />
            <Stack.Screen name="AddExpenseType" component={AddEditExpenseType}
                options={{
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.navigate("ListExpenseTypes")}>
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    title: 'Add expense type'
                }} />
        </Stack.Navigator>
    );
}