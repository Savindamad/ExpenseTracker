import React, { useCallback, useEffect, useState } from 'react';
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
import { FixedExpense } from '../../../types/fixed-expense.type';
import { getFixedExpenses } from '../../../services/expense.service';

export const ListFixedExpense = () => {
    const [fixedExpenseList, setFixedExpenseList] = useState<FixedExpense[]>(
        [],
    );
    const [refreshing, setRefreshing] = useState(false);

    const loadDataCallback = useCallback(async () => {
        try {
            getExpenseTypes();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    const getExpenseTypes = async () => {
        const expenseTypes = await getFixedExpenses();
        setFixedExpenseList(expenseTypes);
        setRefreshing(false);
    };

    const editExpenseType = (type: FixedExpense) => {
        //todo
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
                `DELETE FROM expense_type WHERE id = ?`,
                [id],
                (tx, res) => {
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
                {fixedExpenseList.map((l, i) => (
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
                                    style={[common.pr_10, common.fs_m]}
                                    numberOfLines={1}>
                                    {l.name}
                                </Text>
                                <ListItem.Subtitle style={common.fs_es}>
                                    {l.name}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content style={styles.amountContent}>
                                <ListItem.Title style={common.fs_l}>
                                    €{l.amount}
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
