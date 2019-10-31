import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Ideas Screen </Text>
        <Button
          onPress={() => this.props.navigation.navigate("ItemScreen")}
          title="Item"
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

export default HomeScreen;
