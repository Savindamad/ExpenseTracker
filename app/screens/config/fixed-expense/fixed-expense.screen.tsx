import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

import { ListFixedExpense } from './list-fixed-expense.screen';
import { AddEditFixedExpense } from './add-edit-fixed-expense.screen';

const Stack = createNativeStackNavigator();

export const FixedExpense = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListFixedExpense"
                component={ListFixedExpense}
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('ConfigMenu')}
                        >
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    headerBackButtonMenuEnabled: true,
                    headerTitle: 'Fixed expense',
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('AddEditFixedExpense')
                            }
                        >
                            <Icon name="plus-circle-outline" size={30} />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="AddEditFixedExpense"
                component={AddEditFixedExpense}
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('ListFixedExpense')
                            }
                        >
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    title: 'Add fixed expense',
                }}
            />
        </Stack.Navigator>
    );
};
