import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import styles from "../style/styles.js";
import { SearchBar } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      search: "",
    };
    this.clearSearch = this.clearSearch.bind(this)
  }

  makeTables() {
    //Moet nog weg!!!!
    /*db.transaction((tx) => {
      tx.executeSql(
          "DROP TABLE tblSignature;"
        );
    });

    db.transaction((tx) => {
      tx.executeSql(
          "DROP TABLE tblStudent;"
        );
    });*/

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tblStudent (StudentNr Varchar(7) NOT NULL UNIQUE, Naam TEXT NOT NULL, PRIMARY KEY (StudentNr))"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tblSignature (Handtekening TEXT NOT NULL , Datum DATE, Locatie Varchar(50), StudentNr VARCHAR(7) NOT NULL, FOREIGN KEY(StudentNr) REFERENCES tblStudent(StudentNr) ON DELETE CASCADE, PRIMARY KEY (StudentNr,Datum,Locatie));"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tblStudent (Naam, StudentNr) VALUES ('Tom Riddle', 's114577');"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tblStudent (Naam, StudentNr) VALUES ('John Doe', 's132585');"
      );
    });
  }

  getstudents() {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from tblStudent",
        [],
        (_, { rows }) => this.setState({ students: rows })

      );

    });
  }
  searchStudent() {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from tblStudent WHERE Naam LIKE '%"+this.state.search+"%' OR StudentNr LIKE '%"+this.state.search+"%';",
        [],
        (_, { rows }) => this.setState({ students: rows })

      );

    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this.makeTables();
    this.getstudents();
    console.log(JSON.stringify(this.state));
    // listen to events emitted by React Navigation, in this case focus
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getstudents();
    });
  }
  /*setData(key, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  getData(key) {
    var json = localStorage.getItem(key);
    var value = JSON.parse(json);
    return value;
  }*/

  getStudents() {
    return this.state.students;
  }

  updateSearch = (search) => {
    if (search) {
      this.setState({ search });
      console.log(search)
      this.searchStudent()
    }
  };
  clearSearch(){
    //this.setState({search:""})
    this.getStudents()
  }

  render() {
    const { search } = this.state;
    //this.setData("students", this.state.students);
    //this.setData("location", this.state.location);
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
        <View>
          <SearchBar
            containerStyle={{ alignItems: "center", justifyContent: "center" }}
            placeholder="Zoek op studentennaam of studentennr"
            platform="ios"
            onChangeText={this.updateSearch}
            value={this.state.search}
            onClear={this.clearSearch()}
            onCancel={this.clearSearch()}
          />
        </View>
        <View style={{ backgroundColor: "#F2F2F2" }}>
          <Text style={styles.header1}>KIES STUDENT</Text>
          {/*<br></br>*/}
          <FlatList
            style={{ marginLeft: 520, marginTop: 40 }}
            contentContainerStyle={{ justifyContent: "center" }}
            data={this.getStudents()}
            renderItem={({ item }) => (
              <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Signature", {
                      studentnr: item.StudentNr,
                    });
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      backgroundColor: "white",
                      color: "#AD0E0A",
                      padding: 10,
                      width: 500,
                    }}
                  >
                    {item.Naam} - {item.StudentNr}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
