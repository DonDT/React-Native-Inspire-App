import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default class DisplayItems extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            source={require("../assets/rose-blue-flower.jpeg")}
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
          <Text style={styles.titleText}>{this.props.wisdom.title}</Text>
          <Text style={styles.textDetails}>{this.props.wisdom.detail}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 100,
    marginVertical: 15
  },
  image: {
    flex: 1,
    height: 90,
    width: 90,
    marginLeft: 10,
    borderRadius: 25
  },
  titleText: {
    paddingTop: 0,
    fontSize: 18,
    marginBottom: 10
  }
});
