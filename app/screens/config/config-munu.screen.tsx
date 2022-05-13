import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { common } from "../../styles/common.style";

export const ConfigMenu = ({ navigation }) => {
    return (
        <View>
            <ListItem containerStyle={[common.pv_10, common.ph_5]} key='1' bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <View style={[common.fd_r, common.m_0, common.p_0]}>
                    <View style={[styles.iconView, common.ai_c]}>
                        <Icon style={styles.iconContent} name='currency-usd' size={25} />
                    </View>
                    <ListItem.Content style={styles.descriptionContent} >
                        <Text numberOfLines={1} style={[common.pr_10, common.fs_m]} >Expenses types</Text>
                    </ListItem.Content>
                    <Pressable onPress={() => navigation.navigate("ExpenseTypes")}>
                        <Icon name="chevron-right" size={30} />
                    </Pressable>
                </View>
            </ListItem>
            <ListItem containerStyle={[common.pv_10, common.ph_5]} key='2' bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <View style={[common.fd_r, common.m_0, common.p_0]}>
                    <View style={[styles.iconView, common.ai_c]}>
                        <Icon style={styles.iconContent} name='cash-lock' size={25} />
                    </View>
                    <ListItem.Content style={styles.descriptionContent} >
                        <Text numberOfLines={1} style={[common.pr_10, common.fs_m]} >Fixed expences</Text>
                    </ListItem.Content>
                    <Pressable onPress={() => navigation.navigate("ExpenseTypes")}>
                        <Icon name="chevron-right" size={30} />
                    </Pressable>
                </View>
            </ListItem>
            <ListItem containerStyle={[common.pv_10, common.ph_5]} key='3' bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <View style={[common.fd_r, common.m_0, common.p_0]}>
                    <View style={[styles.iconView, common.ai_c]}>
                        <Icon style={styles.iconContent} name='hand-coin-outline' size={25} />
                    </View>
                    <ListItem.Content style={styles.descriptionContent} >
                        <Text numberOfLines={1} style={[common.pr_10, common.fs_m]} >Income</Text>
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
    iconView: {
        width: 40
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
    }
});