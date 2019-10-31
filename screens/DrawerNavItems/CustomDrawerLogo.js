import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigatorItems } from "react-navigation-drawer";

class CustomDrawerLogo extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.Container}>
            <Ionicons name="ios-power" size={150} color="#3432a8" />
            <Text style={styles.DrawerLogoText}> Tenacious </Text>
          </View>
          <DrawerNavigatorItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    height: 175,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: Platform.OS === "andriod" ? 20 : 0
  },
  DrawerLogoText: {
    fontSize: 25,
    color: "#3432a8",
    fontWeight: "100",
    marginBottom: 15
  }
});

export default CustomDrawerLogo;
