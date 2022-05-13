import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";

import { Expense } from "../../types/expense.type";
import { common } from "../../styles/common.style";

export const ListExpense = ({ navigation }) => {
    let [flatListItems, setFlatListItems] = useState<Expense[]>([]);
    const [refreshing, setRefreshing] = useState(true);
    useEffect(() => {
        getExpenses()
    }, []);

    const getExpenses = () => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { console.log(s) }, (e) => { console.log(e) });

        database.transaction(async (txn) => {

            await txn.executeSql(
                `SELECT expense.id, expense.name, expense.date_time, expense.amount, expense.type_id, icon.name as icon FROM expense
                INNER JOIN expense_type on expense.type_id = expense_type.id
                INNER JOIN icon ON expense_type.icon_id = icon.id
                WHERE strftime('%Y',expense.date_time) = strftime('%Y',date('now')) AND  strftime('%m',expense.date_time) = strftime('%m',date('now'))
                ORDER BY date(expense.date_time) DESC`,
                [],
                (tx, res) => {
                    let expenses: Expense[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenses.push({ id: item.id, name: item.name, time: new Date(item.date_time), typeId: item.type_id, amount: item.amount, icon: item.icon })
                    }
                    setFlatListItems(expenses);
                    setRefreshing(false)
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    const editExpense = (expense: Expense) => {
        navigation.navigate('AddEditExpense', JSON.stringify(expense))
    }

    const deleteExpense = (id: number) => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction(async (txn) => {
            await txn.executeSql(
                `DELETE FROM expense WHERE id = ?`,
                [id],
                (tx, res) => {
                    console.log(res)
                    onRefresh();
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    const onRefresh = () => {
        getExpenses()
    };

    return (
        <ScrollView refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
        />} >
            <View>
                {
                    flatListItems.map((l, i) => (
                        <ListItem.Swipeable key={l.id} bottomDivider rightContent={
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    onPress={() => editExpense(l)}
                                    icon={<Icon name='pencil' size={30} />}
                                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'transparent' }}
                                />
                                <Button
                                    onPress={() => deleteExpense(l.id)}
                                    icon={<Icon style={{ color: 'white' }} name='delete' size={30} />}
                                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'red', borderRadius: 0 }}
                                />
                            </View>
                        } >
                            <View style={common.fd_r}>
                                <Icon style={common.f_1} name={l.icon} size={20} />
                                <ListItem.Content style={styles.descriptionContent} >
                                    <Text numberOfLines={1} style={[common.pr_10, common.fs_m]} >{l.name}</Text>
                                    <ListItem.Subtitle style={common.fs_s}>{format(l.time, "d MMM yyyy 'at' hh:mm")}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Content style={styles.amountContent} >
                                    <ListItem.Title style={common.fs_l}>€{l.amount}</ListItem.Title>
                                </ListItem.Content>
                            </View>
                        </ListItem.Swipeable>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    descriptionContent: {
        flex: 7
    },
    amountContent: {
        flex: 2,
        alignItems: 'flex-end'
    }

});