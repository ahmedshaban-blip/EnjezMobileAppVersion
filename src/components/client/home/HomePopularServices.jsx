import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Chip } from "react-native-paper";

export default function HomePopularServices({ navigation, popularServices, colors }) {
    return (
        <>
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>Popular services</Text>
            </View>

            <View style={styles.servicesList}>
                {popularServices.map((service) => (
                    <Card
                        key={service.id}
                        style={[styles.serviceCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                        mode="elevated"
                        onPress={() => navigation.navigate("ServiceDetails", { service })}
                    >
                        <Card.Content>
                            <View style={styles.serviceHeader}>
                                <Text style={[styles.serviceTitle, { color: colors.primaryText }]}>{service.name}</Text>
                                <Chip compact style={[styles.serviceBadge, { backgroundColor: colors.chipBg }]}>
                                    <Text style={[styles.serviceBadgeText, { color: colors.chipText }]}>Popular</Text>
                                </Chip>
                            </View>
                            <Text style={[styles.serviceSubtitle, { color: colors.textMuted }]} numberOfLines={2}>
                                {service.description}
                            </Text>
                            <Text style={[styles.servicePrice, { color: colors.accentGreen }]}>{service.price} EGP</Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>
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
    servicesList: {
        marginTop: 4,
        gap: 12,
    },
    serviceCard: {
        borderRadius: 22,
        marginBottom: 12,
        borderWidth: 1,
    },
    serviceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    serviceBadge: {
        borderRadius: 999,
    },
    serviceBadgeText: {
        fontSize: 11,
        fontWeight: "500",
    },
    serviceSubtitle: {
        fontSize: 13,
        marginBottom: 4,
    },
    servicePrice: {
        fontSize: 14,
        fontWeight: "600",
    },
});
