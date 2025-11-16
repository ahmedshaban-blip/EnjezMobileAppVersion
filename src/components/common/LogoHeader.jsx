// src/components/common/LogoHeader.jsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import logo from "../../../assets/logo 2.png";

export default function LogoHeader({ title = "Enjez", subtitle }) {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,        
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 4,
    marginRight: 12,         
  },
  title: {
    fontSize: 20,            
    fontWeight: "600",
    color: "#171717",        
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,            
    color: "#6b7280",        
  },
});
