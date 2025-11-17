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

import { AuthProvider } from "./src/hooks/AuthContext";
import { LoadingProvider } from "./src/context/LoadingContext";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={UserDrawer} />
      <Stack.Screen name="Admin" component={AdminDashboard} />
      
      {/* --- ADD THIS SCREEN --- */}
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <LoadingProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </LoadingProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
