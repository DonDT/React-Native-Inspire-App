import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
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
            style={styles.LoginRegisterButton}
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
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "#3432a8",
    marginBottom: 11,
    width: 210,
    borderRadius: 10
  }
});

export default WellComeScreen;
