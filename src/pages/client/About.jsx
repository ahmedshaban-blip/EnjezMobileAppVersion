// About.jsx — Client About screen for Enjez (React Native, web-aligned)
import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, Appbar } from "react-native-paper";
import LogoHeader from "../../components/common/LogoHeader";
import Button from "../../components/ui/Button";

const COLORS = {
  pageBg: "#f6f6f8", // background-light
  primary: "#135bec", // primary
  darkBg: "#101622", // background-dark (نستخدمه في شوية خلفيات)
  heading: "#111318",
  text: "#111318",
  textMuted: "#4b5563",
  cardBorder: "#e5e7eb",
};

const HERO_IMAGE = {
  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUZgGpO9s4fv7v7kWHKbv_VsXgV_qkaOUjOAfNxdY3Yzqh8bAh3exi31s41FGJiBxAu9svIJjaUWoHTAyzL8flQY75EcCjjvxjdQytiLMqBYoKIGLFb717IIG5jcgBeHYpE248T8JHXrbvQMRFU0Lntvg_DvOA808ez-mBVdTqth_BTBeb07_6e97Y__LFXIDJgkS_ZIuWtzWEEMrAtCZQNJqu0XvzdfkzLhkWGvcol8hMKKnJ47MjbMXNhFxtxfsa4LOk6gry-XZu",
};

const TEAM = [
  {
    name: "John Carter",
    role: "Founder & CEO",
    quote:
      '"Our goal is to build solutions that not only work, but inspire. That\'s the passion that drives us every single day."',
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC36CSjEu2473p80RYFigsRchaJTTDYTNw6ddmk1LObDNzvgMwEgH1qEHaffxIvPBzic5Ey2oJ4nxYxBUxtjnzizexc_jDqIOqlu9jnJkY9NX8uQbnaQlOZDXCmZuLiILWYqyiHPq0ZRafheJz6KtAxj7GPW2rJamm54Mv6G1A2OEwetatNx1obIrgZyGGGZLK0dH62MY4Atk_p2gcH6CDhZ9HVyn8MYfVtjAXOtB9wLmhzWqPUEqG9ghxVqOQ9RKJWzSCEBZlVN6Zg",
  },
  {
    name: "Sophie Moore",
    role: "Lead Service Provider",
    quote:
      '"I love connecting with our clients and understanding their unique challenges to deliver truly personalized service."',
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_B1pzFoXeLATALbFdY2Yt8bNEDdaliZSwazBVPPXoxGGmlqL1Nyi8M61EeUKMg6t4aWovO7i-nzJ2-88qv5WmkY_Ap7Ll5V6YTbMa0g5AwMf0MV5WRzHTArj454CTjqkkDHXFCF9wDe0DHkRrreZLqfjyyjtyNknqaxXaOD7Xoqdp5_i7EVZ6QL9eqcgSu3G6Kpd9uDXQnyI9vGG_GnB2Bv7B_RXSXwCDY2rxuVzjnTwAFdCG6fcd12BM54SruiKQo_mrtsSRvCvo",
  },
  {
    name: "David Chen",
    role: "Head of Innovation",
    quote:
      '"Pushing boundaries and exploring new technologies is how we stay ahead and deliver exceptional value."',
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBD79S7LQ1aFU3Y86GgSGBbOVY82jaf2OuUZEIab8aoDRGQM6My0vyscRGe9_FCt8wT7fo7KLnl4ilrVhbnf2dH0H6ygB7nawLdNYq4W5GPJoKPkfEBK4bCdq7JxEd9e7y3WVICs-OukDF61iWePYMX9xfH_Ek1qK2L8gup3_vwLbWCaBdPCA9LSHHuVQqLuZh2bUYi2WSOpQh36A8afIenaJFUfIpG63IeQPfYAttX_agguNYe1MrMniQNyCRbFQYUHiERJ8WpsAq",
  },
];

