// src/pages/client/Home.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen (USER)</Text>
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
    fontSize: 24,
    fontWeight: "700",
  },
});
