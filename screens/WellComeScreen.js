import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

class WellComeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Welcome Screen </Text>
        <Button
          onPress={() => this.props.navigation.navigate("LoginScreen")}
          title="Login"
        />
        <Button
          onPress={() => this.props.navigation.navigate("HomeScreen")}
          title="Home"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WellComeScreen;
