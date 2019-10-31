import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

class ItemScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> ItemScreen </Text>
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

export default ItemScreen;
