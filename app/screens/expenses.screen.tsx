import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

import { ListExpense } from './expenses/list-expense.screen';
import { AddEditExpense } from './expenses/add-edit-expense.screen';

const Stack = createNativeStackNavigator();

export const Expenses = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListExpense"
                component={ListExpense}
                options={{
                    headerTitle: 'Expenses',
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('AddEditExpense')
                            }>
                            <Icon name="plus-circle-outline" size={30} />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="AddEditExpense"
                component={AddEditExpense}
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('ListExpense')}>
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    title: 'Add expense',
                }}
            />
        </Stack.Navigator>
    );
};
