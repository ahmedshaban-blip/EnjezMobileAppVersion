// src/pages/client/Services.jsx
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card, Chip, IconButton } from "react-native-paper";

const COLORS = {
  pageBg: "#f4f4ff",
  cardBg: "#ffffff",
  border: "#e5e7eb",
  textMuted: "#6b7280",
  primaryText: "#111827",
};

const SERVICES = [
  {
    id: "home-cleaning",
    title: "Home cleaning",
    description: "Regular, deep and move-out cleaning.",
    badge: "Home",
  },
  {
    id: "ac-maintenance",
    title: "AC maintenance",
    description: "Inspection, cleaning and gas refill.",
    badge: "Maintenance",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description: "Leaks, clogs and bathroom fixes.",
    badge: "Maintenance",
  },
  {
    id: "tutoring",
    title: "Tutoring",
    description: "Math, science and language lessons.",
    badge: "Education",
  },
];

export default function Services({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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

        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>
          Browse the most requested services on Enjez.
        </Text>

        <View style={styles.list}>
          {SERVICES.map((service) => (
            <Card key={service.id} style={styles.card} mode="elevated">
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{service.title}</Text>
                  <Chip compact style={styles.cardBadge}>
                    <Text style={styles.cardBadgeText}>{service.badge}</Text>
                  </Chip>
                </View>
                <Text style={styles.cardDescription}>
                  {service.description}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
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
  title: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  list: {
    marginTop: 16,
    gap: 12,
  },
  card: {
    borderRadius: 22,
    marginBottom: 12,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primaryText,
  },
  cardBadge: {
    backgroundColor: "#f3f4ff",
    borderRadius: 999,
  },
  cardBadgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#312e81",
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
