import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Chip } from "react-native-paper";

export default function HomeHero({ colors }) {
    return (
        <Card mode="contained" style={[styles.heroCard, { backgroundColor: colors.heroBg }]}>
            <Card.Content>
                <Text style={styles.heroEyebrow}>WELCOME</Text>
                <Text style={[styles.heroTitle, { color: colors.textLight }]}>
                    Find the right service in a few taps.
                </Text>
                <Text style={styles.heroSubtitle}>
                    Cleaning, maintenance, tutoring and more — all in one place.
                </Text>

                <View style={styles.heroBadgesRow}>
                    <Chip
                        compact
                        style={[styles.heroChip, { backgroundColor: colors.heroChipBg }]}
                        textStyle={styles.heroChipText}
                    >
                        Verified providers
                    </Chip>
                    <Chip
                        compact
                        style={[styles.heroChip, { backgroundColor: colors.heroChipBg }]}
                        textStyle={styles.heroChipText}
                    >
                        Secure payments
                    </Chip>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    heroCard: {
        borderRadius: 22,
        marginBottom: 16,
    },
    heroEyebrow: {
        fontSize: 12,
        letterSpacing: 1,
        color: "#a5b4fc",
        marginBottom: 4,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    heroSubtitle: {
        fontSize: 14,
        color: "#e5e7eb",
        marginBottom: 12,
    },
    heroBadgesRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    heroChip: {
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#02091e",
    },
    heroChipText: {
        color: "#e5e7eb",
        fontSize: 12,
    },
});
