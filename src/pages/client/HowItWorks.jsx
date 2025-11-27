// src/pages/client/HowItWorks.jsx
import React, { useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Animated, Dimensions, SafeAreaView, Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Card,
  Text,
  Surface,
  Avatar,
  Divider,
  useTheme,
} from "react-native-paper";

const { width } = Dimensions.get("window");

const steps = [
  {
    title: "Sign up or log in",
    description:
      "Create your account or sign in with your existing credentials to personalize your experience.",
  },
  {
    title: "Explore services",
    description:
      "Browse curated categories and find vetted professionals who match your exact needs.",
  },
  {
    title: "Share booking details",
    description:
      "Enter the location, schedule, and preferences so providers know exactly what to deliver.",
  },
  {
    title: "Get confirmed",
    description:
      "Sit tight while we notify the provider and send you real-time updates on approval.",
  },
  {
    title: "Track and enjoy",
    description:
      "Manage every appointment from your dashboard and focus on what matters most.",
  },
];

export default function HowItWorks() {
  const navigation = useNavigation();
  const theme = useTheme();

  // animation values per item
  const animValues = useRef(steps.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = animValues.map((val, i) =>
      Animated.timing(val, {
        toValue: 1,
        duration: 450,
        delay: i * 120,
        useNativeDriver: true,
      })
    );
    Animated.stagger(80, animations).start();
  }, [animValues]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Surface style={[styles.hero, { backgroundColor: theme.colors.surface }]}
          elevation={3}
        >
          <View style={styles.heroTop}>
            <Avatar.Text size={56} label="EN" style={[styles.avatar, { backgroundColor: theme.colors.primary }]} />
            <View style={styles.heroText}>
              <Text style={[styles.kicker, { color: theme.colors.primary }]}>THE ENJEZ JOURNEY</Text>
              <Text style={styles.heroTitle}>How Enjez Works</Text>
            </View>
          </View>

          <Text style={styles.heroLead}>
            Book any service in a few simple steps. Transparent, fast, and tailored
            to your schedule.
          </Text>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("Services")}
            style={styles.cta}
            contentStyle={styles.ctaContent}
          >
            Get Started
          </Button>
        </Surface>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionKicker, { color: theme.colors.primary }]}>FROM START TO SERVICE</Text>
            <Text style={styles.sectionTitle}>Your step-by-step path</Text>
            <Text style={styles.sectionLead}>
              Each milestone is designed to keep you informed and confident, no
              matter which service you choose.
            </Text>
          </View>

          <View style={styles.stepsWrap}>
            {steps.map((step, index) => {
              const anim = animValues[index];
              const translateY = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
              });
              const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] });
              const opacity = anim;

              return (
                <Animated.View
                  key={step.title}
                  style={[styles.stepRow, { transform: [{ translateY }, { scale }], opacity }]}
                >
                  <Card style={[styles.stepCard, index === 0 && styles.firstStepCard]} elevation={3}>
                    <Card.Content>
                      <View style={styles.stepHeader}>
                        <View style={styles.stepNumber}>
                          <Text style={[styles.stepNumberText, { color: theme.colors.primary }]}>{index + 1}</Text>
                        </View>
                        <Text style={[styles.stepLabel, { color: theme.colors.primary }]}>Step {index + 1}</Text>
                      </View>

                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDesc}>{step.description}</Text>
                    </Card.Content>
                  </Card>

                  <Card style={[styles.previewCard, { backgroundColor: theme.colors.surface }]} elevation={2}>
                    <Card.Content style={styles.previewContent}>
                      <Text style={[styles.previewKicker, { color: theme.colors.primary }]}>Preview</Text>
                      <Text style={styles.previewTitle}>{step.title}</Text>
                      <Text style={styles.previewDesc}>
                        Visual walkthrough of the step in your dashboard.
                      </Text>
                    </Card.Content>
                  </Card>
                </Animated.View>
              );
            })}
          </View>
        </View>

        <Surface style={[styles.footerCTAStrip, { backgroundColor: theme.colors.primary }]} elevation={4}>
          <Text style={styles.footerTitle}>Ready to get started?</Text>
          <Text style={styles.footerText}>
            Tap into trusted professionals across every category. Book in minutes
            and track every detail with Enjez.
          </Text>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Services")}
            style={styles.ctaExplore}
            labelStyle={styles.ctaExploreLabel}
          >
            Explore Services
          </Button>
        </Surface>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  container: { flex: 1, backgroundColor: "transparent" },
  content: { padding: 16, paddingBottom: 32 },
  hero: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  heroTop: {
    flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 8,
  },
  avatar: { backgroundColor: "#000" },
  heroText: { marginLeft: 12 },
  kicker: { color: "#000", fontSize: 12, letterSpacing: 1, fontWeight: "700" },
  heroTitle: { fontSize: 22, marginTop: 4, color: "#000" },
  heroLead: { marginTop: 12, color: "#475569" },
  cta: { marginTop: 14, borderRadius: 24, alignSelf: "flex-start" },
  ctaContent: { paddingHorizontal: 18, paddingVertical: 6 },

  section: { marginTop: 6 },
  sectionHeader: { alignItems: "flex-start", marginBottom: 12 },
  sectionKicker: { color: "#000", fontSize: 12, fontWeight: "700" },
  sectionTitle: { fontSize: 20, marginTop: 6, color: "#000" },
  sectionLead: { marginTop: 8, color: "#6b7280" },

  stepsWrap: { marginTop: 12 },
  stepRow: { marginBottom: 14 },
  stepCard: { borderRadius: 12, marginBottom: 8 },
  /* cross-platform drop shadow for cards */
  stepCardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  stepHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 },
  stepNumber: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: { color: "#000", fontWeight: "800" },
  stepLabel: { textTransform: "uppercase", fontSize: 12, color: "#000", fontWeight: "700" },
  stepTitle: { fontSize: 18, marginTop: 4, color: "#000" },
  stepDesc: { marginTop: 6, color: "#475569" },

  previewCard: { borderRadius: 12, backgroundColor: "#fff", marginTop: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
  previewContent: { alignItems: "center", paddingVertical: 14 },
  previewKicker: { color: "#000", fontWeight: "700", fontSize: 12 },
  previewTitle: { fontSize: 16, marginTop: 6, color: "#000" },
  previewDesc: { marginTop: 6, color: "#475569", textAlign: "center" },

  footerCTAStrip: {
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  footerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  footerText: { color: "#fff", marginTop: 8, textAlign: "center" },
  ctaExplore: { marginTop: 12, borderColor: "#fff", borderWidth: 1, borderRadius: 24 },
  ctaExploreLabel: { color: "#fff", fontWeight: "700" },

});