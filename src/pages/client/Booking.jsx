// src/pages/client/Booking.jsx
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  Button as PaperButton,
  IconButton,
  Card,
} from "react-native-paper";

const COLORS = {
  pageBg: "#f4f4ff",      // خلفية فاتحة زي الويب
  cardBg: "#ffffff",      // كارت أبيض زي الفلتر في الصورة
  border: "#e5e7eb",      // حدود خفيفة
  textMuted: "#6b7280",
  primaryText: "#111827",
  primary: "#2563eb",     // أزرق زرار
};

export default function Booking({ navigation }) {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Confirmation");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar مع زرار المينيو زي باقي الصفحات */}
        <View style={styles.topBar}>
          <IconButton
            icon="menu"
            size={24}
            iconColor={COLORS.primaryText}
            onPress={() => navigation.openDrawer()}
          />
          <View style={styles.brand}>
            <Text style={styles.brandTitle}>Enjez</Text>
            <Text style={styles.brandSubtitle}>
              Book trusted home services
            </Text>
          </View>
        </View>

        <Text style={styles.title}>New booking</Text>
        <Text style={styles.subtitle}>
          Choose your service and preferred time. Later you can connect this
          form with your backend like in the web app.
        </Text>

        {/* كارت أبيض حوالين الفورم زي Filters في تصميم الويب */}
        <Card mode="elevated" style={styles.formCard}>
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Service"
              placeholder="Home cleaning, AC maintenance..."
              value={service}
              onChangeText={setService}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            <TextInput
              mode="outlined"
              label="Date & time"
              placeholder="e.g. 21 Jun, 5:00 pm"
              value={date}
              onChangeText={setDate}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            <TextInput
              mode="outlined"
              label="Notes"
              placeholder="Extra details for the provider"
              value={notes}
              onChangeText={setNotes}
              style={styles.input}
              multiline
              numberOfLines={3}
              outlineStyle={styles.inputOutline}
            />

            <PaperButton
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              contentStyle={{ paddingVertical: 6 }}
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
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  brand: {
    marginLeft: 4,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  brandSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  title: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  formCard: {
    borderRadius: 24,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 4,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#ffffff", // مفيش بقى الأزرق الغامق
  },
  inputOutline: {
    borderRadius: 18,
    borderColor: COLORS.border,
  },
  button: {
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  buttonLabel: {
    fontWeight: "600",
    color: "#ffffff",
  },
});
