// src/pages/client/Confirmation.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Button as PaperButton,
  Icon,
  IconButton,
} from "react-native-paper";

const COLORS = {
  pageBg: "#f4f4ff",
  textMuted: "#6b7280",
  primaryText: "#111827",
  accentGreen: "#22c55e",
};

export default function Confirmation({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <IconButton
            icon="menu"
            size={24}
            iconColor={COLORS.primaryText}
            onPress={() => navigation.openDrawer()}
          />
          <View style={styles.brand}>
            <Text style={styles.brandTitle}>Enjez</Text>
            <Text style={styles.brandSubtitle}>
              Book trusted home services
            </Text>
          </View>
        </View>

        <View style={styles.center}>
          <Icon source="check-circle" size={64} color={COLORS.accentGreen} />
          <Text style={styles.title}>Booking confirmed</Text>
          <Text style={styles.subtitle}>
            Your booking has been submitted successfully. Later you can show
            full booking details here like the web confirmation page.
          </Text>

          <PaperButton
            mode="contained"
            onPress={() => navigation.navigate("UserHome")}
            style={styles.button}
            contentStyle={{ paddingVertical: 6 }}
          >
            Back to home
          </PaperButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  brand: {
    marginLeft: 4,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  brandSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primaryText,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
    alignSelf: "stretch",
  },
});
