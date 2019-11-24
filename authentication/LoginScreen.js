import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormInput from "../utils/forms/formInput";
import ValidateForm from "../utils/forms/validateForm";

import * as firebase from "firebase/app";
import "firebase/auth";
import AuthCheckScreen from "../screens/AuthCheckScreen";

class LoginScreen extends Component {
  state = {
    type: "Login",
    formError: false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true,
          isValidEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true,
          minLength: 8
        }
      }
    }
  };

  onInputChange = (name, value) => {
    this.setState({
      formError: false
    });
    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidateForm(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };

  formErrors = () =>
    this.state.formError ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Check your information</Text>
      </View>
    ) : null;

  submitUserInfo = async () => {
    let isFormValid = true;
    let formToSubmit = {};

    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;

      formToSubmit[key] = formCopy[key].value;
    }

    if (isFormValid) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(
            formToSubmit.email,
            formToSubmit.password
          );
        if (response) {
          this.setState({
            isLoading: false
          });
          this.props.navigation.navigate("AuthCheckScreen");
        }
      } catch (error) {
        this.setState({
          isLoading: false
        });
        if (error.code === "auth/user-not-found") {
          alert("User with that credentials does not exists, try signing up");
        }
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputLogin}>
          <View style={styles.topLogin}>
            <View>
              <Ionicons name="ios-power" size={24} color="#3432a8" />
            </View>

            <View>
              <Text style={{ color: "#3432a8", marginLeft: 125 }}>
                Tenaciuos{" "}
              </Text>
            </View>
          </View>
          <View>
            <FormInput
              autoCapitalize={"none"}
              placeholder="Email"
              placeholderTextColor="#cecece"
              style={styles.textInput}
              type={this.state.form.email.type}
              value={this.state.form.email.value}
              onChangeText={value => this.onInputChange("email", value)}
            />
            <FormInput
              autoCapitalize={"none"}
              placeholder="Password"
              placeholderTextColor="#cecece"
              style={styles.textInput}
              type={this.state.form.password.type}
              value={this.state.form.password.value}
              onChangeText={value => this.onInputChange("password", value)}
              secureTextEntry
            />
          </View>
          {this.formErrors()}
          <View style={styles.LoginText}>
            <Button
              style={{ color: "white" }}
              title="Login "
              //onPress={() => this.props.navigation.navigate("HomeScreen")}
              onPress={() => this.submitUserInfo()}
            />
          </View>
          <View style={styles.CreateText}>
            <Button
              style={{ color: "#3432a8" }}
              title="Create Account"
              onPress={() => this.props.navigation.navigate("RegisterScreen")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2
  },
  textInput: {
    width: 220,
    borderBottomWidth: 0.8,
    fontSize: 15,
    borderBottomColor: "#3432a8",
    padding: 5,
    marginTop: 10
  },
  LoginText: {
    marginTop: 45,
    width: 220,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#3432a8",
    alignItems: "center",
    justifyContent: "center"
  },
  inputLogin: {
    width: 275,
    height: 450,
    borderWidth: 1,
    borderColor: "#cecece",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
    //elevation: 1
  },
  CreateText: {
    marginTop: 45,
    width: 220,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#3432a8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  topLogin: {
    flexDirection: "row",
    //alignItems: "stretch",
    marginBottom: 35
  },
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "pink",
    padding: 13,
    borderRadius: 25
  },
  errorMessage: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

export default LoginScreen;
