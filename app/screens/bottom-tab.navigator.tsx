import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Expenses } from './expenses.screen';
import { Report } from './report.screen';
import { Config } from './config.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTab: React.FC = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen
                name="Expenses"
                component={Expenses}
                options={{
                    headerShown: false,
                    tabBarIcon: tabInfo => (
                        <Icon
                            name="clipboard-list"
                            size={25}
                            color={tabInfo.color}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Report"
                component={Report}
                options={{
                    tabBarIcon: tabInfo => (
                        <Icon
                            name="chart-line"
                            size={25}
                            color={tabInfo.color}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Configurations"
                component={Config}
                options={{
                    headerShown: false,
                    tabBarIcon: tabInfo => (
                        <Icon name="cogs" size={25} color={tabInfo.color} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
};
