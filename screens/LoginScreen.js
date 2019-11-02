import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class LoginScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputLogin}>
          <View style={styles.topLogin}>
            <View>
              <Ionicons name="ios-power" size={24} color="#3432a8" />
            </View>

            <View>
              <Text style={{ color: "#3432a8", marginLeft: 125 }}>
                Tenaciuos{" "}
              </Text>
            </View>
          </View>
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
            <Button
              style={{ color: "white" }}
              title="Login "
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            />
          </View>
          <View style={styles.CreateText}>
            <Button
              style={{ color: "#3432a8" }}
              title="Create Account"
              onPress={() => this.props.navigation.navigate("RegisterScreen")}
            />
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2
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
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
    //elevation: 1
  },
  CreateText: {
    marginTop: 45,
    width: 220,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#3432a8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  topLogin: {
    flexDirection: "row",
    //alignItems: "stretch",
    marginBottom: 35
  }
});

export default LoginScreen;
