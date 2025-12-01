// src/pages/client/Home.jsx
import React, { useState, useEffect } from "react";
import { getAllDocs, getPaginatedDocs } from "../../utils/firebaseHelpers";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/client/home/HomeHeader";
import HomeHero from "../../components/client/home/HomeHero";
import HomeSearch from "../../components/client/home/HomeSearch";
import HomeCategories from "../../components/client/home/HomeCategories";
import HomePopularServices from "../../components/client/home/HomePopularServices";

const COLORS = {
  pageBg: "#f4f4ff",
  heroBg: "#020617",
  heroChipBg: "#020617",
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
  const [categories, setCategories] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, servicesData] = await Promise.all([
          getAllDocs("categories"),
          getPaginatedDocs("services", 5)
        ]);

        setCategories(categoriesData);
        setPopularServices(servicesData.docs);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    navigation.navigate("Services", { searchQuery: serviceQuery });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader navigation={navigation} colors={COLORS} />
        <HomeHero colors={COLORS} />
        <HomeSearch
          serviceQuery={serviceQuery}
          setServiceQuery={setServiceQuery}
          handleSearch={handleSearch}
          colors={COLORS}
        />
        <HomeCategories
          navigation={navigation}
          categories={categories}
          colors={COLORS}
        />
        <HomePopularServices
          navigation={navigation}
          popularServices={popularServices}
          colors={COLORS}
        />
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
});
