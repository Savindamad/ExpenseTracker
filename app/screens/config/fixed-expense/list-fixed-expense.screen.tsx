import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { common } from "../../../styles/common.style";
import { FixedExpense } from "../../../types/fixed-expense.type";

export const ListFixedExpense = () => {
    let [flatListItems, setFlatListItems] = useState<FixedExpense[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getExpenseTypes()
    }, []);

    const getExpenseTypes = () => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction(async (txn) => {
            await txn.executeSql(
                `SELECT EF.id, EF.name, EF.type_id, EF.date_time, EF.amount, EF.start_date, EF.end_date, I.name 
                FROM expense_fixed EF
                INNER JOIN expense_type ET ON EF.type_id = ET.id
                INNER JOIN icon I on ET.icon_id = I.id;`,
                [],
                (tx, res) => {
                    let expenseTypes: FixedExpense[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenseTypes.push({
                            id: item.id, name: item.name, createdTime: new Date(), amount: item.amount,
                            typeId: item.type_id, icon: item.icon, startedDate: new Date(), endDate: new Date()
                        })
                    }
                    setFlatListItems(expenseTypes);
                    setRefreshing(false)
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    const editExpenseType = (type: FixedExpense) => {
        //todo
    }


    const deleteExpenseType = (id: number) => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction(async (txn) => {
            await txn.executeSql(
                `DELETE FROM expense_type WHERE id = ?`,
                [id],
                (tx, res) => {
                    onRefresh();
                }, error => {
                    console.log(error.message);
                }
            );
        });
    }

    const onRefresh = () => {
        getExpenseTypes()
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
                                    onPress={() => editExpenseType(l)}
                                    icon={<Icon name='pencil' size={30} />}
                                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'transparent' }}
                                />
                                <Button
                                    onPress={() => deleteExpenseType(l.id)}
                                    icon={<Icon style={{ color: 'white' }} name='delete' size={30} />}
                                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'red', borderRadius: 0 }}
                                />
                            </View>
                        }>
                            <View style={common.fd_r}>
                                <Icon style={common.f_1} name={l.icon ? l.icon : ''} size={20} />
                                <ListItem.Content style={styles.descriptionContent} >
                                    <Text numberOfLines={1} style={[common.pr_10, common.fs_m]} >{l.name}</Text>
                                    <ListItem.Subtitle style={common.fs_es}>{l.name}</ListItem.Subtitle>
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