import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";

export default function ProfileHeader({ profile }) {
    return (
        <View style={styles.header}>
            <Avatar.Text
                size={80}
                label={
                    profile.username ? profile.username.substring(0, 2).toUpperCase() : "U"
                }
                style={{ backgroundColor: "#2563eb" }}
            />
            <Text style={styles.username}>{profile.username || "User"}</Text>
            <Text style={styles.email}>{profile.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: 30,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        color: "#1e293b",
    },
    email: {
        fontSize: 16,
        color: "#64748b",
        marginTop: 5,
    },
});
