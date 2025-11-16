import "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Login from "./src/pages/auth/Login";
import Home from "./src/pages/client/Home";
import AdminDashboard from "./src/pages/admin/AdminDashboard"; // لو هتستخدمه
import Signup from "./src/pages/auth/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Admin" component={AdminDashboard} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
