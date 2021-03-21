import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import styles from "../style/styles.js";
import * as sha1 from 'js-sha1'

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  //showAlert = () => Alert.alert("Alert Title", "My Alert Msg");

  checkPassword = () => {
    if (sha1(this.state.text) == "7af2d10b73ab7cd8f603937f7697cb5fe432c7ff") {
      this.props.navigation.navigate("AdminSignatures");
    } else {
      alert("Password is wrong, try again!");
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <View style={styles.rowContainer}>
          <View>
            <Image style={styles.logo} source={require("../assets/Logo.png")} />
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Image style={styles.naam} source={require("../assets/Naam.png")} />
          </View>
          <View
            style={{
              flex: 1,
              paddingRight: 0,
              paddingLeft: 500,
              marginTop: 30,
            }}
          >
            <Image style={styles.ap} source={require("../assets/AP.png")} />
          </View>
        </View>
        <View style={{ alignItems: "center", backgroundColor: "#F2F2F2" }}>
          <Text style={styles.header1}>ADMIN</Text>
          {/* //<br></br> */}
          <View
            style={{
              backgroundColor: "#AD0E0A",
              width: "60%",
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#F2F2F2",

                fontSize: 35,
              }}
            >
              Meld je aan
            </Text>
          </View>
          <View style={styles.loginscreentest}>
            <Image
              style={{ width: 120, height: 100, marginTop: 50 }}
              source={require("../assets/UserIcon1.png")}
            />
            <TextInput
              type="password"
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ text })}
            ></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.checkPassword();
            }}
            style={{
              height: 40,
              width: "60%",
              backgroundColor: "#AD0E0A",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#F2F2F2", fontSize: 18 }}>Bevestigen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
