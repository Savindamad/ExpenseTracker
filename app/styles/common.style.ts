import { StyleSheet } from "react-native";
import { theme } from "./theme.style";

export const common = StyleSheet.create({
    m_0: {
        margin: 0
    },
    m_10: {
        margin: 10
    },
    mh_10: {
        marginHorizontal: 10
    },
    mv_10: {
        marginVertical: 10
    },
    mt_10: {
        marginTop: 10
    },
    mt_5: {
        marginTop: 5
    },
    mb_5: {
        marginBottom: 5
    },
    mr_5: {
        marginRight: 5
    },
    p_0: {
        padding: 0
    },
    p_10: {
        padding: 10
    },
    ph_5: {
        paddingHorizontal: 5
    },
    ph_10: {
        paddingHorizontal: 10
    },
    pr_10: {
        paddingRight: 10
    },
    pv_7: {
        paddingVertical: 7
    },
    pv_10: {
        paddingVertical: 10
    },
    fs_es: {
        fontSize: theme.FONT_SIZE_EX_SMALL
    },
    fs_s: {
        fontSize: theme.FONT_SIZE_SMALL
    },
    fs_m: {
        fontSize: theme.FONT_SIZE_MEDIUM
    },
    fs_l: {
        fontSize: theme.FONT_SIZE_LARGE
    },
    fd_r: {
        flexDirection: 'row'
    },
    fd_c: {
        flexDirection: 'column'
    },
    f_1: {
        flex: 1
    },
    ai_c: {
        alignItems: 'center'
    },
    c_red: {
        color: theme.COLOR_RED
    },
    c_white: {
        color: theme.COLOR_WHITE
    },
    bc_red: {
        backgroundColor: theme.COLOR_RED
    },
    bc_white: {
        backgroundColor: theme.COLOR_WHITE
    },
    label: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: theme.FONT_SIZE_LARGE
    },
    input: {
        backgroundColor: theme.COLOR_WHITE,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'grey',
        fontSize: theme.FONT_SIZE_MEDIUM,
    },
});