import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StudentStackNavigator, AdminStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#AD0E0A",
        inactiveTintColor: "gray",
        labelStyle: {
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen name="Student" component={StudentStackNavigator} />
      <Tab.Screen name="Admin" component={AdminStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
