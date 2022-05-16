import React, { useEffect, useState } from 'react';
import {
    Animated,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';

import { Expense } from '../../types/expense.type';
import { common } from '../../styles/common.style';
import { ExpenseType } from '../../types/expense-type.type';
import { ExpenseSummary } from '../../types/expense-sumary.type';
import { ExpenseSummaryCal } from '../../calculations/expense-summary.calculation';
import { PickerData } from '../../types/picker-data.type';

export const ListExpense = ({ navigation }) => {
    const [flatListItems, setFlatListItems] = useState<Expense[]>([]);
    let [expenseTypesList, setExpenseTypesList] = useState<ExpenseType[]>([]);
    let [summaryList, setSummaryList] = useState<ExpenseSummary[]>([]);
    const [refreshing, setRefreshing] = useState(true);

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Summary' },
        { key: 'second', title: 'Expense List' },
    ]);

    useEffect(() => {
        getExpenseTypes();
    });

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
                    setExpenseTypesList(expenseTypes);
                    getExpenses();
                },
                error => {
                    console.log(error.message);
                },
            );
        });
    };

    const getExpenses = () => {
        const database = openDatabase(
            { name: 'expenses.db', createFromLocation: 1 },
            () => {},
            e => {
                console.log(e);
            },
        );
        database.transaction(async txn => {
            txn.executeSql(
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
                        expenses.push({
                            id: item.id,
                            name: item.name,
                            time: new Date(item.date_time),
                            typeId: item.type_id,
                            amount: item.amount,
                            icon: item.icon,
                        });
                    }
                    setFlatListItems(expenses);
                    summaryList = ExpenseSummaryCal(expenses, expenseTypesList);
                    setSummaryList(summaryList);
                    setRefreshing(false);
                },
                error => {
                    console.log(error.message);
                },
            );
        });
    };

    const editExpense = (expense: Expense) => {
        navigation.navigate('AddEditExpense', JSON.stringify(expense));
    };

    const deleteExpense = (id: number) => {
        const database = openDatabase(
            { name: 'expenses.db', createFromLocation: 1 },
            () => {},
            e => {
                console.log(e);
            },
        );
        database.transaction(async txn => {
            await txn.executeSql(
                'DELETE FROM expense WHERE id = ?',
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
        getExpenses();
    };

    const listExense = () => (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View>
                {flatListItems.map((l, i) => (
                    <ListItem.Swipeable
                        key={l.id}
                        bottomDivider
                        rightContent={
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    onPress={() => editExpense(l)}
                                    icon={<Icon name="pencil" size={30} />}
                                    buttonStyle={{
                                        minHeight: '100%',
                                        minWidth: '50%',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                                <Button
                                    onPress={() => deleteExpense(l.id)}
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
                        }
                    >
                        <View style={common.fd_r}>
                            <Icon style={common.f_1} name={l.icon} size={20} />
                            <ListItem.Content style={styles.descriptionContent}>
                                <Text
                                    numberOfLines={1}
                                    style={[common.pr_10, common.fs_m]}
                                >
                                    {l.name}
                                </Text>
                                <ListItem.Subtitle style={common.fs_s}>
                                    {format(l.time, "d MMM yyyy 'at' hh:mm")}
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

    const summaryItem = (key: number, summary: ExpenseSummary) => {
        return (
            <View key={key}>
                <View style={[common.fd_r, common.pv_10]}>
                    <View style={[{ flex: 2 }, common.ai_c]}>
                        <Progress.Circle
                            size={100}
                            progress={summary.percentage}
                            indeterminate={false}
                            showsText={true}
                            color={summary.chartColor}
                            formatText={() =>
                                (summary.percentage * 100).toFixed(1) + '%'
                            }
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={[common.fd_r, common.mb_5]}>
                            <Icon
                                style={common.mr_5}
                                name={summary.icon}
                                size={20}
                            />
                            <Text style={[common.fs_l, { fontWeight: 'bold' }]}>
                                {summary.name}
                            </Text>
                        </View>
                        <View style={[common.fd_r, common.mt_5]}>
                            <Text style={{ flex: 2 }}>Credit Limit</Text>
                            <Text style={{ flex: 1 }}>: ${summary.limit}</Text>
                        </View>
                        <View style={[common.fd_r, common.mt_5]}>
                            <Text style={{ flex: 2 }}>Spent amount</Text>
                            <Text style={{ flex: 1 }}>
                                : ${summary.spentAmount}
                            </Text>
                        </View>
                        <View style={[common.fd_r, common.mt_5]}>
                            <Text style={{ flex: 2 }}>Available amount</Text>
                            <Text style={{ flex: 1 }}>
                                : ${summary.availableOrOverdueAmount}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: 'silver',
                        borderBottomWidth: 1,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                />
            </View>
        );
    };

    const summary = () => (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={[common.f_1, common.pv_10, common.bc_white]}>
                {summaryList.map((l, i) => summaryItem(i, l))}
            </View>
        </ScrollView>
    );

    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(inputIndex =>
                            inputIndex === i ? 1 : 0.5,
                        ),
                    });
                    const borderBottomWidth = opacity === 1 ? 1 : 0;

                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.tabItem}
                            onPress={() => setIndex(i)}
                        >
                            <Animated.Text
                                style={{ opacity, borderBottomWidth }}
                            >
                                {route.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = SceneMap({
        first: summary,
        second: listExense,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
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
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        // paddingTop: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});
