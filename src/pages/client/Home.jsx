// src/pages/client/Home.jsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Searchbar,
  Card,
  Chip,
  Button as PaperButton,
  IconButton,
} from "react-native-paper";

const COLORS = {
  pageBg: "#f4f4ff",      // خلفية فاتحة زي الويب
  heroBg: "#020617",      // نفس لون الهيرو في الصورة
  heroChipBg: "#020617",  // نفس لون الكارت عشان يبان كأنه جزء منه
  cardBg: "#ffffff",
  inputBg: "#f9fafb",
  border: "#e5e7eb",
  chipBg: "#f3f4ff",
  chipText: "#111827",
  textMuted: "#6b7280",
  textLight: "#f9fafb",
  primaryText: "#111827",
  primary: "#2563eb",
  accentGreen: "#22c55e",
};

export default function Home({ navigation }) {
  const [serviceQuery, setServiceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const categories = [
    { id: "cleaning", label: "Home Cleaning" },
    { id: "maintenance", label: "Maintenance" },
    { id: "tutoring", label: "Tutoring" },
    { id: "moving", label: "Moving" },
  ];

  const popularServices = [
    {
      id: "deep-clean",
      title: "Deep home cleaning",
      subtitle: "Kitchen, bathroom and more",
      price: "From 350 EGP",
      badge: "Popular",
    },
    {
      id: "ac-fix",
      title: "AC maintenance",
      subtitle: "Inspection & gas refill",
      price: "From 250 EGP",
      badge: "Trending",
    },
    {
      id: "math-tutor",
      title: "Math tutoring",
      subtitle: "1:1 online / in-person",
      price: "From 200 EGP / hr",
      badge: "New",
    },
  ];

  const handleSearch = () => {
    navigation.navigate("Services");
  };

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

        {/* HERO SECTION (نفس اللي في الصورة) */}
        <Card mode="contained" style={styles.heroCard}>
          <Card.Content>
            <Text style={styles.heroEyebrow}>WELCOME</Text>
            <Text style={styles.heroTitle}>
              Find the right service in a few taps.
            </Text>
            <Text style={styles.heroSubtitle}>
              Cleaning, maintenance, tutoring and more — all in one place.
            </Text>

            <View style={styles.heroBadgesRow}>
              <Chip compact style={styles.heroChip} textStyle={styles.heroChipText}>
                Verified providers
              </Chip>
              <Chip compact style={styles.heroChip} textStyle={styles.heroChipText}>
                Secure payments
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Search section – كارت أبيض زي Booking */}
        <Card mode="elevated" style={styles.searchCard}>
          <Card.Content>
            <Text style={styles.sectionLabel}>What do you need?</Text>
            <Searchbar
              placeholder="What service?"
              value={serviceQuery}
              onChangeText={setServiceQuery}
              style={styles.searchInput}
              inputStyle={styles.searchInputInner}
              iconColor={COLORS.textMuted}
            />
            <Searchbar
              placeholder="Location"
              value={locationQuery}
              onChangeText={setLocationQuery}
              style={styles.searchInput}
              inputStyle={styles.searchInputInner}
              icon="map-marker-outline"
              iconColor={COLORS.textMuted}
            />
            <PaperButton
              mode="contained"
              onPress={handleSearch}
              style={styles.searchButton}
              labelStyle={styles.searchButtonLabel}
              contentStyle={{ paddingVertical: 6 }}
            >
              Search services
            </PaperButton>
          </Card.Content>
        </Card>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Services")}>
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => (
            <Card key={cat.id} style={styles.categoryCard} mode="elevated">
              <Card.Content>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        {/* Popular services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular services</Text>
        </View>

        <View style={styles.servicesList}>
          {popularServices.map((service) => (
            <Card key={service.id} style={styles.serviceCard} mode="elevated">
              <Card.Content>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Chip compact style={styles.serviceBadge}>
                    <Text style={styles.serviceBadgeText}>{service.badge}</Text>
                  </Chip>
                </View>
                <Text style={styles.serviceSubtitle}>
                  {service.subtitle}
                </Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
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

  /* HERO STYLES */
  heroCard: {
    borderRadius: 22,
    backgroundColor: COLORS.heroBg,
    marginBottom: 16,
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a5b4fc",       // أزرق فاتح زي الويب
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textLight,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#e5e7eb",
    marginBottom: 12,
  },
  heroBadgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  heroChip: {
    backgroundColor: COLORS.heroChipBg, // نفس لون الخلفية
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#02091e",             // فرق بسيط جداً زي الصوره
  },
  heroChipText: {
    color: "#e5e7eb",
    fontSize: 12,
  },

  /* باقي الصفحة */
  searchCard: {
    borderRadius: 24,
    backgroundColor: COLORS.cardBg,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  searchInput: {
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: COLORS.inputBg,
    elevation: 0,
  },
  searchInputInner: {
    fontSize: 14,
  },
  searchButton: {
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  searchButtonLabel: {
    color: "#ffffff",
    fontWeight: "600",
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primaryText,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: "500",
    color: "#2563eb",
  },
  categoriesRow: {
    paddingVertical: 4,
    paddingRight: 8,
    gap: 12,
  },
  categoryCard: {
    borderRadius: 999,
    minWidth: 130,
    marginRight: 8,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primaryText,
    textAlign: "center",
  },
  servicesList: {
    marginTop: 4,
    gap: 12,
  },
  serviceCard: {
    borderRadius: 22,
    marginBottom: 12,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primaryText,
  },
  serviceBadge: {
    backgroundColor: COLORS.chipBg,
    borderRadius: 999,
  },
  serviceBadgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.chipText,
  },
  serviceSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.accentGreen,
  },
});
