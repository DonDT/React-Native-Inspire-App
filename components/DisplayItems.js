import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

        <View style={styles.textSection}>
          <View style={styles.titleAndIcon}>
            <Text style={styles.titleText}>{this.props.wisdom.title}</Text>
            <Ionicons name="ios-more" size={25} style={{ marginRight: 10 }} />
          </View>
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
    minHeight: 90,
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
    fontSize: 18,
    marginBottom: 10
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
    maxHeight: 90,
    overflow: "hidden"
  },
  titleAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 17
  }
});
