import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Button } from "react-native";
import styles from "../style/styles.js";
import SignaturePad from "signature_pad";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");

let signaturePad;

export default class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentnr: "",
      signature: "",
      latitude: 0,
      longitude: 0,
      location: [
        {
          road: "",
          house_number: "",
          postcode: "",
        },
      ],
    }
    this.save = this.save.bind(this);
    this.insertSignature = this.insertSignature.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (typeof this.props.route.params !== "undefined") {
        this.setState({ studentnr: this.props.route.params.studentnr });
        console.log(this.state.studentnr);
      }
    });
    var canvas = document.querySelector("canvas");

    signaturePad = new SignaturePad(canvas);

    signaturePad.toDataURL();
    signaturePad.on();

    this.getLocation()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.state.latitude}&lon=${this.state.longitude}&zoom=18&addressdetails=1`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            location: [
              {
                road: data.address.road,
                house_number: data.address.house_number,
                postcode: data.address.postcode,
              },
            ],
          });
        });
    });
  }

  insertSignature() {
    var locatie = "" + this.state.location[0].road + " " + this.state.location[0].house_number + " " + this.state.location[0].postcode 
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tblSignature (Handtekening,StudentNr,Locatie,Datum) VALUES ('" + this.state.signature + "','" + this.state.studentnr + "','" + locatie + "',DATETIME('Now'));"
        //"INSERT INTO tblSignature (Handtekening,StudentNr) VALUES ('"+this.state.signature+"','s114577');"
      );
    });
  }

  save() {
    let data = signaturePad.toDataURL();
    console.log(data);
    console.log("saved.");
    this.setState({ signature: data })
    this.insertSignature();
    alert("Signature saved");
    window.location = "Student";
  }

  clear() {
    signaturePad.clear();
    console.log("cleared.");
  }

  render() {
    console.log(this.state.location)
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Jouw Handtekening</Text>
        <div align="center">
          <canvas
            width="500"
            height="300"
            style={{ border: "1px solid #000000", backgroundColor: "white" }}
          >
            HALLOOOO
          </canvas>
        </div>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.clear}>
            <Text style={styles.styledButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.save}>
            <Text style={styles.styledButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
