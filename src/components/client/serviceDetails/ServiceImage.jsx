import React from "react";
import { Image } from "react-native";

export default function ServiceImage({ images }) {
  const imageUri = (() => {
    const img = images?.[0];
    if (typeof img === "string") {
      return img;
    }
    if (typeof img === "object" && img !== null) {
      if (img.uri) return img.uri;
      if (img.url) return img.url;
    }
    return "https://via.placeholder.com/500x300?text=No+Image";
  })();

  return (
    <Image
      source={{ uri: imageUri }}
      style={{
        width: "100%",
        height: 240,
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: "#eee",
      }}
    />
  );
}
