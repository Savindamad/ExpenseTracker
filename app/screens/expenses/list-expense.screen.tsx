import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";

import { Expense } from "../../types/expense.type";

export const ListExpense = () => {
    let [flatListItems, setFlatListItems] = useState<Expense[]>([]);
    useEffect(() => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction(async (txn) => {
            await txn.executeSql(
                `SELECT expense.name, expense.date_time, expense.amount, icon.name as icon FROM expense
                INNER JOIN expense_type on expense.type_id = expense_type.id
                INNER JOIN icon ON expense_type.icon_id = icon.id
                WHERE strftime('%Y',expense.date_time) = strftime('%Y',date('now')) AND  strftime('%m',expense.date_time) = strftime('%m',date('now'))`,
                [],
                (tx, res) => {
                    let expenses: Expense[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenses.push({ name: item.name, time: new Date(item.date_time), amount: item.amount, icon: item.icon })
                    }
                    setFlatListItems(expenses);
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }, []);
    return (
        <ScrollView >
            <View>
                {
                    flatListItems.map((l, i) => (
                        <ListItem key={i} bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                            <View style={styles.listView}>
                                <Icon style={styles.iconContent} name={l.icon} size={20} />
                                <ListItem.Content style={styles.descriptionContent} >
                                    <Text numberOfLines={1} style={[styles.paddingRight10, styles.f14]} >{l.name}</Text>
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