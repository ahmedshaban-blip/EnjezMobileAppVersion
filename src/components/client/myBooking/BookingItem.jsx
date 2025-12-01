import React from "react";
import { Card, Text, Chip } from "react-native-paper";

const statusColor = {
    pending: "#FACC15",
    confirmed: "#3B82F6",
    completed: "#22C55E",
    cancelled: "#EF4444",
};

export default function BookingItem({ item, navigation }) {
    return (
        <Card
            style={{ marginVertical: 8, backgroundColor: "white" }}
            onPress={() => navigation.navigate("BookingDetails", { id: item.id })}
        >
            <Card.Title title={item.serviceName} subtitle={item.providerName} />

            <Card.Content>
                <Text style={{ color: "#555", marginBottom: 5 }}>
                    {item.date} at {item.time}
                </Text>

                <Chip
                    style={{
                        marginTop: 10,
                        alignSelf: "flex-start",
                        backgroundColor: statusColor[item.status?.toLowerCase()] || "#ccc",
                        borderRadius: 8,
                        height: 32,
                    }}
                    textStyle={{
                        color: "white",
                        fontSize: 12,
                        lineHeight: 18,
                        fontWeight: "bold",
                    }}
                >
                    {item.status || "Unknown"}
                </Chip>

                <Text style={{ marginTop: 12, fontWeight: "bold", fontSize: 16 }}>
                    ${item.price}
                </Text>
            </Card.Content>
        </Card>
    );
}
