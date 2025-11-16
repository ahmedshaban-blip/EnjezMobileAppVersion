
// src/pages/auth/Signup.jsx
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "react-native-paper";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthCard from "../../components/common/AuthCard";
import LogoHeader from "../../components/common/LogoHeader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role] = useState("user");
    const [error, setError] = useState("");
    const navigation = useNavigation();

    const handleRegister = async () => {
        setError("");

        try {

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;


            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                role: role,
                createdAt: new Date(),
            });

            Alert.alert("Done!", "You can now log in.");
            navigation.navigate("Login");
        } catch (error) {
            setError(error.message);
            console.error("Error creating Account:", error);
        }
    };

    return (
        <AuthLayout>
            <AuthCard>
                <LogoHeader title="Create account" subtitle="Join the team" />

                <View style={styles.content}>
                    <View style={styles.fields}>
                        <Input
                            id="signup-name"
                            label="Full name"
                            placeholder="Jane Doe"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="words"
                        />
                        <Input
                            id="signup-email"
                            label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            id="signup-password"
                            label="Password"
                            placeholder="********"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Input
                            id="signup-confirm-password"
                            label="Confirm password"
                            placeholder="********"
                            secureTextEntry

                        />
                    </View>

                    <Button full onPress={handleRegister}>
                        Create account
                    </Button>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            <Text>Already have an account? </Text>
                            <Text
                                style={styles.footerLink}
                                onPress={() => navigation.navigate("Login")}
                            >
                                Sign in
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
    footer: {
        alignItems: "center",
        marginTop: 8,
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
});
