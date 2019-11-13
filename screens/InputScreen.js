import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import HomeScreen from "./Goals";

class InputScreen extends Component {
  state = {
    title: "",
    detail: "",
    showDetail: false
  };

  render() {
    return (
      <View>
        {this.state.showDetail && (
          <HomeScreen title={this.state.title} detail={this.state.detail} />
        )}
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
          name="title"
          onChangeText={value => this.setState({ title: value })}
        />
        <TextInput
          name="detail"
          style={[styles.textInput, { marginTop: 20 }]}
          autoCapitalize={"none"}
          placeholder="Wisdom "
          placeholderTextColor="gold"
          multiline={true}
          numberOfLines={30}
          onChangeText={value => this.setState({ detail: value })}
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
