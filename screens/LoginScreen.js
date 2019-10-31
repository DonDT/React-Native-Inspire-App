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
        <View>
          <TextInput
            autoCapitalize={"none"}
            placeholder="Enter your email"
            placeholderTextColor="#cecece"
            style={styles.textInput}
          />
          <TextInput
            autoCapitalize={"none"}
            placeholder="Enter your password"
            placeholderTextColor="#cecece"
            style={styles.textInput}
          />
        </View>
        <View style={styles.LoginText}>
          <Text> Login </Text>
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
    width: 250,
    borderBottomWidth: 0.8,
    fontSize: 15,
    borderBottomColor: "#3432a8",
    padding: 5,
    marginTop: 10
  },
  LoginText: {
    marginTop: 45
  }
});

export default HomeScreen;
