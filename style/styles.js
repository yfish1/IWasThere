import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { getCurrentPosition } from "react-native-geolocation-service";

const styles = {
  logo: { width: 100, height: 100 },
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 40,
    marginHorizontal: 16,
  },
  space: { justifyContent: "space-between" },
  naam: { width: 350, height: 70 },
  ap: { width: 350, height: 50 },
  alignItems: "right",
  titleStyle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  stretch: {
    borderColor: "black",
    borderWidth: 5,
    width: 200,
    height: 200,
    alignItems: "center",
    resizeMode: 'stretch',
  },
  signature: {
    flex: 1,
    borderColor: "#000033",
    borderWidth: 1,
  },
  rowContainerSignatures: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  containerButtons: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#ffffff",
    margin: 10,
  },
  /*container: {
    flex: 1,
    paddingTop: 40,
    marginHorizontal: 16
  },*/
  header1: {
    fontSize: 30,
    color: "#AD0E0A",
    textAlign: "center",
    backgroundColor: "#F2F2F2",
  },
  header2: {
    fontSize: 25,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  styledButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
  },
  styledButtonText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  studentInfo: {
    color: "black",
    fontFamily: "cochin",
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    height: 30,
  },
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
  input: {
    width: "60%",
    marginTop: 35,
    height: "10%",
  },
  loginscreentest: {
    backgroundColor: "white",
    alignItems: "center",
    width: "60%",
    height: 300,
  },
};

export default styles;
