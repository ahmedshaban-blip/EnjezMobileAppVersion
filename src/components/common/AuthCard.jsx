// src/components/common/AuthCard.jsx
import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export default function AuthCard({ children }) {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 360,     
    alignSelf: "center",
    borderRadius: 16, 
  },
});
