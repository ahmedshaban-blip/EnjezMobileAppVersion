// src/navigation/UserDrawer.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Drawer as PaperDrawer,
  Text,
  Avatar,
  useTheme,
} from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import Home from "../pages/client/Home";
import Services from "../pages/client/Services";
import MyBookings from "../pages/client/MyBooking";
import Booking from "../pages/client/Booking";  
import Confirmation from "../pages/client/Confirmation";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const theme = useTheme();
  const { state, navigation } = props;
  const currentRouteName = state.routeNames[state.index];

  const items = [
    { label: "Home", screen: "UserHome", icon: "home-outline" },
    { label: "Services", screen: "Services", icon: "toolbox-outline" },
    { label: "My Bookings", screen: "MyBookings", icon: "calendar-outline" },
    { label: "Booking", screen: "Booking", icon: "calendar-plus" },
    { label: "Confirmation", screen: "Confirmation", icon: "check-circle" },
    
  ];

  const handleLogout = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawer}>
      {/* Header جوه الـ drawer */}
      <View style={styles.drawerHeader}>
        <Avatar.Text
          size={52}
          label="EN"
          style={styles.avatar}
          color={theme.colors.onPrimary}
        />
        <View style={styles.drawerHeaderText}>
          <Text style={styles.drawerTitle}>Enjez</Text>
          <Text style={styles.drawerSubtitle}>Book your services easily</Text>
        </View>
      </View>

      {/* Links */}
      <PaperDrawer.Section style={styles.drawerSection}>
        {items.map((item) => (
          <PaperDrawer.Item
            key={item.screen}
            label={item.label}
            icon={item.icon}
            active={currentRouteName === item.screen}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </PaperDrawer.Section>

      {/* Logout */}
      <PaperDrawer.Section style={styles.drawerFooter}>
        <PaperDrawer.Item
          label="Logout"
          icon="logout"
          onPress={handleLogout}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
}

export default function UserDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="UserHome"
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "rgba(15, 23, 42, 0.4)",
        drawerStyle: {
          width: 280,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="UserHome" component={Home} />
      <Drawer.Screen name="Services" component={Services} />
      <Drawer.Screen name="MyBookings" component={MyBookings} />
      <Drawer.Screen name="Booking" component={Booking} />
      <Drawer.Screen name="Confirmation" component={Confirmation} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    paddingVertical: 16,
  },
  drawerHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    backgroundColor: "#0f172a", // slate-900
  },
  drawerHeaderText: {
    flex: 1,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  drawerSubtitle: {
    fontSize: 13,
    color: "#6b7280",
  },
  drawerSection: {
    marginTop: 8,
  },
  drawerFooter: {
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
  },
});
