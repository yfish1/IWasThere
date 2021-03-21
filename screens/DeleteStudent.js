import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import styles from "../style/styles.js";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");

export default class DeleteStudent extends Component {

    constructor(props) {
        super(props)
        this.state = { input: '' }
        this.deleteStudent = this.deleteStudent.bind(this)
    }

    changeInput(input) {
        this.setState({ input: input })
    }

    deleteStudent() {
        try {
            db.transaction((tx) => {
                try {
                    tx.executeSql(
                        "DELETE FROM tblStudent WHERE StudentNr = '" + this.state.input + "' OR Naam ='" + this.state.input + "';"
                    );
                } catch (error) {
                    alert('Deze student bestaat niet.')
                }

            });
            //this.props.navigation.navigate("AdminSignatures")
        } catch (error) {
            alert('Deze student bestaat niet.')
        }


    }
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
                <View style={styles.container}>
                    <Text style={styles.header1}>VERWIJDER EEN STUDENT</Text>
                    <View style={styles.container}>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholder='Studentnaam of nummer'
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={this.state.naam}
                            onChangeText={(txt) => this.changeInput(txt)}
                        />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.buttonStyle}
                                onPress={this.deleteStudent}>
                                <Text style={styles.styledButtonText}>VERWIJDER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
