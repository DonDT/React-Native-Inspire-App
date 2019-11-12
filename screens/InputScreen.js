import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

class InputScreen extends Component {
  render() {
    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            {
              marginTop: 20,
              borderBottomColor: "gold",
              borderBottomWidth: 0.8,
              paddingBottom: 20
            }
          ]}
          autoCapitalize={"none"}
          placeholder="Title "
          placeholderTextColor="gold"

          //value={this.state.form.email.value}
          //onChangeText={value => this.onInputChange("email", value)}
        />
        <TextInput
          style={[styles.textInput, { marginTop: 20 }]}
          autoCapitalize={"none"}
          placeholder="Wisdom "
          placeholderTextColor="gold"
          multiline={true}
          numberOfLines={30}
          //value={this.state.form.email.value}
          //onChangeText={value => this.onInputChange("email", value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    fontSize: 15,
    padding: 5
  }
});

export default InputScreen;
