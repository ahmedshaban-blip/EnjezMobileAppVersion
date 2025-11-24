import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
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

export default function Booking({ navigation, route }) {
  const { id: serviceId } = route.params;
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // --- DATE ---
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState();

  // --- TIME ---
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [time, setTime] = useState("");

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
  }, []);

  const handleSubmit = async () => {
    if (!date || !time || !address || !phone || !selectedAgent) {
      alert("Please fill all required fields");
      return;
    }

    const booking = {
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

    const id = await createBooking(booking);
    navigation.navigate("Confirmation", { bookingId: id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            {/* PROVIDER */}
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

            {/* DATE */}
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

            {/* TIME */}
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

            {/* ADDRESS */}
            <TextInput
              mode="outlined"
              label="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />

            {/* PHONE */}
            <TextInput
              mode="outlined"
              label="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />

            {/* NOTES */}
            <TextInput
              mode="outlined"
              label="Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />

            <PaperButton
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
            >
              Confirm booking
            </PaperButton>
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
