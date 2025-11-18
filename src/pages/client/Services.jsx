import React, { useState, useEffect } from "react";
import { View, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, Text, IconButton } from "react-native-paper";
import { getAllDocs, getDocsByField } from "../../utils/firebaseHelpers.js";
import { useLoading } from "../../context/LoadingContext.jsx";
import ServiceCard from "../../components/common/ServiceCard.jsx";
import { useNavigation } from "@react-navigation/native";

export default function ServicesPage() {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // after search + category
  const [visibleServices, setVisibleServices] = useState([]);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 6;
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    showLoading("Loading...");

    const services = await getAllDocs("services");
    const cats = await getAllDocs("categories");

    hideLoading();

    setAllServices(services);
    setFilteredServices(services);
    setVisibleServices(services.slice(0, ITEMS_PER_PAGE));
    setCategories(cats); // [{id,name}]
  };

  // ------------------------------------------
  // Instant Search (every keystroke)
  // ------------------------------------------
  useEffect(() => {
    applyFilters(search, activeCategory);
  }, [search, activeCategory]);

  const applyFilters = (searchText, categoryId) => {
    let filtered = allServices;

    // filter by category
    if (categoryId) {
      filtered = filtered.filter((s) => s.categoryId === categoryId);
    }

    // search filter
    if (searchText.trim()) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredServices(filtered);
    setVisibleServices(filtered.slice(0, ITEMS_PER_PAGE));
  };

  // ------------------------------------------
  // Pagination
  // ------------------------------------------
  const loadMore = () => {
    const next = visibleServices.length + ITEMS_PER_PAGE;
    setVisibleServices(filteredServices.slice(0, next));
  };

  // ------------------------------------------
  // Header UI
  // ------------------------------------------
  const renderHeader = () => (
    <View style={{ padding: 16, paddingTop: 50 }}>

      {/* Top Bar */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
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
        style={{ marginBottom: 15 }}
      />

      {/* Categories Row Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setActiveCategory(null)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: activeCategory ? "#ddd" : "#ca98e8ff",
            borderRadius: 20,
            marginRight: 10,
          }}>
          <Text style={{ color: activeCategory ? "#000" : "#fff" }}>All</Text>
        </TouchableOpacity>

        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setActiveCategory(cat.id)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: activeCategory === cat.id ? "#ca98e8ff" : "#ddd",
              borderRadius: 20,
              marginRight: 10,
            }}>
            <Text style={{ color: activeCategory === cat.id ? "#fff" : "#000" }}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={visibleServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onPress={() => navigation.navigate("ServiceDetails", { id: item.id })}
          />
        )}
        ListHeaderComponent={renderHeader}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
