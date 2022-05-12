import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const ConfigMenu = ({ navigation }) => {
    return (
        <View>
            <ListItem containerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }} key='1' bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <View style={styles.listView}>
                    <View style={{ width: 40, alignItems: 'center' }}>
                        <Icon style={styles.iconContent} name='currency-usd' size={25} />
                    </View>
                    <ListItem.Content style={styles.descriptionContent} >
                        <Text numberOfLines={1} style={[styles.paddingRight10, styles.f14]} >Expenses types</Text>
                    </ListItem.Content>
                    <Pressable onPress={() => navigation.navigate("ExpenseTypes")}>
                        <Icon name="chevron-right" size={30} />
                    </Pressable>
                </View>
            </ListItem>
            <ListItem containerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }} key='2' bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <View style={styles.listView}>
                    <View style={{ width: 40, alignItems: 'center' }}>
                        <Icon style={styles.iconContent} name='cash-lock' size={25} />
                    </View>
                    <ListItem.Content style={styles.descriptionContent} >
                        <Text numberOfLines={1} style={[styles.paddingRight10, styles.f14]} >Fixed expences</Text>
                    </ListItem.Content>
                    <Pressable onPress={() => navigation.navigate("ExpenseTypes")}>
                        <Icon name="chevron-right" size={30} />
                    </Pressable>
                </View>
            </ListItem>
            <ListItem containerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }} key='3' bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <View style={styles.listView}>
                    <View style={{ width: 40, alignItems: 'center' }}>
                        <Icon style={styles.iconContent} name='hand-coin-outline' size={25} />
                    </View>
                    <ListItem.Content style={styles.descriptionContent} >
                        <Text numberOfLines={1} style={[styles.paddingRight10, styles.f14]} >Income</Text>
                    </ListItem.Content>
                    <Pressable onPress={() => navigation.navigate("ExpenseTypes")}>
                        <Icon name="chevron-right" size={30} />
                    </Pressable>
                </View>
            </ListItem>
        </View>
    );
}

const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row',
        margin: 0,
        padding: 0
    },
    iconContent: {
        marginVertical: 2
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