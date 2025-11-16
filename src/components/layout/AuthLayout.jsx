// src/components/layout/AuthLayout.jsx
import React from "react";
import { View, StyleSheet } from "react-native";

export default function AuthLayout({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f9f9fb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16, 
  },
});
