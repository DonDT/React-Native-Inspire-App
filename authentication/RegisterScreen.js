import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ValidateForm from "../utils/forms/validateForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUp } from "../store/actions/users_actions";

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

  submitUserInfo = () => {
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
      this.props.signUp(formToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
  };

  formErrors = () =>
    this.state.formError ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Check your information</Text>
      </View>
    ) : null;

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
            />
          </View>
          <View style={styles.CreateText}>
            <Button
              style={{ color: "#3432a8" }}
              title="Login"
              onPress={() => this.props.navigation.navigate("LoginScreen")}
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
    padding: 13
  },
  errorMessage: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  }
});

const mapStateToProps = state => {
  return {
    User: state.User
  };
};

const mapDispatchActionToProps = dispatch => {
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchActionToProps
)(RegisterScreen);