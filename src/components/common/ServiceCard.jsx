import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

export default function ServiceCard({ service, onPress, compact = false }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={{
          margin: compact ? 4 : 12,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        <Image
          source={{
            uri: (() => {
              const img = service.images?.[0];
              if (typeof img === 'string') return img;
              if (typeof img === 'object' && img?.uri) return img.uri;
              if (typeof img === 'object' && img?.url) return img.url;
              return "https://via.placeholder.com/400x200?text=No+Image";
            })()
          }}
          style={{
            width: "100%",
            height: compact ? 100 : 140,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: '#e1e4e8' // fallback background color
          }}
        />

        <Card.Content style={{ paddingVertical: compact ? 8 : 12 }}>
          <Text variant={compact ? "titleSmall" : "titleMedium"} numberOfLines={1}>{service.name}</Text>
          <Text variant="bodySmall" style={{ marginVertical: compact ? 4 : 6 }} numberOfLines={2}>
            {service.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text variant="titleSmall" style={{ color: "#2563eb", fontSize: compact ? 12 : undefined }}>
              {service.price} EGP
            </Text>
            <Text variant="bodySmall" style={{ fontSize: compact ? 10 : undefined }}>
              {service.durationValue} {service.durationUnit}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
