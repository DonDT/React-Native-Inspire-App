import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Settings </Text>
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

export default SettingsScreen;
