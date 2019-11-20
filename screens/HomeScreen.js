import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  FlatList
} from "react-native";
import Goals from "./Goals";
import Ideas from "./Ideas";
import Motivation from "./Motivations";
import Ambitions from "./Ambitions";
import InputScreen from "./InputScreen";
import * as firebase from "firebase";
import "firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { dataToArray } from "../utils/helperURLs";
import DisplayItems from "../components/DisplayItems";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      detail: "",
      goals: 0,
      ideas: 0,
      motivations: 0,
      ambitions: 0,
      wisdom: [],
      goals: [],
      ideas: [],
      motivations: [],
      ambitions: [],
      showInput: false,
      showIcons: true,
      showDeleteIcon: false,
      showWisdoms: true,
      currentUser: {},
      showAddIcon: false
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    const user = navigation.getParam("user");
    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    const wisdom = await firebase
      .database()
      .ref("wisdom")
      .child(user.uid)
      .once("value");

    const wisdoms = dataToArray(wisdom);

    this.setState({
      currentUser: currentUserData.val(),
      wisdom: wisdoms
    });
    // Update other sate events
  };

  addData = async (title, detail) => {
    this.setState({
      title: "",
      detail: "",
      showInput: false,
      showIcons: true,
      showDeleteIcon: false
    });
    this.textInputRef.setNativeProps({ title: "", detail: "" });
    console.log(title, detail);
    // Checking if data already exist before adding to database.
    //this.props.toggleIsLoadingBooks(true);
    try {
      const snapshot = await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .orderByChild("title")
        .equalTo(title)
        .once("value");
      if (snapshot.exists()) {
        alert("Unable to add as book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("wisdom")
          .child(this.state.currentUser.uid)
          .push().key;
        console.log(this.state.currentUser.uid);
        await firebase
          .database()
          .ref("wisdom")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ title: title, detail: detail, category: "ideas" });

        this.props.addBook({ title: title, detail: detail, category: "ideas" });
        //this.props.toggleIsLoadingBooks(false);
      }
    } catch (error) {
      console.log(error);
      //this.props.toggleIsLoadingBooks(false);
    }
    //}
  };

  render() {
    return (
      <SafeAreaView>
        {this.state.showIcons && (
          <View style={styles.headerIcons}>
            <Ionicons
              name="ios-list"
              size={28}
              styles={{ justifyContent: "flex-start" }}
            />
            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
              <Ionicons
                name="ios-create"
                size={28}
                onPress={() =>
                  this.setState(
                    {
                      showInput: !this.state.showInput,
                      showWisdoms: false
                    },
                    () => {
                      this.setState({
                        showIcons: !this.state.showIcons,
                        showDeleteIcon: true,
                        showAddIcon: true
                      });
                    }
                  )
                }
                style={{ marginRight: 15 }}
              />
              <Ionicons
                name="ios-search"
                size={28}
                onPress={() => navigation.openDrawer()}
                style={{ marginRight: 10 }}
              />
            </View>
          </View>
        )}
        <View style={styles.container}>
          {this.state.showInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    marginTop: 20,
                    borderBottomColor: "gold",
                    borderBottomWidth: 0.8,
                    height: 30
                    //paddingBottom: 1
                  }
                ]}
                autoCapitalize={"none"}
                placeholder="Title "
                placeholderTextColor="gold"
                name="title"
                onChangeText={value => this.setState({ title: value })}
                ref={component => {
                  this.textInputRef = component;
                }}
              />
              <TextInput
                name="detail"
                style={[styles.textInput, { marginTop: 20, height: 500 }]}
                autoCapitalize={"none"}
                placeholder="Wisdom "
                placeholderTextColor="gold"
                multiline
                editable
                numberOfLines={10}
                onChangeText={value => this.setState({ detail: value })}
                ref={component => {
                  this.textInputRef = component;
                }}
              />
            </View>
          )}
        </View>
        {this.state.showAddIcon && (
          <View>
            <TouchableOpacity>
              <View style={styles.button}>
                <Button
                  title="+"
                  style={styles.textStyle}
                  onPress={() =>
                    this.addData(this.state.title, this.state.detail)
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {this.state.showWisdoms && (
          <View>
            {this.state.wisdom.length > 0
              ? this.state.wisdom.map((item, index) => (
                  <DisplayItems wisdom={item} key={index} />
                ))
              : null}
          </View>
        )}

        {this.state.showDeleteIcon && (
          <TouchableOpacity>
            <View style={styles.button1}>
              <Button
                title="X"
                style={styles.textStyle}
                onPress={() =>
                  this.setState({
                    showInput: false,
                    showDeleteIcon: false,
                    showIcons: true,
                    showWisdoms: true,
                    showAddIcon: false
                  })
                }
              />
            </View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    flexDirection: "row",
    width: "100%",
    fontSize: 15,
    paddingLeft: 4
  },
  inputContainer: {},
  button: {
    width: 50,
    height: 50,
    backgroundColor: "gold",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    top: 500
  },
  textStyle: {
    fontSize: 50
  },
  headerIcons: {
    flexDirection: "row",
    //alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10
  },
  button1: {
    width: 50,
    height: 50,
    backgroundColor: "gold",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 20,
    top: 500
  }
});

export default HomeScreen;
