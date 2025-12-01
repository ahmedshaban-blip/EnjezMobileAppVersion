import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, Card, Text, Chip, Button, Divider, Portal, Dialog, Paragraph } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getDocById, deleteDocument } from "../../utils/firebaseHelpers";

export default function BookingDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [agent, setAgent] = useState(null);

  // Dialog states
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const b = await getDocById("bookings", id);
      setBooking(b);

      if (b && b.serviceId) setService(await getDocById("services", b.serviceId));
      if (b && b.agentId) setAgent(await getDocById("agents", b.agentId));
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    const success = await deleteDocument("bookings", id);
    setLoading(false);
    setConfirmVisible(false);

    if (success) {
      setSuccessVisible(true);
    }
  };

  const handleSuccessDismiss = () => {
    setSuccessVisible(false);
    navigation.goBack();
  };

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

        <Button
          mode="outlined"
          style={{ marginTop: 10, borderColor: "#3B82F6" }}
          textColor="#3B82F6"
          onPress={() => setConfirmVisible(true)}
        >
          Cancel Request
        </Button>

      </ScrollView>

      {/* Confirmation Dialog */}
      <Portal>
        <Dialog visible={confirmVisible} onDismiss={() => setConfirmVisible(false)}>
          <Dialog.Title>Cancel Booking</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to cancel this booking? This action cannot be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmVisible(false)}>No</Button>
            <Button onPress={handleDelete} loading={loading} disabled={loading}>Yes, Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Success Dialog */}
      <Portal>
        <Dialog visible={successVisible} onDismiss={handleSuccessDismiss}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Your booking has been cancelled successfully.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSuccessDismiss}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}