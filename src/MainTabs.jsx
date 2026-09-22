import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Customers from "./pages/Customers/Customers";
import SalesOrders from "./pages/SalesOrders/SalesOrders";
import Profile from "./pages/Profile/Profile";
import { isInternalUser } from "./controller/auth.controller";

const Tab = createBottomTabNavigator();

const ICONS = {
  SalesOrders: "receipt-outline",
  Home: "home",
  Profile: "person-outline",
};

// Home sits in the middle of the tab bar because it's declared between
// SalesOrders and Profile below — when SalesOrders is hidden (portal
// user), Home just becomes the first tab instead.
export default function MainTabs() {
  const canViewSalesOrders = isInternalUser();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#111827",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={ICONS[route.name]}
            size={focused ? 26 : 22}
            color={color}
          />
        ),
      })}
    >
      {canViewSalesOrders ? (
        <Tab.Screen
          name="SalesOrders"
          component={SalesOrders}
          options={{ title: "Orders" }}
        />
      ) : null}

      <Tab.Screen name="Home" component={Customers} options={{ title: "Home" }} />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}