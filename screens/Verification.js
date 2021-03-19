import React, { Component } from "react";
import { Text, View, Image, Button, TextInput, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import styles from "../style/styles.js";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");
const compare = require("resemblejs").compare;


export default class Verification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            oldestSignature: "",
            currentSignature: "",
            studentnr: "",
            mismatch: "",
        }
        this.getOldestSignature = this.getOldestSignature.bind(this)
        this.verify = this.verify.bind(this)
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener("focus", () => {
            if (typeof this.props.route.params !== "undefined") {
                this.setState({ studentnr: this.props.route.params.studentnr, currentSignature: this.props.route.params.handtekening });
                console.log(this.state.studentnr);
            }
        });
        this.getOldestSignature()
    }


    getOldestSignature() {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT Handtekening FROM tblSignature where Datum = (SELECT min(Datum) from tblSignature where Studentnr = '" + this.state.studentnr + "');",
                [],
                (_, { rows }) => this.setState({ oldestSignature: rows[0].Handtekening })

            );

        });
    }

    verify() {
        var mismatch
        const options = {
            returnEarlyThreshold: 5
        };

        //Dit zijn de signatures in base64 formaat
        var image1 = this.state.oldestSignature
        var image2 = this.state.currentSignature
        // data is the same as usual with an additional getBuffer() function
        compare(image1, image2, options, function (err, data) {
            if (err) {
                console.log("An error!");
            } else {
                mismatch = data.misMatchPercentage
            }
        });
        this.setState({ mismatch: mismatch + "%" });
    }


    render() {
        console.log(this.state.oldestSignature)
        console.log(this.state.currentSignature)
        console.log(this.state.hidden)
        return (
            <View>
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
                </View>
                <View style={styles.rowContainerSignatures}>
                    <Image style={{
                        borderColor: "black",
                        borderWidth: 5,
                        width: 200,
                        height: 200,
                        alignItems: "center",
                        resizeMode: 'stretch',
                        marginLeft:520 
                    }}
                    source={this.state.oldestSignature}
                    />
                    <Image
                        style={{
                        borderColor: "black",
                        borderWidth: 5,
                        width: 200,
                        height: 200,
                        alignItems: "center",
                        resizeMode: 'stretch',
                        marginRight:520,
                        marginLeft:90
                    }}
                        source={this.state.currentSignature}
                    />
                </View>
                <br></br>
                <View>
                    <Button 
                        onPress={() => {
                            this.verify()
                        }}
                        title="Verifieer"
                        color="#AD0E0A"
                    />
                </View>
                <br></br>
                <View>
                    <Text style={styles.header1}>Mismatch: </Text>
                    <Text style={styles.header2}>{this.state.mismatch}</Text>
                </View>
            </View>
        );
    }
}
