import React, { useState, useEffect } from "react";
import "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";

import Login from "./src/pages/auth/Login";
import Signup from "./src/pages/auth/Signup";
import AdminDashboard from "./src/pages/admin/AdminDashboard";
import UserDrawer from "./src/navigation/UserDrawer";

// Check that this path is correct for your project structure
import BookingDetails from "./src/pages/client/BookingDetails";

import { AuthProvider, useAuth } from "./src/hooks/AuthContext";
import { LoadingProvider } from "./src/context/LoadingContext";
import ServiceDetailsPage from "./src/pages/client/ServiceDetails";
import Booking from "./src/pages/client/Booking";
import Confirmation from "./src/pages/client/Confirmation";
import SplashScreen from "./src/components/SplashScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useAuth();

  // Determine initial route based on user role
  const initialRoute = user ? (user.role === 'admin' ? 'Admin' : 'Home') : 'Login';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={UserDrawer} />
      <Stack.Screen name="Admin" component={AdminDashboard} />

      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetailsPage} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
    </Stack.Navigator>
  );
}

function Main() {
  const { authLoading } = useAuth();
  const [isSplashAnimationFinished, setIsSplashAnimationFinished] = useState(false);

  // Show splash screen if auth is loading OR animation hasn't finished
  if (authLoading || !isSplashAnimationFinished) {
    return (
      <SplashScreen
        onFinish={() => setIsSplashAnimationFinished(true)}
      />
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <LoadingProvider>
          <AuthProvider>
            <Main />
          </AuthProvider>
        </LoadingProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
