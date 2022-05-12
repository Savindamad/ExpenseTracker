import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { ExpenseType } from "../../../types/expense-type.type";
import { openDatabase } from 'react-native-sqlite-storage';
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const ListExpenseTypes = ({ navigation }) => {
    let [flatListItems, setFlatListItems] = useState<ExpenseType[]>([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        getExpenseTypes()
    }, []);

    const getExpenseTypes = () => {
        const database = openDatabase({ name: "expenses.db", createFromLocation: 1 }, (s) => { }, (e) => { console.log(e) });
        database.transaction(async (txn) => {
            await txn.executeSql(
                `SELECT expense_type.id, expense_type.name, expense_type.cat_limit, expense_type.is_system, expense_type.description, icon.name As icon FROM expense_type
                INNER JOIN icon ON expense_type.icon_id = icon.id;`,
                [],
                (tx, res) => {
                    let expenseTypes: ExpenseType[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenseTypes.push({ id: item.id, name: item.name, isSystem: item.is_system, limit: item.cat_limit, icon: item.icon })
                    }
                    setFlatListItems(expenseTypes);
                    setRefreshing(false)
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
                        <ListItem key={i} bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                            <View style={styles.listView}>
                                <Icon style={styles.iconContent} name={l.icon? l.icon: ''} size={20} />
                                <ListItem.Content style={styles.descriptionContent} >
                                    <Text numberOfLines={1} style={[styles.paddingRight10, styles.f14]} >{l.name}</Text>
                                    <ListItem.Subtitle style={styles.f10}>{l.description}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Content style={styles.amountContent} >
                                    <ListItem.Title style={styles.f16}>€{l.limit}</ListItem.Title>
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