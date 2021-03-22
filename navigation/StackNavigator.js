import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Student from "../screens/Student";
import Signature from "../screens/Signature";
import Admin from "../screens/Admin";
import AdminSignatures from "../screens/AdminSignatures";
import CreateStudent from "../screens/CreateStudent";
import Verification from "../screens/Verification"

const StudentStack = createStackNavigator();
const AdminStack = createStackNavigator();

const StudentStackNavigator = () => {
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen
        name="Student"
        component={Student}
        options={{ headerShown: false }}
      />
      <StudentStack.Screen name="Signature" component={Signature} />
    </StudentStack.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Admin"
        component={Admin}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen name="AdminSignatures" component={AdminSignatures} />
      <AdminStack.Screen name="CreateStudent" component={CreateStudent} />
      <AdminStack.Screen name="Verification" component={Verification} />
    </AdminStack.Navigator>
  );
};

export { AdminStackNavigator, StudentStackNavigator };
