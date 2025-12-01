import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { Appbar, Searchbar, Chip, Button } from "react-native-paper";
import { getDocsByField, getAllDocs } from "../../utils/firebaseHelpers";
import { useAuth } from "../../hooks/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import BookingItem from "../../components/client/myBooking/BookingItem";

export default function MyBookings({ navigation }) {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // pagination
  const [visibleCount, setVisibleCount] = useState(5);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      const load = async () => {
        const userBookings = await getDocsByField("bookings", "userId", user.uid);
        const services = await getAllDocs("services");
        const agents = await getAllDocs("agents");

        const enriched = userBookings.map((b) => {
          const service = services.find((s) => s.id === b.serviceId);
          const agent = agents.find((a) => a.id === b.agentId);

          return {
            ...b,
            serviceName: service?.name || "Unknown Service",
            providerName: agent?.name || "Unknown Provider",
            price: service?.price || "N/A",
          };
        });

        setBookings(enriched);
      };

      load();
    }, [user])
  );

  // --- SEARCH LOGIC ---
  const filtered = bookings.filter((b) => {
    // 1. Prepare search term (safe lower case)
    const searchTerm = search ? search.toLowerCase() : "";

    // 2. Prepare fields to search in (check for existence first)
    const serviceName = b.serviceName ? b.serviceName.toLowerCase() : "";
    const providerName = b.providerName ? b.providerName.toLowerCase() : "";

    // 3. Check if search term is included in either field
    const matchSearch =
      serviceName.includes(searchTerm) ||
      providerName.includes(searchTerm);

    // 4. Filter by Status
    const status = b.status ? b.status.toLowerCase() : "";
    const matchFilter =
      filter === "All" || status === filter.toLowerCase();

    return matchSearch && matchFilter;
  });

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <>
      {/* Top App Bar */}
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Bookings" />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate("Services")}
        />
      </Appbar.Header>

      <View style={{ padding: 16, flex: 1, backgroundColor: "#F8F9FA" }}>
        {/* Search */}
        <Searchbar
          placeholder="Search by service or provider"
          value={search}
          onChangeText={setSearch}
          style={{
            marginBottom: 12,
            backgroundColor: "#edeef0ee",
            borderRadius: 10,
            elevation: 0
          }}
          placeholderTextColor="#666"
          iconColor="#666"
        />

        {/* Filter Chips */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {["All", "Pending", "Confirmed", "Completed"].map(
            (s) => {
              const isSelected = filter === s;
              return (
                <Chip
                  key={s}
                  selected={isSelected}
                  onPress={() => setFilter(s)}
                  style={{
                    marginBottom: 8,
                    backgroundColor: isSelected ? "#3B82F6" : "#edeef0ee",
                    borderColor: "transparent"
                  }}
                  textStyle={{
                    color: isSelected ? "white" : "#333",
                    fontWeight: isSelected ? "bold" : "normal"
                  }}
                  showSelectedOverlay={true}
                >
                  {s}
                </Chip>
              );
            }
          )}
        </View>

        {/* Bookings List */}
        <FlatList
          data={filtered.slice(0, visibleCount)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <BookingItem item={item} navigation={navigation} />
          )}
        />

        {visibleCount < filtered.length && (
          <Button
            mode="contained"
            onPress={loadMore}
            style={{ marginVertical: 16 }}
            buttonColor="#3B82F6"
          >
            Load More
          </Button>
        )}
      </View>
    </>
  );
}