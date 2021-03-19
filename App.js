import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./navigation/TabNavigator";

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
