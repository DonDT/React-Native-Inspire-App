import React, { Component } from "react";
import { StyleSheet, View, Button, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class WellComeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="ios-power" size={190} color="#3432a8" />
        <View style={styles.LoginRegisterButton}>
          <Button
            onPress={() => this.props.navigation.navigate("LoginScreen")}
            title="Login"
            color="#3432a8"
          />
        </View>

        <View style={styles.LoginRegisterButton}>
          <Button
            onPress={() => this.props.navigation.navigate("RegisterScreen")}
            title="Register"
            color="#3432a8"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold"
  },
  LoginRegisterButton: {
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#3432a8",
    borderWidth: 0.5,
    borderColor: "#3432a8",
    marginBottom: 11,
    width: 210,
    borderRadius: Platform.OS === "ios" ? 10 : 10,
    overflow: "hidden"
  }
});

export default WellComeScreen;
