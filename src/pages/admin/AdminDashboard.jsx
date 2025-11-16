// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617", // bg-slate-900
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 24, // text-2xl
    fontWeight: "700", // font-bold
  },
});
