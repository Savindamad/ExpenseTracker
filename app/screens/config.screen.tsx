import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ExpenseTypes } from "./config/expense-types/expense-types.screen";
import { ConfigMenu } from "./config/config-munu.screen";

const Stack = createNativeStackNavigator();

export const Config = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ConfigMenu" component={ConfigMenu} options={{ headerTitle: 'User Configurations' }} />
            <Stack.Screen name="ExpenseTypes" component={ExpenseTypes} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}