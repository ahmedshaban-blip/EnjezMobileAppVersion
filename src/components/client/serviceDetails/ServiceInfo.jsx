import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

export default function ServiceInfo({ service, navigation }) {
    return (
        <>
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
                onPress={() => navigation.navigate("Booking", { id: service.id })}
            >
                Book This Service
            </Button>
        </>
    );
}
