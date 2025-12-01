import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";

export default function ServiceHeader({ navigation }) {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
            }}
        >
            <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
                size={26}
            />

            <View>
                <Text variant="headlineSmall">Service Details</Text>
                <Text style={{ opacity: 0.6 }}>Learn more about this service</Text>
            </View>
        </View>
    );
}
