import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

export default function ServiceCard({ service, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={{
          margin: 12,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        <Image
          source={{ uri: service.images?.[0] }}
          style={{
            width: "100%",
            height: 140,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />

        <Card.Content style={{ paddingVertical: 12 }}>
          <Text variant="titleMedium">{service.name}</Text>
          <Text variant="bodySmall" style={{ marginVertical: 6 }}>
            {service.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text variant="titleSmall" style={{ color: "#2563eb" }}>
              {service.price} EGP
            </Text>
            <Text variant="bodySmall">
              {service.durationValue} {service.durationUnit}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
