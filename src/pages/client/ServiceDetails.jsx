import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { getDocById } from "../../utils/firebaseHelpers.js";
import { useNavigation } from "@react-navigation/native";
import ServiceHeader from "../../components/client/serviceDetails/ServiceHeader";
import ServiceImage from "../../components/client/serviceDetails/ServiceImage";
import ServiceInfo from "../../components/client/serviceDetails/ServiceInfo";

export default function ServiceDetailsPage({ route }) {
  const { id, service: passedService } = route.params || {};
  const [service, setService] = useState(passedService || null);

  const navigation = useNavigation();

  useEffect(() => {
    if (!service && id) {
      load();
    }
  }, [id, service]);

  const load = async () => {
    const data = await getDocById("services", id);
    setService(data);
  };

  if (!service) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingTop: 50 }}
    >
      <ServiceHeader navigation={navigation} />
      <ServiceImage images={service.images} />
      <ServiceInfo service={service} navigation={navigation} />
    </ScrollView>
  );
}
