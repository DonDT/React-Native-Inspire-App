import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList
} from "react-native";
import * as firebase from "firebase";
import "firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { dataToArray } from "../utils/helperURLs";
import DisplayItems from "../components/DisplayItems";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import { compose } from "redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as ImageHandler from "../utils/handleImageFunction";
import "firebase/storage";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      detail: "",
      goalsCount: 0,
      ideasCount: 0,
      motivationsCount: 0,
      ambitionsCount: 0,
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

    this.props.loadWisdom(wisdoms.reverse());
    this.props.isLoading(false);
  };

  addData = async (title, detail) => {
    this.setState({
      title: "",
      detail: "",
      showInput: false,
      showIcons: true,
      showDeleteIcon: false,
      showAddIcon: false,
      showWisdoms: true
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
          .set({ title: title, detail: detail, category: "ideas", key: key });

        this.props.addWisdom({
          title: title,
          detail: detail,
          category: "home",
          key: key
        });
        //this.props.toggleIsLoadingBooks(false);
      }
    } catch (error) {
      console.log(error);
      //this.props.toggleIsLoadingBooks(false);
    }
    //}
  };

  handleChangeCategory = async (wisdom, category) => {
    try {
      await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .child(wisdom.key)
        .update({ category: category });

      //this.props.
    } catch (error) {
      console.log(error);
    }
    console.log(wisdom, category);
  };

  deleteItem = async (item, index) => {
    try {
      await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .child(item.key)
        .remove();

      this.props.deleteItem(item);
    } catch (error) {
      console.log(error);
    }
  };

  uploadImage = async (image, item) => {
    const ref = firebase
      .storage()
      .ref("wisdom")
      .child(this.state.currentUser.uid)
      .child(item.key);

    try {
      console.log("AA");
      const blob = await ImageHandler.prepareBlob(image.uri);
      console.log("A");
      //const snapshot = await ref.putString(blob);
      const snapshot = await ref.put(blob);
      let downloadUrl = await snapshot.ref.getDownloadURL();
      console.log("B");

      console.log("C");
      await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .child(item.key)
        .update({ image: downloadUrl });
      console.log("D");
      console.log(downloadUrl);

      blob.close();

      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  openImages = async item => {
    const result = await ImageHandler.openImages();

    if (result) {
      const downloadUrl = await this.uploadImage(result, item);

      this.props.updateImage({ ...item, uri: downloadUrl });
    }
  };

  openCamera = async item => {
    const result = await ImageHandler.openCamera();

    if (result) {
      const downloadUrl = await this.uploadImage(result, item);
      this.props.updateImage({ ...item, uri: downloadUrl });

      //this.props.updateBookImage({ ...item, uri: downloadUrl });
    }
  };

  handleImagePress = item => {
    const options = ["Select from photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2;
    console.log(item);
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        if (buttonIndex === 0) {
          this.openImages(item);
        } else if (buttonIndex === 1) {
          this.openCamera(item);
        }
      }
    );
  };

  renderItem = ({ item }, index) => {
    let swipeOutButtons = [
      {
        text: "Delete",
        component: (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="ios-trash" size={24} colors="white" />
          </View>
        ),
        backgroundColor: "#E6E6FA",
        onPress: () => this.deleteItem(item, index)
      }
    ];

    return (
      <View>
        <Swipeout
          backgroundColor={"#E6E6FA"}
          right={swipeOutButtons}
          autoClose={true}
          style={{
            marginHorizontal: 5,
            marginVertical: 5,
            borderRadius: 10
          }}
          key={index}
        >
          <DisplayItems
            wisdom={item}
            key={index}
            index={index}
            handleChangeCategory={this.handleChangeCategory}
            showMoreIcon={true}
            editable={true}
            handleImagePress={this.handleImagePress}
            navigation={this.props.navigation}
          />
        </Swipeout>
      </View>
    );
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
        <ScrollView>
          {this.state.showWisdoms && (
            <View>
              {/* {this.state.wisdom.length > 0
                ? this.state.wisdom.map((item, index) => (
                    <Swipeout
                      backgroundColor={"#E6E6FA"}
                      right={swipeOutButtons}
                      autoClose={true}
                      style={{
                        marginHorizontal: 5,
                        marginVertical: 5,
                        borderRadius: 10
                      }}
                      key={index}
                      
                    >
                      <DisplayItems
                        wisdom={item}
                        key={index}
                        index={index}
                        handleChangeCategory={this.handleChangeCategory}
                        showMoreIcon={true}
                        onPress={() => handleTrashIcon()}
                      />
                    </Swipeout>
                  ))
                : null} */}

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={this.props.Wisdoms.wisdoms}
                //renderItem={({ item }, index) => this.renderItem(item, index)}
                //ListEmptyComponent="No Data To Display!"
                renderItem={this.renderItem}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                getItemLayout={(item, index) => ({
                  length: 40,
                  offset: 40 * index,
                  index
                })}
              />
            </View>
          )}
        </ScrollView>
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

mapStateToProps = state => {
  return {
    Wisdoms: state.Wisdoms
  };
};

mapDispatchToProps = dispatch => {
  return {
    loadWisdom: wisdom =>
      dispatch({ type: "LOAD_ALL_ACTIONS_FROM_FIREBASE", payload: wisdom }),
    addWisdom: wisdom =>
      dispatch({
        type: "ADD_WISDOM",
        payload: wisdom
      }),
    isLoading: bool => dispatch({ type: "LOADING_DATA", payload: bool }),
    deleteItem: item => dispatch({ type: "DELETE_ITEM", payload: item }),
    updateImage: image => dispatch({ type: "UPDATE_IMAGE", payload: image })
  };
};

const wrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectActionSheet
);

export default wrapper(HomeScreen);
