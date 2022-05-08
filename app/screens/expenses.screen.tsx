import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ListItem } from 'react-native-elements';
import { ExpenseType } from "../types/expense-type.type";
import { Expense } from "../types/expense.type";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from "date-fns";

const expenseTypes: ExpenseType[] = [
    { name: "Glossary", isSystem: true, icon: "cart", limit: 100.0 },
    { name: "Restaurants and bars", isSystem: true, icon: "food-fork-drink", limit: 100.0 },
    { name: "Shopping", isSystem: true, icon: "shopping", limit: 150.0 }
];

const expenses: Expense[] = [
    {
        description: 'Amy Farha logn text  stample text more long',
        type: expenseTypes[0],
        time: new Date(),
        amount: 1000.14
    },
    {
        description: 'Amy Farha',
        type: expenseTypes[2],
        time: new Date(),
        amount: 12.23
    },
    {
        description: 'Amy Farha logn text  stample text more long',
        type: expenseTypes[0],
        time: new Date(),
        amount: 1000.14
    },
    {
        description: 'Amy Farha',
        type: expenseTypes[2],
        time: new Date(),
        amount: 12.23
    },
    {
        description: 'Amy Farha logn text  stample text more long',
        type: expenseTypes[0],
        time: new Date(),
        amount: 1000.14
    },
    {
        description: 'Amy Farha',
        type: expenseTypes[2],
        time: new Date(),
        amount: 12.23
    },
    {
        description: 'Amy Farha logn text  stample text more long',
        type: expenseTypes[0],
        time: new Date(),
        amount: 1000.14
    },
    {
        description: 'Amy Farha',
        type: expenseTypes[2],
        time: new Date(),
        amount: 12.23
    },
    {
        description: 'Amy Farha logn text  stample text more long',
        type: expenseTypes[0],
        time: new Date(),
        amount: 1000.14
    },
    {
        description: 'Amy Farha',
        type: expenseTypes[2],
        time: new Date(),
        amount: 12.23
    },
    {
        description: 'Amy Farha logn text  stample text more long',
        type: expenseTypes[0],
        time: new Date(),
        amount: 1000.14
    },
    {
        description: 'Amy Farha',
        type: expenseTypes[2],
        time: new Date(),
        amount: 12.23
    }
];

export const Expenses: React.FC = () => {
    return (
        <ScrollView >
            <View>
                {
                    expenses.map((l, i) => (
                        <ListItem key={i} bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                            <View style={styles.listView}>
                                <Icon style={styles.iconContent} name={l.type.icon} size={20} />
                                <ListItem.Content style={styles.descriptionContent} >
                                    <Text numberOfLines={1} style={[styles.paddingRight10, styles.f14]} >{l.description}</Text>
                                    <ListItem.Subtitle style={styles.f10}>{format(l.time, "d MMM yyyy 'at' hh:mm")}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Content style={styles.amountContent} >
                                    <ListItem.Title style={styles.f16}>€{l.amount}</ListItem.Title>
                                </ListItem.Content>
                            </View>
                        </ListItem>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row'
    },
    iconContent: {
        flex: 1
    },
    descriptionContent: {
        flex: 7
    },
    amountContent: {
        flex: 2,
        alignItems: 'flex-end'
    },
    paddingRight10: {
        paddingRight: 10
    },
    f16: {
        fontSize: 16
    },
    f14: {
        fontSize: 14
    },
    f10: {
        fontSize: 10
    }
});