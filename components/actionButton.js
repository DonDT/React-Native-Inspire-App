import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import * as Animatable from "react-native-animatable";

const ActionButton = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={[
          styles.button1,
          {
            left: props.position === "left" ? 20 : null,
            right:
              props.position === "right"
                ? Platform.OS === "ios"
                  ? 20
                  : -350
                : null
          }
        ]}
      >
        <Animatable.View
          animation={props.action === "x" ? "slideInLeft" : "slideInRight"}
        >
          <Text style={{ fontSize: 26, color: "#3432a8" }}>{props.action}</Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button1: {
    width: 50,
    height: 50,
    backgroundColor: "gold",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: Platform.OS === "ios" ? "absolute" : "relative",
    top: Platform.OS === "ios" ? 500 : 400
  }
});

export default ActionButton;
