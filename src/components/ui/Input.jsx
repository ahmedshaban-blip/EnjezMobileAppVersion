// src/components/ui/Input.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, Text } from "react-native-paper";

export default function Input({
  id,              // مش مستخدم في RN بس سايبه للتوافق مع الكود القديم
  label,
  type = "text",   // مش مهم في RN، بس ممكن تستخدمه برا عشان تحدد secureTextEntry مثلاً
  placeholder = "",
  className = "",  // مش هنستخدمه، بس مخليينه في الـ signature
  required = false, // مش مستخدم مباشرة هنا
  style,
  ...props         // هنا هيجي value, onChangeText, keyboardType, secureTextEntry, إلخ
}) {
  return (
    <View style={styles.container}>
      <PaperTextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        style={[styles.input, style]}
        {...props}
      />
      {required ? (
        <Text style={styles.requiredHint}>* مطلوب</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  requiredHint: {
    marginTop: 4,
    fontSize: 11,
    color: "#9ca3af",
  },
});
