import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextInput, IconButton } from "react-native-paper";
import RecommendationSection from "../../client/RecommendationSection";

export default function ServicesHeader({
    navigation,
    search,
    setSearch,
    user,
    categories,
    activeCategory,
    setActiveCategory,
}) {
    return (
        <View style={{ padding: 16, paddingTop: 50 }}>
            {/* Top Bar */}
            <View
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
            >
                <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
                <View>
                    <Text variant="headlineSmall">Enjez</Text>
                    <Text>Book trusted services</Text>
                </View>
            </View>

            <Text variant="headlineMedium" style={{ marginBottom: 12 }}>
                All Services
            </Text>

            {/* Instant Search */}
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search service..."
                style={{ marginBottom: 15, backgroundColor: "#edf1f8ff" }}
            />

            {/* Recommendation Section */}
            {user && <RecommendationSection userId={user.uid} />}

            {/* Categories Row Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => setActiveCategory(null)}
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        backgroundColor: activeCategory ? "#ddd" : "#2563eb",
                        borderRadius: 20,
                        marginRight: 10,
                    }}
                >
                    <Text style={{ color: activeCategory ? "#000" : "#fff" }}>All</Text>
                </TouchableOpacity>

                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        onPress={() => setActiveCategory(cat.id)}
                        style={{
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            backgroundColor: activeCategory === cat.id ? "#2563eb" : "#ddd",
                            borderRadius: 20,
                            marginRight: 10,
                        }}
                    >
                        <Text
                            style={{ color: activeCategory === cat.id ? "#fff" : "#000" }}
                        >
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
