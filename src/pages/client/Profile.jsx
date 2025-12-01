import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
    Text,
    Avatar,
    Card,
    ActivityIndicator,
    Appbar,
    Divider,
    useTheme,
    Button,
    Portal,
    Dialog,
    TextInput,
    HelperText,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/AuthContext";
import { getDocById } from "../../utils/firebaseHelpers";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Profile({ navigation }) {
    const { user } = useAuth();
    const theme = useTheme();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            setPasswordError("Please fill in all fields");
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters");
            return;
        }

        setPasswordLoading(true);
        setPasswordError("");

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);

            setChangePasswordVisible(false);
            setCurrentPassword("");
            setNewPassword("");
            alert("Password updated successfully!");
        } catch (error) {
            console.error(error);
            setPasswordError("Failed to update password. Check your current password.");
        } finally {
            setPasswordLoading(false);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.uid) {
                const userData = await getDocById("users", user.uid);
                setProfile(userData);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    if (!profile) {
        return (
            <SafeAreaView style={styles.container}>
                <Appbar.Header style={{ backgroundColor: "#f8fafc" }}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Profile" />
                </Appbar.Header>
                <View style={styles.errorContainer}>
                    <Text>User profile not found.</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Format createdAt date if it exists
    const memberSince = profile.createdAt
        ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString()
        : "N/A";

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={{ backgroundColor: "#f8fafc" }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Profile" />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Avatar.Text
                        size={80}
                        label={profile.username ? profile.username.substring(0, 2).toUpperCase() : "U"}
                        style={{ backgroundColor: "#2563eb" }}
                    />
                    <Text style={styles.username}>{profile.username || "User"}</Text>
                    <Text style={styles.email}>{profile.email}</Text>
                </View>

                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.row}>
                            <Text style={styles.label}>Role</Text>
                            <Text style={styles.value}>{profile.role || "Client"}</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Member Since</Text>
                            <Text style={styles.value}>{memberSince}</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{profile.email}</Text>
                        </View>
                    </Card.Content>
                </Card>

                <Button
                    mode="contained"
                    onPress={() => setChangePasswordVisible(true)}
                    style={styles.changePasswordButton}
                    buttonColor="#2563eb"
                >
                    Change Password
                </Button>

                <Portal>
                    <Dialog visible={changePasswordVisible} onDismiss={() => setChangePasswordVisible(false)}>
                        <Dialog.Title>Change Password</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Current Password"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                secureTextEntry
                                mode="outlined"
                                style={{ marginBottom: 10 }}
                            />
                            <TextInput
                                label="New Password"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry
                                mode="outlined"
                            />
                            {passwordError ? <HelperText type="error">{passwordError}</HelperText> : null}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setChangePasswordVisible(false)}>Cancel</Button>
                            <Button onPress={handleChangePassword} loading={passwordLoading} disabled={passwordLoading}>Update</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        color: "#1e293b",
    },
    email: {
        fontSize: 16,
        color: "#64748b",
        marginTop: 5,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    label: {
        fontSize: 16,
        color: "#64748b",
        fontWeight: "500",
    },
    value: {
        fontSize: 16,
        color: "#1e293b",
        fontWeight: "600",
    },
    divider: {
        backgroundColor: "#e2e8f0",
    },
    changePasswordButton: {
        marginTop: 20,
        borderRadius: 8,
    },
});
