import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login/Login";
import Customers from "./pages/Customers/Customers";
import CustomerDetails from "./pages/CustomerDetails/CustomerDetails";
import SalesOrders from "./pages/SalesOrders/SalesOrders";
import SalesOrderDetails from "./pages/SalesOrderDetails/SalesOrderDetails";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customers"
          component={Customers}
          options={{ title: "Customers" }}
        />

        <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetails}
          options={{ title: "Customer Details" }}
        />

        <Stack.Screen
          name="SalesOrders"
          component={SalesOrders}
          options={{ title: "Sales Orders" }}
        />

        <Stack.Screen
          name="SalesOrderDetails"
          component={SalesOrderDetails}
          options={{ title: "Order Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
