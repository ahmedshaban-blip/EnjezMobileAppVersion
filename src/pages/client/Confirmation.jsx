import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Card,
  IconButton,
  Icon,
  Button as PaperButton,
  Divider,
} from "react-native-paper";
import { getDocById } from "../../utils/firebaseHelpers.js";
import { useAuth } from "../../hooks/AuthContext.jsx";

const COLORS = {
  pageBg: "#f4f4ff",
  cardBg: "#ffffff",
  border: "#e5e7eb",
  textMuted: "#6b7280",
  primaryText: "#111827",
  primary: "#2563eb", // اللون الأزرق الرئيسي
  success: "#2563eb", // استخدمنا نفس اللون للأيقونة
};

export default function Confirmation({ navigation, route }) {
  const { bookingId } = route.params;
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingData = await getDocById("bookings", bookingId);
        if (!bookingData) throw new Error("Booking not found");
        setBooking(bookingData);

        const serviceData = await getDocById("services", bookingData.serviceId);
        setService(serviceData);

        const agentData = await getDocById("agents", bookingData.agentId);
        setAgent(agentData);
      } catch (err) {
        console.error(err);
      }
    };

    if (bookingId) fetchBookingDetails();
  }, [bookingId]);

  if (!booking)
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={[styles.title, { color: "red" }]}>
            Booking not found
          </Text>
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.topBar}>
          <IconButton
            icon="arrow-left"
            size={28}
            onPress={() => navigation.goBack()}
          />
          <Text variant="headlineSmall">Booking Confirmation</Text>
        </View>

        {/* Success Message */}
        <View style={styles.center}>
          <Icon
            source="check-circle"
            size={80}
            color={COLORS.success}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.subtitle}>
            We've received your request. {agent?.name || "The provider"} will
            confirm your booking soon.
          </Text>
        </View>

        {/* Booking Details */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            <Divider style={{ marginVertical: 8 }} />

            <BookingField label="Service" value={service?.name || "N/A"} />
            <BookingField
              label="Date & Time"
              value={`${booking.date} at ${booking.time}`}
            />
            <BookingField
              label="Provider"
              value={agent?.name || agent?.email || "Unknown Provider"}
            />
            <BookingField
              label="Reference ID"
              value={booking.referenceID || "N/A"}
            />
            <BookingField label="Address" value={booking.address} />
            <BookingField label="Phone" value={booking.phone} />
          </Card.Content>
        </Card>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <PaperButton
            mode="contained"
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onPress={() => {
              navigation.navigate("Home", {
                screen: "MyBookings",
                params: { userId: user?.uid },
              });
            }}
          >
            View My Bookings
          </PaperButton>

          <PaperButton
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            Return to Homepage
          </PaperButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BookingField({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primaryText,
    marginLeft: 8,
  },
  center: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryText,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  field: {
    marginVertical: 6,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primaryText,
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
});
