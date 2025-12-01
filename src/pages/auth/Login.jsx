
// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthCard from "../../components/common/AuthCard";
import LogoHeader from "../../components/common/LogoHeader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;


      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        if (userRole === "admin") {
          navigation.navigate("Admin");
        } else if (userRole === "user") {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Home");
        }
      } else {
        setError("No user data found.");
      }
    } catch (error) {
      setError("Error signing in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <LogoHeader title="Welcome back" subtitle="Sign in to continue" />

        <View style={styles.content}>
          <View style={styles.fields}>
            <Input
              id="login-email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              id="login-password"
              label="Password"
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.forgotRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            full
            onPress={handleLogin}
            style={styles.btn}
            loading={loading}
            disabled={loading}
          >
            Sign in
          </Button>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              <Text>Don't have an account? </Text>
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign up
              </Text>
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </View>
      </AuthCard>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 8,
    gap: 20,
  },
  fields: {
    gap: 12,
  },
  forgotRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  forgotText: {
    fontSize: 13,
    color: "#4b5563",
  },
  footer: {
    alignItems: "center",
    marginTop: 4,
  },
  footerText: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
  },
  footerLink: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  errorText: {
    marginTop: 8,
    fontSize: 13,
    color: "#ef4444",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#2563eb",
  },
});
