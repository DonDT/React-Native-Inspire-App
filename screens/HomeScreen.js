import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Goals from "./Goals";
import Ideas from "./Ideas";
import Motivation from "./Motivations";
import Ambitions from "./Ambitions";
import InputScreen from "./InputScreen";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wisdom: [{}],
      goals: 0,
      ideas: 0,
      motivations: 0,
      ambitions: 0,
      goals: [],
      ideas: [],
      motivations: [],
      ambitions: []
    };
  }

  render() {
    console.log(this.props.title);
    return (
      <View style={styles.container}>
        <Text> Home Screen </Text>
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
