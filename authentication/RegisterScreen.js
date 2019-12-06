import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ValidateForm from "../utils/forms/validateForm";
import * as Animatable from "react-native-animatable";

import * as firebase from "firebase/app";
import "firebase/auth";

class RegisterScreen extends Component {
  state = {
    type: "Register",
    formError: false,
    form: {
      name: {
        value: "",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true
        }
      },
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
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textInput",
        rules: {
          confirmPW: "password"
        }
      }
    },
    isLoadingData: false
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

  submitUserInfo = async () => {
    let isFormValid = true;
    let formToSubmit = {};

    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      if (formToSubmit[key] !== "confirmPassword") {
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      this.setState({
        isLoadingData: true
      });

      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            formToSubmit.email,
            formToSubmit.password
          );
        if (response) {
          this.setState({
            isLoadingData: false
          });
          this.props.navigation.navigate("HomeScreen");
        }
      } catch (error) {
        this.setState({
          isLoadingData: false
        });
        console.log(error);
        if (error.code == "auth/email-already-in-use") {
          alert("User Already Exist, Try Loging in Again");
        }
      }
      //console.log(formToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
  };

  formErrors = () =>
    this.state.formError ? (
      <Animatable.View animation={"fadeInDown"} delay={400}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>Check your information</Text>
        </View>
      </Animatable.View>
    ) : null;

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoadingData ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000
              }
            ]}
          >
            <ActivityIndicator size="large" color={"#3432a8"} />
          </View>
        ) : null}
        <Animatable.View animation={"slideInLeft"}>
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
              <TextInput
                autoCapitalize={"none"}
                placeholder="Name"
                placeholderTextColor="#cecece"
                style={styles.textInput}
                //type={this.state.form.name.type}
                value={this.state.form.name.value}
                onChangeText={value => this.onInputChange("name", value)}
              />
              <TextInput
                autoCapitalize={"none"}
                placeholder="Email"
                placeholderTextColor="#cecece"
                style={styles.textInput}
                value={this.state.form.email.value}
                onChangeText={value => this.onInputChange("email", value)}
              />
              <TextInput
                autoCapitalize={"none"}
                placeholder="Password"
                placeholderTextColor="#cecece"
                style={styles.textInput}
                value={this.state.form.password.value}
                onChangeText={value => this.onInputChange("password", value)}
                secureTextEntry
              />
              <TextInput
                autoCapitalize={"none"}
                placeholder="Confirm Password"
                placeholderTextColor="#cecece"
                style={styles.textInput}
                value={this.state.form.confirmPassword.value}
                onChangeText={value =>
                  this.onInputChange("confirmPassword", value)
                }
                secureTextEntry
              />
              {this.formErrors()}
            </View>
            <View style={styles.LoginText}>
              <Button
                style={{ color: "white" }}
                title="Create Account "
                onPress={() => this.submitUserInfo()}
                color={Platform.OS === "android" ? "#3432a8" : "white"}
              />
            </View>
            <View style={styles.CreateText}>
              <Button
                style={{ color: "#3432a8" }}
                title="Login"
                onPress={() => this.props.navigation.navigate("LoginScreen")}
                color={Platform.OS === "android" ? "#3432a8" : "#3432a8"}
              />
            </View>
          </View>
        </Animatable.View>
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
    height: 500,
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
    backgroundColor: Platform.OS === "ios" ? "white" : "#3432a8"
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
    padding: 13
  },
  errorMessage: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

export default RegisterScreen;
