import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export default function StepItem({ step, index, anim }) {
    const theme = useTheme();
    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
    });
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] });
    const opacity = anim;

    return (
        <Animated.View
            style={[
                styles.stepRow,
                { transform: [{ translateY }, { scale }], opacity },
            ]}
        >
            <Card
                style={[styles.stepCard, index === 0 && styles.firstStepCard]}
                elevation={3}
            >
                <Card.Content>
                    <View style={styles.stepHeader}>
                        <View style={styles.stepNumber}>
                            <Text style={[styles.stepNumberText, { color: "#2563eb" }]}>
                                {index + 1}
                            </Text>
                        </View>
                        <Text style={[styles.stepLabel, { color: "#2563eb" }]}>
                            Step {index + 1}
                        </Text>
                    </View>

                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDesc}>{step.description}</Text>
                </Card.Content>
            </Card>

            <Card
                style={[styles.previewCard, { backgroundColor: theme.colors.surface }]}
                elevation={2}
            >
                <Card.Content style={styles.previewContent}>
                    <Text style={[styles.previewKicker, { color: "#2563eb" }]}>
                        Preview
                    </Text>
                    <Text style={styles.previewTitle}>{step.title}</Text>
                    <Text style={styles.previewDesc}>
                        Visual walkthrough of the step in your dashboard.
                    </Text>
                </Card.Content>
            </Card>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    stepRow: { marginBottom: 14 },
    stepCard: { borderRadius: 12, marginBottom: 8 },
    stepHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 6,
    },
    stepNumber: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
        justifyContent: "center",
    },
    stepNumberText: { color: "#000", fontWeight: "800" },
    stepLabel: {
        textTransform: "uppercase",
        fontSize: 12,
        color: "#000",
        fontWeight: "700",
    },
    stepTitle: { fontSize: 18, marginTop: 4, color: "#000" },
    stepDesc: { marginTop: 6, color: "#475569" },
    previewCard: {
        borderRadius: 12,
        backgroundColor: "#fff",
        marginTop: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    previewContent: { alignItems: "center", paddingVertical: 14 },
    previewKicker: { color: "#000", fontWeight: "700", fontSize: 12 },
    previewTitle: { fontSize: 16, marginTop: 6, color: "#000" },
    previewDesc: { marginTop: 6, color: "#475569", textAlign: "center" },
});
