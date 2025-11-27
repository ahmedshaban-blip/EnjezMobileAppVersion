import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Text,
  TextInput,
  Button as PaperButton,
  IconButton,
  Card,
  Portal,
  Modal,
  RadioButton,
} from "react-native-paper";

import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { WebView } from "react-native-webview";

import { getAllDocs, createBooking } from "../../utils/firebaseHelpers.js";
import { useAuth } from "../../hooks/AuthContext.jsx";

const COLORS = {
  pageBg: "#f4f4ff",
  cardBg: "#ffffff",
  border: "#e5e7eb",
  textMuted: "#6b7280",
  primaryText: "#111827",
  primary: "#2563eb",
};

const PAYPAL_CHECKOUT_URL =
  "https://ahmedshaban-blip.github.io/paypalPageForNativeApp/";

export default function Booking({ navigation, route }) {
  const { id: serviceId } = route.params;
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // DATE
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState();

  // TIME / PROVIDER
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [time, setTime] = useState("");

  // PAYPAL MODAL
  const [showPayPal, setShowPayPal] = useState(false);
  const amount = Number(service?.price || 10);

  useEffect(() => {
    const loadData = async () => {
      const services = await getAllDocs("services");
      const selected = services.find((s) => s.id === serviceId);
      setService(selected);

      const allAgents = await getAllDocs("agents");
      const relatedAgents = allAgents.filter((a) =>
        selected.agents?.includes(a.id)
      );
      setAgents(relatedAgents);
    };

    loadData();
  }, [serviceId]);

  const buildBookingObject = () => {
    if (!user?.uid) {
      throw new Error("Please login first");
    }

    if (!date || !time || !address || !phone || !selectedAgent) {
      throw new Error("Please fill all required fields");
    }

    return {
      userId: user.uid,
      serviceId,
      agentId: selectedAgent,
      date: date.toDateString(),
      time,
      address,
      phone,
      notes,
      status: "pending",
    };
  };

  const createBookingInFirestore = async (extra = {}) => {
    const booking = {
      ...buildBookingObject(),
      ...extra, // paymentMethod, paymentStatus, paypalDetails...
    };

    const id = await createBooking(booking);
    return id;
  };

  const handleSubmit = async () => {
    try {
      const id = await createBookingInFirestore({
        paymentMethod: "offline",
        paymentStatus: "pending",
      });

      navigation.navigate("Confirmation", { bookingId: id });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const onPaymentSuccess = async (details) => {
    try {
      const id = await createBookingInFirestore({
        paymentMethod: "paypal",
        paymentStatus: "paid",
        paypalDetails: details || null,
      });

      setShowPayPal(false);
      Alert.alert("Payment Successful", "Your booking has been confirmed");
      navigation.navigate("Confirmation", { bookingId: id });
    } catch (e) {
      console.log(e);
      setShowPayPal(false);
      Alert.alert(
        "Saved but…",
        "Payment was successful but booking could not be saved."
      );
    }
  };

  const onPaymentError = (message) => {
    setShowPayPal(false);
    Alert.alert("Payment Error", message || "Unknown error");
  };

  const handlePayPalMessage = (event) => {
    try {
      const data = JSON.parse(event?.nativeEvent?.data || "{}");

      if (data.status === "success") {
        onPaymentSuccess(data.details);
      } else if (data.status === "error") {
        onPaymentError(data.message);
      } else if (data.status === "cancel") {
        setShowPayPal(false);
        Alert.alert("Payment Cancelled", "You cancelled the payment.");
      }
    } catch (err) {
      console.log("Error parsing message:", err);
    }
  };

  const handleOpenPayPal = () => {
    try {
      buildBookingObject();
      setShowPayPal(true);
    } catch (err) {
      Alert.alert("Missing Data", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Modal PayPal */}
      <Portal>
        <Modal
          visible={showPayPal}
          onDismiss={() => setShowPayPal(false)}
          contentContainerStyle={{ flex: 1, backgroundColor: "#00000055" }}
        >
          <View
            style={{
              flex: 1,
              margin: 16,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
   <View
  style={{
    paddingHorizontal: 16, 
    paddingVertical: 14,    
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,   
    borderBottomColor: "#F0F0F0",
    elevation: 2,           
    shadowColor: "#000",    
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
    <Text style={{ 
        fontSize: 18, 
        fontWeight: "700", 
        color: "#1a1a1a" 
    }}>
      Pay with PayPal
    </Text>
  </View>

  <View style={{ backgroundColor: '#F3F4F6', borderRadius: 20 }}>
    <IconButton
      icon="close"
      size={20}
      color="#4B5563"
      onPress={() => setShowPayPal(false)}
      style={{ margin: 0 }} 
    />
  </View>
</View>

            {Platform.OS === "web" ? (
              <iframe
                width="100%"
                height="100%"
                src={PAYPAL_CHECKOUT_URL}
                title="PayPal Checkout"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <WebView
                style={{ flex: 1 }}
                source={{
                  uri: `${PAYPAL_CHECKOUT_URL}?amount=${encodeURIComponent(
                    amount
                  )}`,
                }}
                onMessage={handlePayPalMessage}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                thirdPartyCookiesEnabled
                sharedCookiesEnabled
              />
            )}
          </View>
        </Modal>
      </Portal>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <IconButton
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            size={26}
          />

          <Text variant="headlineSmall">Book {service?.name} Service</Text>
        </View>

        <Card mode="elevated" style={styles.formCard}>
          <Card.Content>
            {/* Provider */}
            <Text style={styles.label}>Provider</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setOpenTimePicker("provider")}
            >
              <Text>
                {selectedAgent
                  ? agents.find((a) => a.id === selectedAgent)?.name
                  : "Select provider"}
              </Text>
            </TouchableOpacity>

            <Portal>
              <Modal
                visible={openTimePicker === "provider"}
                onDismiss={() => setOpenTimePicker("")}
              >
                <Card style={styles.modalCard}>
                  <Card.Content>
                    <Text style={styles.modalTitle}>Select Provider</Text>

                    <RadioButton.Group
                      value={selectedAgent}
                      onValueChange={setSelectedAgent}
                    >
                      {agents.map((a) => (
                        <RadioButton.Item
                          key={a.id}
                          label={a.name}
                          value={a.id}
                        />
                      ))}
                    </RadioButton.Group>

                    <PaperButton
                      mode="contained"
                      style={styles.button}
                      onPress={() => setOpenTimePicker("")}
                    >
                      Done
                    </PaperButton>
                  </Card.Content>
                </Card>
              </Modal>
            </Portal>

            {/* Date */}
            <Text style={styles.label}>Requested Date</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setOpenDatePicker(true)}
            >
              <Text>{date ? date.toDateString() : "Pick a date"}</Text>
            </TouchableOpacity>

            <DatePickerModal
              locale="en"
              mode="single"
              visible={openDatePicker}
              onDismiss={() => setOpenDatePicker(false)}
              date={date}
              onConfirm={(params) => {
                setOpenDatePicker(false);
                setDate(params.date);
              }}
            />

            {/* Time */}
            <Text style={styles.label}>Requested Time</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setOpenTimePicker(true)}
            >
              <Text>{time || "Pick a time"}</Text>
            </TouchableOpacity>

            <TimePickerModal
              visible={openTimePicker === true}
              onDismiss={() => setOpenTimePicker(false)}
              onConfirm={({ hours, minutes }) => {
                setOpenTimePicker(false);

                const formatted =
                  (hours % 12 || 12) +
                  ":" +
                  (minutes < 10 ? "0" + minutes : minutes) +
                  (hours >= 12 ? " PM" : " AM");

                setTime(formatted);
              }}
            />

            {/* Address */}
            <TextInput
              mode="outlined"
              label="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />

            {/* Phone */}
            <TextInput
              mode="outlined"
              label="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />

            {/* Notes */}
            <TextInput
              mode="outlined"
              label="Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />

            {/* Confirm booking */}
            <PaperButton
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
            >
              Confirm booking
            </PaperButton>

            {/* PayPal */}
            <Text
              style={{
                textAlign: "center",
                marginTop: 12,
                color: COLORS.textMuted,
              }}
            >
              or pay online with
            </Text>

            <View style={{ marginTop: 8 }}>
              <PaperButton
                mode="outlined"
                style={[styles.button, { backgroundColor: "#fff" }]}
                textColor={COLORS.primary}
                onPress={handleOpenPayPal}
              >
                Pay with PayPal
              </PaperButton>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.pageBg },
  container: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },

  topBar: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  brandTitle: { fontSize: 20, fontWeight: "700" },
  brandSubtitle: { fontSize: 13, color: COLORS.textMuted },

  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },

  formCard: { paddingBottom: 12, borderRadius: 24 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: "400" },

  selector: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: { marginTop: 12, backgroundColor: "#fff" },
  inputOutline: { borderRadius: 18, borderColor: COLORS.border },

  button: {
    marginTop: 16,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },

  modalCard: { margin: 20, padding: 10, borderRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
});
