import React from "react";
import { StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ListExpense } from "./expenses/list-expense.screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddExpense } from "./expenses/add-expense.screen";

const Stack = createNativeStackNavigator();

export const Expenses = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListExpense" component={ListExpense}
                options={{
                    headerTitle: 'Expenses',
                    headerRight: () => (
                        <Button type="clear"
                            onPress={() => navigation.navigate("AddExpense")}
                            icon={<Icon name="plus-circle-outline" size={25} />}
                        />
                    ),
                }} />
            <Stack.Screen name="AddExpense" component={AddExpense} options={{ title: 'Add expense' }} />
        </Stack.Navigator>
    );
}