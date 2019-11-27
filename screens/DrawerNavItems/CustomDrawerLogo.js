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
import { connect } from "react-redux";

class CustomDrawerLogo extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.Container}>
            <Ionicons name="ios-power" size={150} color="#3432a8" />
            <Text style={styles.DrawerLogoText}> Tenacious </Text>
          </View>
          <View style={styles.firstIcons}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-home"
                size={24}
                style={{ margin: 20, color: "#3432a8" }}
              />

              <Text style={{ marginTop: 25, marginLeft: 15 }}>Home</Text>
            </View>
            <View style={styles.rightDisplay}>
              <Text style={{ color: "white" }}>
                {this.props.Wisdoms.wisdoms.length}
              </Text>
            </View>
          </View>
          <View style={styles.firstIcons}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-thunderstorm"
                size={24}
                style={{ margin: 20, color: "#3432a8" }}
              />

              <Text style={{ marginTop: 25, marginLeft: 15 }}>Ideas</Text>
            </View>
            <View style={styles.rightDisplay}>
              <Text style={{ color: "white" }}>
                {this.props.Wisdoms.ideas.length}
              </Text>
            </View>
          </View>
          <View style={styles.firstIcons}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-trending-up"
                size={24}
                style={{ margin: 20, color: "#3432a8" }}
              />

              <Text style={{ marginTop: 25, marginLeft: 15 }}>Goals</Text>
            </View>
            <View style={styles.rightDisplay}>
              <Text style={{ color: "white" }}>
                {this.props.Wisdoms.goals.length}
              </Text>
            </View>
          </View>
          <View style={styles.firstIcons}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-walk"
                size={24}
                style={{ margin: 20, color: "#3432a8" }}
              />

              <Text style={{ marginTop: 25, marginLeft: 15 }}>Motivation</Text>
            </View>
            <View style={styles.rightDisplay}>
              <Text style={{ color: "white" }}>
                {this.props.Wisdoms.motivations.length}
              </Text>
            </View>
          </View>
          <View style={styles.firstIcons}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-trophy"
                size={24}
                style={{ margin: 20, color: "#3432a8" }}
              />

              <Text style={{ marginTop: 25, marginLeft: 15 }}>Ambitions</Text>
            </View>
            <View style={styles.rightDisplay}>
              <Text style={{ color: "white" }}>
                {this.props.Wisdoms.ambitions.length}
              </Text>
            </View>
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
  },
  firstIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rightDisplay: {
    marginRight: 20,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#3432a8",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    Wisdoms: state.Wisdoms
  };
};

export default connect(mapStateToProps)(CustomDrawerLogo);
