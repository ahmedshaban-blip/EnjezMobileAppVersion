import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function HomeCategories({ navigation, categories, colors }) {
    return (
        <>
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>Popular categories</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Services")}>
                    <Text style={styles.sectionLink}>See all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesRow}
            >
                {categories.map((cat) => (
                    <Card key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]} mode="elevated">
                        <Card.Content>
                            <Text style={[styles.categoryLabel, { color: colors.primaryText }]}>{cat.name}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 4,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    sectionLink: {
        fontSize: 13,
        fontWeight: "500",
        color: "#2563eb",
    },
    categoriesRow: {
        paddingVertical: 4,
        paddingRight: 8,
        gap: 12,
    },
    categoryCard: {
        borderRadius: 999,
        minWidth: 130,
        marginRight: 8,
        borderWidth: 1,
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
});