export default function About({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: COLORS.pageBg }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="About Us" />
      </Appbar.Header>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroWrapper}>
          <ImageBackground source={HERO_IMAGE} style={styles.heroBg}>
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                Our Mission: Empowering Your Success
              </Text>
              <Text style={styles.heroSubtitle}>
                We are dedicated to providing exceptional service and innovative
                solutions to help you achieve your goals with confidence and
                clarity.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Our Story */}
        <View style={styles.section}>
          <View style={styles.sectionInnerNarrow}>
            <Text style={styles.sectionTitle}>Our Story</Text>
            <Text style={styles.sectionParagraph}>
              Founded with a passion for excellence, our journey began with a
              simple idea: to create a service that not only meets but exceeds
              expectations. We saw a need for a partner who is reliable,
              innovative, and truly invested in the success of its clients. From
              our humble beginnings, we have grown into a trusted leader in the
              industry, driven by our commitment to solving complex problems and
              delivering tangible results.
            </Text>
          </View>
        </View>

        {/* Our Core Values */}
        <View style={styles.section}>
          <View style={styles.sectionInnerWide}>
            <Text style={styles.valuesTitle}>Our Core Values</Text>
            <Text style={styles.valuesSubtitle}>
              Our values are the foundation of our company. They guide our
              actions and define our commitment to our clients, our team, and
              our community.
            </Text>

            <View style={styles.valuesGrid}>
              <View style={styles.valueCard}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>👥</Text>
                </View>
                <Text style={styles.valueTitle}>Customer First</Text>
                <Text style={styles.valueText}>
                  We believe in building lasting relationships by putting our
                  clients' needs at the heart of everything we do.
                </Text>
              </View>

              <View style={styles.valueCard}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>✔️</Text>
                </View>
                <Text style={styles.valueTitle}>Quality & Craftsmanship</Text>
                <Text style={styles.valueText}>
                  Our commitment to excellence ensures we deliver superior
                  quality and meticulous attention to detail in every project.
                </Text>
              </View>

              <View style={styles.valueCard}>
                <View style={[styles.iconCircle, styles.iconPulse]}>
                  <Text style={styles.iconText}>💡</Text>
                </View>
                <Text style={styles.valueTitle}>Innovation</Text>
                <Text style={styles.valueText}>
                  We constantly seek out new and better ways to solve problems,
                  driving progress and delivering cutting-edge solutions.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Team Section */}
        <View style={[styles.section, styles.teamSection]}>
          <View style={styles.sectionInnerWide}>
            <Text style={styles.teamTitle}>Meet the Team</Text>
            <Text style={styles.teamSubtitle}>
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </Text>

            <View style={styles.teamGrid}>
              {TEAM.map((member) => (
                <View key={member.name} style={styles.teamCard}>
                  <Image
                    source={{ uri: member.image }}
                    style={styles.teamAvatar}
                  />
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                  <View style={styles.teamDivider} />
                  <Text style={styles.teamQuote}>{member.quote}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.section}>
          <View style={styles.ctaWrapper}>
            <Text style={styles.ctaTitle}>Ready to get started?</Text>
            <Text style={styles.ctaText}>
              Let's work together to achieve your goals. Explore our services or
              book a free consultation to discuss your needs.
            </Text>
            <View style={styles.ctaButtons}>
              <Button
                full={false}
                onPress={() => navigation.navigate("Services")}
                style={styles.btn}
              >
                Explore Services
              </Button>
              <Button
                full={false}
                mode="outlined"
                onPress={() => navigation.navigate("Contact")}
              >
                Book a Consultation
              </Button>
            </View>
          </View>
        </View>
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
    paddingBottom: 32,
    paddingTop: 16,
  },

  // Hero
  heroWrapper: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  heroBg: {
    minHeight: 320,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,37,64,0.65)",
  },
  heroContent: {
    paddingHorizontal: 16,
    maxWidth: 700,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#e5e7eb",
    textAlign: "center",
  },

  // Sections
  section: {
    paddingVertical: 20,
  },
  sectionInnerNarrow: {
    maxWidth: 640,
    alignSelf: "center",
  },
  sectionInnerWide: {
    maxWidth: 960,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.heading,
    marginBottom: 10,
  },
  sectionParagraph: {
    fontSize: 15,
    color: "#1f2933",
    textAlign: "center",
    lineHeight: 22,
  },

  // Values
  valuesTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.heading,
    textAlign: "center",
    marginBottom: 8,
  },
  valuesSubtitle: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
  },
  valuesGrid: {
    flexDirection: "column",
    gap: 12,
  },
  valueCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: "#ffffff",
    padding: 16,
    alignItems: "center",
    elevation: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "rgba(19,91,236,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconText: {
    fontSize: 20,
  },
  iconPulse: {
    // بس شكل مختلف بسيط
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.heading,
    marginBottom: 4,
    textAlign: "center",
  },
  valueText: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 20,
  },

  // Team
  teamSection: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 8,
    marginHorizontal: -8,
    marginTop: 8,
  },
  teamTitle: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.heading,
    marginBottom: 8,
  },
  teamSubtitle: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  teamGrid: {
    flexDirection: "column",
    gap: 16,
  },
  teamCard: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    elevation: 2,
  },
  teamAvatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.heading,
  },
  teamRole: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 2,
  },
  teamDivider: {
    height: 1,
    width: 48,
    backgroundColor: "rgba(15,23,42,0.2)",
    marginVertical: 8,
  },
  teamQuote: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 20,
  },

  // CTA
  ctaWrapper: {
    maxWidth: 960,
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.heading,
    textAlign: "center",
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 15,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  ctaButtons: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
    color: COLORS.primary,
  },
  btn: {
    backgroundColor: COLORS.primary,
  }
});
