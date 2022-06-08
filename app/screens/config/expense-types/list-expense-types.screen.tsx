import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { common } from '../../../styles/common.style';
import { ExpenseType } from '../../../types/expense-type.type';

export const ListExpenseTypes = () => {
    let [flatListItems, setFlatListItems] = useState<ExpenseType[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getExpenseTypes();
    }, []);

    const getExpenseTypes = () => {
        const database = openDatabase(
            { name: 'expenses.db', createFromLocation: 1 },
            () => {},
            e => {
                console.log(e);
            },
        );
        database.transaction(txn => {
            txn.executeSql(
                `SELECT expense_type.id, expense_type.name, expense_type.cat_limit, expense_type.is_system, expense_type.description, icon.name As icon FROM expense_type
                INNER JOIN icon ON expense_type.icon_id = icon.id
                WHERE expense_type.type = 'PRIMARY';`,
                [],
                (tx, res) => {
                    let expenseTypes: ExpenseType[] = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        const item = res.rows.item(i);
                        expenseTypes.push({
                            id: item.id,
                            name: item.name,
                            isSystem: item.is_system,
                            limit: item.cat_limit,
                            icon: item.icon,
                        });
                    }
                    setFlatListItems(expenseTypes);
                    setRefreshing(false);
                },
                error => {
                    console.log(error.message);
                },
            );
        });
    };

    const editExpenseType = (type: ExpenseType) => {
        if (type.isSystem) {
            // todo
        } else {
            // todo
        }
    };

    const deleteExpenseType = (id: number) => {
        const database = openDatabase(
            { name: 'expenses.db', createFromLocation: 1 },
            s => {},
            e => {
                console.log(e);
            },
        );
        database.transaction(async txn => {
            await txn.executeSql(
                'DELETE FROM expense_type WHERE id = ?',
                [id],
                () => {
                    onRefresh();
                },
                error => {
                    console.log(error.message);
                },
            );
        });
    };

    const onRefresh = () => {
        getExpenseTypes();
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View>
                {flatListItems.map((l, i) => (
                    <ListItem.Swipeable
                        key={l.id}
                        bottomDivider
                        rightContent={
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    onPress={() => editExpenseType(l)}
                                    icon={<Icon name="pencil" size={30} />}
                                    buttonStyle={{
                                        minHeight: '100%',
                                        minWidth: '50%',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                                <Button
                                    onPress={() => deleteExpenseType(l.id)}
                                    disabled={l.isSystem}
                                    icon={
                                        <Icon
                                            style={{ color: 'white' }}
                                            name="delete"
                                            size={30}
                                        />
                                    }
                                    buttonStyle={{
                                        minHeight: '100%',
                                        minWidth: '50%',
                                        backgroundColor: 'red',
                                        borderRadius: 0,
                                    }}
                                />
                            </View>
                        }>
                        <View style={common.fd_r}>
                            <Icon
                                style={common.f_1}
                                name={l.icon ? l.icon : ''}
                                size={20}
                            />
                            <ListItem.Content style={styles.descriptionContent}>
                                <Text
                                    numberOfLines={1}
                                    style={[common.pr_10, common.fs_m]}>
                                    {l.name}
                                </Text>
                                <ListItem.Subtitle style={common.fs_es}>
                                    {l.description}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content style={styles.amountContent}>
                                <ListItem.Title style={common.fs_l}>
                                    €{l.limit}
                                </ListItem.Title>
                            </ListItem.Content>
                        </View>
                    </ListItem.Swipeable>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    descriptionContent: {
        flex: 7,
    },
    amountContent: {
        flex: 2,
        alignItems: 'flex-end',
    },
});
