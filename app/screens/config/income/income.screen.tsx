import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

import { ListIncome } from './list-income.screen';
import { AddEditIncome } from './add-edit-income.screen';

const Stack = createNativeStackNavigator();

export const Income = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListIncome"
                component={ListIncome}
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('ConfigMenu')}>
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    headerBackButtonMenuEnabled: true,
                    headerTitle: 'Income',
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('AddEditIncome')
                            }>
                            <Icon name="plus-circle-outline" size={30} />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="AddEditIncome"
                component={AddEditIncome}
                options={{
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('ListIncome')}>
                            <Icon name="chevron-left" size={40} />
                        </Pressable>
                    ),
                    title: 'Add income',
                }}
            />
        </Stack.Navigator>
    );
};
