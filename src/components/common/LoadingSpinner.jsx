// src/components/common/LoadingSpinner.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const indicatorSize = size === "sm" ? "small" : "large";

  return (
    <View style={styles.container}>
      <ActivityIndicator size={indicatorSize} />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7, 
  },
});
