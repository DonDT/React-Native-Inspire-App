import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator
} from "react-native";

class HomeScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputLogin}>
          <View>
            <TextInput
              autoCapitalize={"none"}
              placeholder="Email"
              placeholderTextColor="#cecece"
              style={styles.textInput}
            />
            <TextInput
              autoCapitalize={"none"}
              placeholder="Password"
              placeholderTextColor="#cecece"
              style={styles.textInput}
            />
          </View>
          <View style={styles.LoginText}>
            <Text style={{ color: "white" }}> Login </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: 220,
    borderBottomWidth: 0.8,
    fontSize: 15,
    borderBottomColor: "#3432a8",
    padding: 5,
    marginTop: 10
  },
  LoginText: {
    marginTop: 45,
    width: 220,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#3432a8",
    alignItems: "center",
    justifyContent: "center"
  },
  inputLogin: {
    width: 275,
    height: 400,
    borderWidth: 1,
    borderColor: "#cecece",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  }
});

export default HomeScreen;
