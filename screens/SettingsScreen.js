import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Text, StyleSheet, View, Button } from "react-native";

const SettingsScreen = props => {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();

      props.navigation.navigate("WellComeScreen");
    } catch (error) {
      alert("Error signin out, Try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signOutButton}>
        <Button title="Log Out" onPress={() => signOut()} color="gold" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signOutButton: {
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "gold",
    borderRadius: 15
  }
});

export default SettingsScreen;
