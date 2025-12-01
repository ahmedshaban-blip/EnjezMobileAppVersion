// src/components/client/RecommendationSection.jsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { getAllDocs, getUserBookings } from "../../utils/firebaseHelpers";
import ServiceCard from "../common/ServiceCard";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function RecommendationSection({ userId }) {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        if (!userId) {
            setRecommended([]);
            setLoading(false);
            return;
        }

        async function fetchRecommendations() {
            try {
                const [services, categories] = await Promise.all([
                    getAllDocs("services"),
                    getAllDocs("categories"),
                ]);

                const userBookings = await getUserBookings(userId);

                if (!userBookings.length) {
                    setRecommended([]);
                    return;
                }

                const freqMap = {};
                userBookings.forEach((b) => {
                    if (!b.serviceId) return;
                    freqMap[b.serviceId] = (freqMap[b.serviceId] || 0) + 1;
                });

                const sortedServiceIds = Object.entries(freqMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([id]) => id);

                const sortedServices = services
                    .filter((svc) => sortedServiceIds.includes(svc.id))
                    .sort(
                        (a, b) =>
                            sortedServiceIds.indexOf(a.id) - sortedServiceIds.indexOf(b.id)
                    );

                const servicesWithCategoryName = sortedServices.map((service) => {
                    const category = categories.find((c) => c.id === service.categoryId);

                    return {
                        ...service,
                        categoryName: category ? category.name : "Uncategorized",
                    };
                });

                // Get top 4
                const topServices = servicesWithCategoryName.slice(0, 4);

                setRecommended(topServices);
            } catch (err) {
                console.error("Error in fetchRecommendations:", err);
                setRecommended([]);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();
    }, [userId]);

    if (loading) return null;
    if (!recommended.length) return null;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["rgba(224, 242, 254, 0.5)", "rgba(239, 246, 255, 0.5)", "transparent"]}
                style={styles.background}
            />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <View style={styles.iconRow}>
                            <MaterialCommunityIcons name="sparkles" size={24} color="#06b6d4" />
                            <Text style={styles.title}>Picked Just for You</Text>
                        </View>
                        <Text style={styles.subtitle}>
                            Based on your recent bookings and preferences.
                        </Text>
                    </View>

                    <View style={styles.badge}>
                        <MaterialCommunityIcons name="heart" size={12} color="#2563eb" />
                        <Text style={styles.badgeText}>PERSONALIZED</Text>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {recommended.map((service) => (
                        <View key={service.id} style={styles.cardWrapper}>
                            <ServiceCard
                                service={service}
                                compact={true}
                                onPress={() => navigation.navigate("ServiceDetails", { id: service.id })}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#e0f2fe",
    },
    content: {
        padding: 24,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    titleContainer: {
        flex: 1,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "900",
        color: "#1d4ed8", // Blue-700 equivalent
    },
    subtitle: {
        fontSize: 14,
        color: "#475569",
        fontWeight: "500",
        paddingLeft: 4,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#2563eb",
        letterSpacing: 0.5,
    },
    scrollContent: {
        paddingRight: 24,
        gap: 16,
    },
    cardWrapper: {
        width: 280, // Fixed width for horizontal scrolling cards
    },
});
