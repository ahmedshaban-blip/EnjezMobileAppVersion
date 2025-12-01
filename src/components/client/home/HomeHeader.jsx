import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

export default function HomeHeader({ navigation, colors }) {
    return (
        <View style={styles.topBar}>
            <IconButton
                icon="menu"
                size={24}
                iconColor={colors.primaryText}
                onPress={() => navigation.openDrawer()}
            />
            <View style={styles.brand}>
                <Text style={[styles.brandTitle, { color: colors.primaryText }]}>Enjez</Text>
                <Text style={[styles.brandSubtitle, { color: colors.textMuted }]}>
                    Book trusted home services
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 12,
    },
    brand: {
        marginLeft: 4,
    },
    brandTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    brandSubtitle: {
        fontSize: 13,
    },
});
