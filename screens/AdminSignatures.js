import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import styles from "../style/styles.js";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("iwasthere.db");


export default class AdminSignatures extends Component {
  constructor() {
    super();
    this.state = {
      signatures: [],
      search: ''
    };
    this.getsignatures = this.getsignatures.bind(this)
    this.showSignatures = this.showSignatures.bind(this)
  }

  getsignatures() {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from tblSignature ORDER BY Datum DESC;",
        [],
        (_, { rows }) => this.setState({ signatures: rows })

      );
      console.log(this.state.signatures)
    });
  }

  searchSignature(){
    db.transaction((tx) => {
      tx.executeSql(
        "select * from tblSignature WHERE Locatie LIKE '%"+this.state.search+"%' OR StudentNr LIKE '%"+this.state.search+"%' OR Datum LIKE '%"+this.state.search+"%';",
        [],
        (_, { rows }) => this.setState({ signatures: rows })

      );
      console.log(this.state.signatures)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount() {
    this.getsignatures()
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getsignatures();
    });
  }

  showSignatures() {
    return this.state.signatures
  }

  updateSearch = (search) => {
    if (search!="") {
      this.setState({ search });
      console.log(search)
      this.searchSignature()
    }
  };

  clearSearch(){
    //this.setState({search:""})
    this.showSignatures()
  }

  render() {
    console.log(this.state.signatures)
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
        <View style={{ backgroundColor: "#F2F2F2" }}>
          <Text style={styles.header1}>HANDTEKENINGEN</Text>
          <Button
            onPress={() => {
              this.props.navigation.navigate("CreateStudent")
            }}
            title="Voeg student toe"
            color="#AD0E0A"
          />
          {/*<br></br>*/}
          <SearchBar
            containerStyle={{ backgroundColor: "#F2F2F2", alignItems: "center", justifyContent: "center" }}
            placeholder="Zoek op studentennr,plaats of datum"
            platform="ios"
            onChangeText={this.updateSearch}
            value={this.state.search}
            onClear={this.clearSearch()}
            onCancel={this.clearSearch()}
          />
          <FlatList
            style={{ marginLeft: 450, marginTop: 40, marginBottom:40, marginRight:450 }}
            contentContainerStyle={{ justifyContent: "center" }}
            data={this.showSignatures()}
            renderItem={({ item }) => (
              <View style={{ justifyContent: "center", marginBottom: 10, marginTop:10 }}>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate("Verification", {
                    studentnr: item.StudentNr, handtekening: item.Handtekening,
                  });
                }}>
                  <View style={styles.rowContainer}>
                    <Image
                        style={{
                        borderColor: "black",
                        borderWidth: 1,
                        padding: 10,
                        marginLeft:10,
                        marginRight:75,
                        width: 50,
                        height: 50,
                        resizeMode: 'stretch',
                     
                    }}
                        source={item.Handtekening}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "30",
                        backgroundColor: "white",
                        color: "#AD0E0A",
                        padding: 10,
                        marginRight:20
                      }}
                    >
                      {item.StudentNr}
                    </Text>
                    <Text style={{
                      backgroundColor: "white",
                      padding: 10,
                      marginRight:20
                    }}>
                      {item.Locatie}
                    </Text>
                    <Text style={{
                      backgroundColor: "white",
                      padding: 10
                    }}>
                      {item.Datum}
                    </Text>
                  </View>

                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
