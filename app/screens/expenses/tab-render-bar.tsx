import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

export const TabRenderBar = props => {
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

                return (
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => this.setState({ index: i })}
                    >
                        <Animated.Text style={{ opacity }}>
                            {route.title}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 50,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});
