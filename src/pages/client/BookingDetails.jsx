import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, Card, Text, Chip, Button, Divider } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getDocById } from "../../utils/firebaseHelpers";

export default function BookingDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const b = await getDocById("bookings", id);
      setBooking(b);

      if (b && b.serviceId) setService(await getDocById("services", b.serviceId));
      if (b && b.agentId) setAgent(await getDocById("agents", b.agentId));
    };
    load();
  }, [id]);

  if (!booking) return null;

  const statusColor = {
    pending: "#FACC15",
    confirmed: "#3B82F6",
    completed: "#22C55E",
    cancelled: "#EF4444",
  };

  const steps = [
    { label: "Request Received", active: true },
    { label: "Booking Confirmed", active: booking.status !== "pending" },
    { label: "Service In Progress", active: booking.status === "inProgress" || booking.status === "completed" },
    { label: "Completed", active: booking.status === "completed" },
  ];

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Booking Details" />
      </Appbar.Header>

      <ScrollView style={{ padding: 16 }}>
        
        {/* Title */}
        <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
          {service?.name || "Loading..."}
        </Text>

        <Chip
          style={{
            marginTop: 12,
            alignSelf: "flex-start",
            backgroundColor: statusColor[booking.status?.toLowerCase()] || "#ccc",
          }}
          textStyle={{ color: "white" }}
        >
          {booking.status}
        </Chip>

        {/* Booking Info Card */}
        <Card style={{ marginTop: 20 }}>
          <Card.Title title="Booking Details" />
          <Card.Content>
            <Text>Date: {booking.date}</Text>
            <Text>Time: {booking.time}</Text>
            <Text>Provider: {agent?.name || "N/A"}</Text>
            <Text>Location: {booking.address || "N/A"}</Text>
            <Text>Notes: {booking.notes || "No notes"}</Text>
          </Card.Content>
        </Card>

        {/* Progress Steps */}
        <Card style={{ marginTop: 20 }}>
          <Card.Title title="Booking Progress" />
          <Card.Content>
            {steps.map((s, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <Text style={{ color: s.active ? "#000" : "#999", fontWeight: s.active ? "bold" : "normal" }}>
                  {s.active ? "●" : "○"} {s.label}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <Button 
            mode="contained" 
            style={{ marginTop: 20 }}
            buttonColor="#3B82F6" 
        >
          Reschedule
        </Button>
        
        <Button 
            mode="outlined" 
            style={{ marginTop: 10, borderColor: "#3B82F6" }}
            textColor="#3B82F6" 
        >
          Cancel Request
        </Button>

      </ScrollView>
    </>
  );
}