import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Searchbar, Button as PaperButton } from "react-native-paper";

export default function HomeSearch({
    serviceQuery,
    setServiceQuery,
    handleSearch,
    colors,
}) {
    return (
        <Card mode="elevated" style={[styles.searchCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Card.Content>
                <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>What do you need?</Text>
                <Searchbar
                    placeholder="What service?"
                    value={serviceQuery}
                    onChangeText={setServiceQuery}
                    style={[styles.searchInput, { backgroundColor: colors.inputBg }]}
                    inputStyle={styles.searchInputInner}
                    iconColor={colors.textMuted}
                />
                <PaperButton
                    mode="contained"
                    onPress={handleSearch}
                    style={[styles.searchButton, { backgroundColor: colors.primary }]}
                    labelStyle={styles.searchButtonLabel}
                    contentStyle={{ paddingVertical: 6 }}
                >
                    Search services
                </PaperButton>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    searchCard: {
        borderRadius: 24,
        marginBottom: 20,
        borderWidth: 1,
    },
    sectionLabel: {
        fontSize: 13,
        marginBottom: 4,
    },
    searchInput: {
        marginTop: 8,
        borderRadius: 999,
        elevation: 0,
    },
    searchInputInner: {
        fontSize: 14,
    },
    searchButton: {
        marginTop: 12,
        borderRadius: 999,
    },
    searchButtonLabel: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
