import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, Text, IconButton } from "react-native-paper";
import { getAllDocs, getPaginatedDocs } from "../../utils/firebaseHelpers.js";
import { useLoading } from "../../context/LoadingContext.jsx";
import ServiceCard from "../../components/common/ServiceCard.jsx";
import RecommendationSection from "../../components/client/RecommendationSection.jsx";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { useNavigation } from "@react-navigation/native";

export default function ServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination state
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state

  const ITEMS_PER_PAGE = 6;
  const navigation = useNavigation();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      handleSearch();
    } else {
      loadServices(true);
    }
  }, [activeCategory, search]);

  const loadCategories = async () => {
    const cats = await getAllDocs("categories");
    setCategories(cats);
  };

  const loadServices = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setHasMore(true);
      setLastDoc(null);
    } else {
      if (!hasMore || loadingMore) return;
      setLoadingMore(true);
    }

    try {
      const conditions = [];
      if (activeCategory) {
        conditions.push({ field: "categoryId", value: activeCategory });
      }

      const currentLastDoc = reset ? null : lastDoc;
      const { docs, lastVisible } = await getPaginatedDocs(
        "services",
        ITEMS_PER_PAGE,
        currentLastDoc,
        conditions
      );

      if (reset) {
        setServices(docs);
        setLoading(false);
      } else {
        setServices((prev) => {
          const newDocs = docs.filter(
            (newDoc) => !prev.some((prevDoc) => prevDoc.id === newDoc.id)
          );
          return [...prev, ...newDocs];
        });
        setLoadingMore(false);
      }

      setLastDoc(lastVisible);
      if (docs.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      if (reset) setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    try {
      const all = await getAllDocs("services");
      let filtered = all;

      if (activeCategory) {
        filtered = filtered.filter((s) => s.categoryId === activeCategory);
      }

      if (search.trim()) {
        filtered = filtered.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setServices(filtered);
      setHasMore(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!search.trim()) {
      loadServices(false);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#2563eb" />
      </View>
    );
  };

  // ------------------------------------------
  // Header UI
  // ------------------------------------------
  const renderHeader = () => (
    <View style={{ padding: 16, paddingTop: 50 }}>
      {/* Top Bar */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        <View>
          <Text variant="headlineSmall">Enjez</Text>
          <Text>Book trusted services</Text>
        </View>
      </View>

      <Text variant="headlineMedium" style={{ marginBottom: 12 }}>
        All Services
      </Text>

      {/* Instant Search */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search service..."
        style={{ marginBottom: 15, backgroundColor: "#edf1f8ff" }}
      />

      {/* Recommendation Section */}
      {user && <RecommendationSection userId={user.uid} />}

      {/* Categories Row Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setActiveCategory(null)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: activeCategory ? "#ddd" : "#2563eb",
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ color: activeCategory ? "#000" : "#fff" }}>All</Text>
        </TouchableOpacity>

        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setActiveCategory(cat.id)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: activeCategory === cat.id ? "#2563eb" : "#ddd",
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Text
              style={{ color: activeCategory === cat.id ? "#fff" : "#000" }}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && !services.length ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ServiceCard
              service={item}
              onPress={() =>
                navigation.navigate("ServiceDetails", { id: item.id })
              }
            />
          )}
          ListHeaderComponent={renderHeader}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
