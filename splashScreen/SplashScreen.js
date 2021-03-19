import React from "react";
import { View, Text } from "react-native";

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, 2000)
    );
  };
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate("App");
    }
  }
  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}> Welcome to the application</Text>
      </View>
    );
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79ff26",
  },
  textStyles: {
    color: "#ff4824",
    fontSize: 50,
    fontWeight: "italic",
  },
};
export default SplashScreen;
