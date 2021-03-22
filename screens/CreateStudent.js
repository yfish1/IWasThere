import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import styles from "../style/styles.js";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");

export default class CreateStudent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            naam: '', studentennr: '',
            students: ''
        }
        this.addStudent = this.addStudent.bind(this)
        this.addCSV = this.addCSV.bind(this)

    }

    changeName(naam) {
        this.setState({ naam: naam })
    }

    changeStudentnr(studentennr) {
        this.setState({ studentennr: studentennr })
    }

    changeStudents(data) {
        this.setState({ students: data })
    }

    addStudent() {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO tblStudent (Naam, StudentNr) VALUES ('" + this.state.naam + "','" + this.state.studentennr + "');"
            );
        });
        this.props.navigation.navigate("AdminSignatures")

    }

    addCSV() {
        var studentList = this.state.students
        studentList = studentList.split(';')
        var studentNumberList = []
        var studentNameList = []
        for (let index = 0; index < studentList.length; index++) {
            if (studentList[index] != "") {
                if (index % 2 == 0) {
                    studentNameList.push(studentList[index]);
                }
                else {
                    studentNumberList.push(studentList[index]);
                }
            }
        }
        for (let index = 0; index < studentNameList.length; index++) {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO tblStudent (Naam, StudentNr) VALUES ('" + studentNameList[index] + "','" + studentNumberList[index] + "');"
                );
            });
        }
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
                    <Text style={styles.header2}> Breng manueel in</Text>
                    <View>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholder='Studentnaam'
                            maxLength={50}
                            onBlur={Keyboard.dismiss}
                            value={this.state.naam}
                            onChangeText={(txt) => this.changeName(txt)}
                        />
                        <TextInput
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholder='Studentennr'
                            maxLength={7}
                            onBlur={Keyboard.dismiss}
                            value={this.state.studentennr}
                            onChangeText={(txt) => this.changeStudentnr(txt)}
                        />
                        <TouchableOpacity style={styles.buttonStyle}
                            onPress={this.addStudent}>
                            <Text style={styles.styledButtonText}>Voeg toe</Text>
                        </TouchableOpacity>
                        <Text style={styles.header2}> Of importeer een csv-bestand</Text>
                        <TextInput
                            multiline="true"
                            placeholder='Csv-bestand'
                            numberOfLines={7}
                            value={this.state.students}
                            onChangeText={(txt) => this.changeStudents(txt)}>
                        </TextInput>
                        <TouchableOpacity style={styles.buttonStyle}
                            onPress={this.addCSV}>
                            <Text style={styles.styledButtonText}>Importeer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
