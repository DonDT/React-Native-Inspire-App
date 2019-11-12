import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

class AuthCheckScreen extends Component {
  componentDidMount() {
    this.isUserLoggedIn();
  }

  isUserLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeScreen", { user: user });
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AuthCheckScreen;
