import "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";

import Login from "./src/pages/auth/Login";
import Signup from "./src/pages/auth/Signup";
import AdminDashboard from "./src/pages/admin/AdminDashboard";
import UserDrawer from "./src/navigation/UserDrawer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            {/* ده الـ user side كله (Home + Drawer + باقي الصفحات) */}
            <Stack.Screen name="Home" component={UserDrawer} />
            <Stack.Screen name="Admin" component={AdminDashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
