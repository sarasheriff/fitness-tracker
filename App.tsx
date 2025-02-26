import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Activity from "./screens/Activity";
import Profile from "./screens/Profile";
import History from "./screens/History";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Provider } from "react-redux";
import store from "./store/redux/store";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "./constants/colors";


const BottomTabs = createBottomTabNavigator();
export default function App() {

  return (
    <>
      <StatusBar />
      <Provider store={store}>
      <NavigationContainer>
        <BottomTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2c3a63",
          tabBarInactiveTintColor: 'gray',
          headerBackground: () => (
            <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            />
          ),
          headerStyle: {
            shadowColor: "transparent"
          },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
