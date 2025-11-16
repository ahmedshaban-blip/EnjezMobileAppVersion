// src/components/ui/Button.jsx
import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

export default function Button({
  children,
  type = "button", 
  className = "", 
  full = false,
  onClick,
  onPress,
  style,
  ...props
}) {
  const handlePress = onPress || onClick;

  return (
    <PaperButton
      mode="contained"
      onPress={handlePress}
      style={[styles.button, full && styles.fullWidth, style]}
      contentStyle={styles.content}
      labelStyle={styles.label}
      {...props}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12, // rounded-xl
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 4,
  },
  fullWidth: {
    alignSelf: "stretch", 
  },
  content: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 8,    // py-2
  },
  label: {
    fontSize: 14,          // text-sm
    fontWeight: "500",     // font-medium
  },
});
