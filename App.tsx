import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

import Home from "./screens/Home";
import Activity from "./screens/Activity";
import Profile from "./screens/Profile";
import History from "./screens/History";
import store from "./store/redux/store";
import { useLocaleNotifications } from "./hooks/useLocaleNotification";
import { Colors } from "./constants/colors";

SplashScreen.preventAutoHideAsync();

const BottomTabs = createBottomTabNavigator();
export default function App() {
  const [loaded, error] = useFonts({
    "poppins-sans": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-sans-bold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
  });
  const { requestPermissions, scheduleDailyReminder } =
    useLocaleNotifications();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    requestPermissions().then(() => {
      scheduleDailyReminder();
    });
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <BottomTabs.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#2c3a63",
              headerTitleAlign: "left",
              tabBarInactiveTintColor: "gray",
              headerBackground: () => (
                <LinearGradient
                  colors={[Colors.blue200, Colors.blue300, Colors.blue800]}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              ),
              headerStyle: {
                shadowColor: "transparent",
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "Poppins-sans-bold",
              },
            }}
          >
            <BottomTabs.Screen
              name="Home"
              options={{
                title: "Home",
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
              }}
              component={Home}
            />
            <BottomTabs.Screen
              name="Activity"
              options={{
                title: "Activity",
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="pulse" size={size} color={color} />
                ),
              }}
              component={Activity}
            />
            <BottomTabs.Screen
              name="History"
              options={{
                title: "History",
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="calendar-clear" size={size} color={color} />
                ),
              }}
              component={History}
            />
            <BottomTabs.Screen
              name="Profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="person-circle" size={size} color={color} />
                ),
              }}
              component={Profile}
            />
          </BottomTabs.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
