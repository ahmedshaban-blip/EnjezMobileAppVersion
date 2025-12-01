import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, ActivityIndicator } from "react-native";
import { Text, IconButton, Button } from "react-native-paper";
import { getDocById } from "../../utils/firebaseHelpers.js";
import { useNavigation } from "@react-navigation/native";

export default function ServiceDetailsPage({ route }) {
  const { id } = route.params;
  const [service, setService] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDocById("services", id);
    setService(data);
  };

  if (!service) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingTop: 50 }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          size={26}
        />

        <View>
          <Text variant="headlineSmall">Service Details</Text>
          <Text style={{ opacity: 0.6 }}>Learn more about this service</Text>
        </View>
      </View>

      {/* Image */}
      <Image
        source={{
          uri:
            service.images?.[0] ||
            "https://via.placeholder.com/500x300?text=No+Image",
        }}
        style={{
          width: "100%",
          height: 240,
          borderRadius: 20,
          marginBottom: 20,
          backgroundColor: "#eee",
        }}
      />

      {/* Title */}
      <Text variant="headlineMedium" style={{ fontWeight: "600" }}>
        {service.name}
      </Text>

      {/* Description */}
      <Text
        variant="bodyLarge"
        style={{ marginTop: 12, lineHeight: 22, opacity: 0.8 }}
      >
        {service.description}
      </Text>

      {/* Price & Duration Box */}
      <View
        style={{
          marginTop: 25,
          padding: 16,
          borderRadius: 14,
          backgroundColor: "white",
          elevation: 4,
          shadowColor: "#000",
        }}
      >
        <Text variant="titleMedium" style={{ marginBottom: 6 }}>
          Price: <Text style={{ fontWeight: "bold" }}>{service.price} EGP</Text>
        </Text>

        <Text variant="titleMedium">
          Duration:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {service.durationValue} {service.durationUnit}
          </Text>
        </Text>
      </View>

      {/* Button */}
      <Button
        mode="contained"
        style={{
          marginTop: 30,
          paddingVertical: 6,
          borderRadius: 12,
          backgroundColor: "#2563eb", // blue-600
        }}
        labelStyle={{
          fontSize: 16,
          fontWeight: "700",
          color: "white",
        }}
        onPress={() => navigation.navigate("Booking", { id })}
      >
        Book This Service
      </Button>
    </ScrollView>
  );
}
