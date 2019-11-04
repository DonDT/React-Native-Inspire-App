import React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

const FormInput = props => {
  let template = null;

  switch (props.type) {
    case "textInput":
      template = <TextInput {...props} />;
      break;

    default:
      return template;
  }

  return template;
};

const styles = StyleSheet.create({});

export default FormInput;
