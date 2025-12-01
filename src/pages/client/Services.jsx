import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getAllDocs, getPaginatedDocs } from "../../utils/firebaseHelpers.js";
import ServiceCard from "../../components/common/ServiceCard.jsx";
import ServicesHeader from "../../components/client/services/ServicesHeader.jsx";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { useNavigation } from "@react-navigation/native";

export default function ServicesPage({ route }) {
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
    if (route?.params?.searchQuery) {
      setSearch(route.params.searchQuery);
    }
  }, [route?.params?.searchQuery]);

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
          ListHeaderComponent={
            <ServicesHeader
              navigation={navigation}
              search={search}
              setSearch={setSearch}
              user={user}
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
