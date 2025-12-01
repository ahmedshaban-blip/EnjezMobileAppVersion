import React from "react";
import { Image } from "react-native";

export default function ServiceImage({ images }) {
    return (
        <Image
            source={{
                uri:
                    images?.[0] ||
                    "https://via.placeholder.com/500x300?text=No+Image",
            }}
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
