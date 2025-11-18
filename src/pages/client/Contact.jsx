// Contact.jsx — Client Contact screen for Enjez (React Native, web-aligned)
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput } from "react-native-paper";
import { Linking } from "react-native";
import Button from "../../components/ui/Button";

const COLORS = {
  pageBg: "#f6f6f8", // background-light
  heading: "#111318",
  subHeading: "#616f89",
  cardBg: "#ffffff",
  border: "#dbdfe6",
  borderDark: "#334155",
  primary: "#135bec",
  textMuted: "#6b7280",
};

export default function Contact({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { fullName, email, subject, message } = formData;

    if (!fullName || !email || !message) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all required fields before submitting."
      );
      return;
    }

    const mailSubject =
      subject?.trim() || "Question about my booking (from Enjez app)";
    const bodyLines = [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ];
    const mailBody = bodyLines.join("\n");

    const url =
      "mailto:support@enjez.com" +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        "Error",
        "Could not open your email app. Please try again later."
      );
    });
  };

  const handleCall = () => {
    Linking.openURL("tel:+201030354268").catch(() => {
      Alert.alert("Error", "Could not start a phone call on this device.");
    });
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@enjez.com").catch(() => {
      Alert.alert("Error", "Could not open email app.");
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Contact Our Team</Text>
          <Text style={styles.subtitle}>
            We'll get back to you within 24 hours. Have a simple question?{" "}
            <Text
              style={styles.link}
              onPress={() => {
                // ممكن بعدين نربطها بصفحة FAQ لو اتعملت
              }}
            >
              Check our FAQ first!
            </Text>
          </Text>
        </View>

        {/* Form + Info */}
        <View style={styles.mainGrid}>
          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Send us a Message</Text>

            <View style={styles.formGroupRow}>
              <View style={styles.formField}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  mode="outlined"
                  value={formData.fullName}
                  onChangeText={(v) => handleChange("fullName", v)}
                  placeholder="Enter your full name"
                  outlineColor={COLORS.border}
                  activeOutlineColor={COLORS.primary}
                  style={styles.textInput}
                  dense
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  mode="outlined"
                  value={formData.email}
                  onChangeText={(v) => handleChange("email", v)}
                  placeholder="Enter your email address"
                  outlineColor={COLORS.border}
                  activeOutlineColor={COLORS.primary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.textInput}
                  dense
                />
              </View>
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                mode="outlined"
                value={formData.subject}
                onChangeText={(v) => handleChange("subject", v)}
                placeholder="e.g., Question about my booking"
                outlineColor={COLORS.border}
                activeOutlineColor={COLORS.primary}
                style={styles.textInput}
                dense
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Your Message</Text>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={5}
                value={formData.message}
                onChangeText={(v) => handleChange("message", v)}
                placeholder="Please describe your issue or question in detail..."
                outlineColor={COLORS.border}
                activeOutlineColor={COLORS.primary}
                style={[styles.textInput, styles.textArea]}
              />
            </View>

            <View style={styles.submitWrapper}>
              <Button full onPress={handleSubmit}>
                Send Message
              </Button>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Other Ways to Reach Us</Text>

            <View style={styles.infoList}>
              <ContactInfo
                icon="mail"
                title="Email Us"
                desc="For general inquiries and support."
                info="support@enjez.com"
                onPress={handleEmail}
              />
              <ContactInfo
                icon="call"
                title="Call Us"
                desc="Sun - Fri, 9am - 5pm EST"
                info="+201030354268"
                onPress={handleCall}
              />
              <ContactInfo
                icon="location_on"
                title="Our Office"
                desc="Come say hello at our headquarters."
                info="123 Service Lane, Tech City, 45678"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ContactInfo({ icon, title, desc, info, onPress }) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIconCircle}>
        <Text style={styles.infoIconText}>
          {icon === "mail" ? "✉️" : icon === "call" ? "📞" : "📍"}
        </Text>
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoItemTitle}>{title}</Text>
        <Text style={styles.infoItemDesc}>{desc}</Text>
        {onPress ? (
          <Text style={styles.infoItemLink} onPress={onPress}>
            {info}
          </Text>
        ) : (
          <Text style={styles.infoItemInfo}>{info}</Text>
        )}
      </View>
    </View>
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
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.heading,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.subHeading,
    textAlign: "center",
  },
  link: {
    color: COLORS.primary,
    fontWeight: "500",
    textDecorationLine: "underline",
  },

  mainGrid: {
    flexDirection: "column",
    gap: 16,
  },

  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.heading,
  },
  formGroupRow: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 8,
  },
  formField: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
    color: COLORS.heading,
  },
  textInput: {
    backgroundColor: "#ffffff",
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  submitWrapper: {
    marginTop: 8,
  },

  infoColumn: {
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.heading,
    marginBottom: 12,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  infoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
  },
  infoIconText: {
    fontSize: 20,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.heading,
  },
  infoItemDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  infoItemLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  infoItemInfo: {
    fontSize: 13,
    color: COLORS.heading,
    marginTop: 4,
  },
});
