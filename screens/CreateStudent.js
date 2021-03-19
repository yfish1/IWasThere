import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import styles from "../style/styles.js";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");

export default class CreateStudent extends Component {

    constructor(props) {
        super(props)
        this.state = { naam: '', studentennr: '' }
        this.addStudent = this.addStudent.bind(this)
    }

    changeName(naam) {
        this.setState({ naam: naam })
    }

    changeStudentnr(studentennr) {
        this.setState({ studentennr: studentennr })
    }

    addStudent() {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO tblStudent (Naam, StudentNr) VALUES ('" + this.state.naam + "','" + this.state.studentennr + "');"
            );
        });
        this.props.navigation.navigate("AdminSignatures") 

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
                    <Text style={styles.header1}>VOEG EEN NIEUWE STUDENT TOE</Text>
                    <View style={styles.container}>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholder='Studentnaam'
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={this.state.naam}
                            onChangeText={(txt) => this.changeName(txt)}
                        />
                        <TextInput
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholder='Studentennr'
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={this.state.studentennr}
                            onChangeText={(txt) => this.changeStudentnr(txt)}
                        />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.buttonStyle}
                                onPress={this.addStudent}>
                                <Text style={styles.styledButtonText}>Voeg toe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
