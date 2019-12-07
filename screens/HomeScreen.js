import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  InteractionManager,
  Platform,
  Animated
} from "react-native";

import * as firebase from "firebase";
import "firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { dataToArray } from "../utils/helperURLs";
import DisplayItems from "../components/DisplayItems";
import { connect } from "react-redux";
import { compose } from "redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as ImageHandler from "../utils/handleImageFunction";
import * as Animatable from "react-native-animatable";
import { SwipeListView } from "react-native-swipe-list-view";
import "firebase/storage";
import ActionButton from "../components/actionButton";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      detail: "",
      wisdom: [],
      isLoadingData: false,
      showInput: false,
      showIcons: true,
      showDeleteIcon: false,
      showWisdoms: true,
      currentUser: {},
      showAddIcon: false,
      searchTerm: "",
      searchedItems: [],
      upDateIsActive: false,
      keyOfItemToUpdate: "",
      categoryOfItemToUpdate: "",
      noDataFoundOrSearchTermEmpty: false,
      slowFadeOutSearchInput: true
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

  componentDidUpdate() {
    if (
      this.state.searchTerm.trim() === "" &&
      this.state.searchedItems.length > 0
    ) {
      this.setState({
        searchedItems: []
      });
    }
  }

  addData = async (title, detail) => {
    this.setState({
      title: "",
      detail: "",
      showInput: false,
      showIcons: true,
      showDeleteIcon: false,
      showAddIcon: false,
      showWisdoms: true,
      showSearchInput: false
    });
    this.textInputRef.setNativeProps({ title: "", detail: "" });

    // Checking if data already exist before adding to database.
    this.setState({ isLoadingData: true });
    if (title.trim() !== "" && detail.trim() !== "") {
      try {
        const snapshot = await firebase
          .database()
          .ref("wisdom")
          .child(this.state.currentUser.uid)
          .orderByChild("title")
          .equalTo(title)
          .once("value");
        if (snapshot.exists()) {
          alert("Unable to add, as book already exists");
        } else {
          const key = await firebase
            .database()
            .ref("wisdom")
            .child(this.state.currentUser.uid)
            .push().key;
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
          this.setState({
            isLoadingData: false
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      null;
    }
  };

  handleChangeCategory = async (wisdom, category) => {
    this.setState({
      isLoadingData: true
    });
    try {
      await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .child(wisdom.key)
        .update({ category: category });

      this.setState({ isLoadingData: false });
    } catch (error) {
      console.log(error);
    }
  };

  deleteItem = async (item, index) => {
    this.setState({
      isLoadingData: true
    });
    try {
      await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .child(item.key)
        .remove();

      this.props.deleteItem(item);

      this.setState({ isLoadingData: false });
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
      const blob = await ImageHandler.prepareBlob(image.uri);
      const snapshot = await ref.put(blob);
      let downloadUrl = await snapshot.ref.getDownloadURL();

      await firebase
        .database()
        .ref("wisdom")
        .child(this.state.currentUser.uid)
        .child(item.key)
        .update({ image: downloadUrl });

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
    }
  };

  handleImagePress = item => {
    const options = ["Select from photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2;
    //console.log(item);
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

  handleSearchData = () => {
    const itemsToDisplay = this.props.Wisdoms.wisdoms.filter(wisdom =>
      wisdom.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    this.setState(
      {
        searchedItems: [itemsToDisplay]
      },
      () => {
        if (itemsToDisplay.length === 0) {
          this.setState({
            noDataFoundOrSearchTermEmpty: true
          });
        }
      }
    );

    setTimeout(() => {
      this.setState({ noDataFoundOrSearchTermEmpty: false });
    }, 2000);
  };

  handleUpdateText = data => {
    this.setState(
      {
        showInput: !this.state.showInput,
        showWisdoms: false,
        title: data.title,
        detail: data.detail,
        keyOfItemToUpdate: data.key,
        categoryOfItemToUpdate: data.category
      },
      () => {
        this.setState({
          showIcons: !this.state.showIcons,
          showDeleteIcon: true,
          showAddIcon: true,
          upDateIsActive: true
        });
      }
    );
  };

  UpdateData = async (title, detail) => {
    let ObjectToDelete = {
      title: title,
      detail: detail,
      category: this.state.categoryOfItemToUpdate,
      key: this.state.keyOfItemToUpdate
    };
    try {
      this.deleteItem(ObjectToDelete);
      this.addData(title, detail);
      this.setState({
        upDateIsActive: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  handldeCloseSearchInput = () => {
    this.setState(
      {
        slowFadeOutSearchInput: false
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              showSearchInput: false,
              showIcons: true,
              searchTerm: ""
            },
            () => {
              this.setState({
                slowFadeOutSearchInput: true
              });
            }
          );
        }, 1000);
      }
    );
  };

  handleButtonAction = () => {
    this.setState({
      showInput: false,
      showDeleteIcon: false,
      showIcons: true,
      showWisdoms: true,
      showAddIcon: false,
      title: "",
      detail: ""
    });
  };

  handleButtonPlus = () => {
    this.state.upDateIsActive
      ? this.UpdateData(this.state.title, this.state.detail)
      : this.addData(this.state.title, this.state.detail);
  };

  render() {
    // This entire code is to fix a timer error
    const _setTimeout = global.setTimeout;
    const _clearTimeout = global.clearTimeout;
    const MAX_TIMER_DURATION_MS = 60 * 1000;
    if (Platform.OS === "android") {
      const timerFix = {};
      const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
          InteractionManager.runAfterInteractions(() => {
            if (!timerFix[id]) {
              return;
            }
            delete timerFix[id];
            fn(...args);
          });
          return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
      };

      global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
          const ttl = Date.now() + time;
          const id = "_lt_" + Object.keys(timerFix).length;
          runTask(id, fn, ttl, args);
          return id;
        }
        return _setTimeout(fn, time, ...args);
      };

      global.clearTimeout = id => {
        if (typeof id === "string" && id.startsWith("_lt_")) {
          _clearTimeout(timerFix[id]);
          delete timerFix[id];
          return;
        }
        _clearTimeout(id);
      };
    }
    // Up till here

    return (
      <SafeAreaView>
        {this.state.showSearchInput && (
          <Animatable.View
            animation={
              this.state.slowFadeOutSearchInput ? "slideInDown" : "fadeOutUp"
            }
          >
            <View style={styles.searchView}>
              <TextInput
                autoCapitalize={"none"}
                placeholder="Enter search term "
                placeholderTextColor="gold"
                name="search"
                //autoComplete={false}
                autoCorrect={false}
                spellCheck={false}
                style={[
                  styles.textInput,
                  {
                    marginTop: 20,
                    borderBottomColor: "gold",
                    borderBottomWidth: 0.8,
                    height: 30
                  }
                ]}
                onChangeText={value =>
                  this.setState({ searchTerm: value }, () => {
                    this.handleSearchData;
                  })
                }
                ref={component => {
                  this.textInputRef = component;
                }}
              />
              <Ionicons
                name="ios-send"
                size={25}
                color={"gold"}
                onPress={() => this.handleSearchData()}
                style={{ marginTop: 20 }}
              />
              <Ionicons
                name="ios-close"
                size={32}
                color={"gold"}
                onPress={() => this.handldeCloseSearchInput()}
                style={{ marginTop: 20 }}
              />
            </View>
          </Animatable.View>
        )}

        {this.state.noDataFoundOrSearchTermEmpty && (
          <Animatable.View animation={"slideInLeft"}>
            <View style={styles.noDataMessage}>
              <Text style={{ color: "gold" }}>No Data Matched Search Term</Text>
            </View>
          </Animatable.View>
        )}

        {this.state.showIcons && (
          <Animatable.View animation={"slideInRight"}>
            <View style={styles.headerIcons}>
              <View
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "row"
                }}
              >
                <Ionicons
                  name="ios-create"
                  size={28}
                  color={"gold"}
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
                  color={"gold"}
                  size={28}
                  style={{ marginRight: 10 }}
                  onPress={() =>
                    this.setState({ showSearchInput: true, showIcons: false })
                  }
                />
              </View>
            </View>
          </Animatable.View>
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
                  }
                ]}
                autoCapitalize={"none"}
                placeholder="Title "
                placeholderTextColor="gold"
                name="title"
                //autoComplete={false}
                autoCorrect={false}
                spellCheck={false}
                value={this.state.title}
                onChangeText={value => this.setState({ title: value })}
                ref={component => {
                  this.textInputRef = component;
                }}
              />
              <TextInput
                name="detail"
                style={[
                  styles.textInput,
                  {
                    marginTop: 20,
                    height: Platform.OS === "ios" ? 500 : 50
                  }
                ]}
                autoCapitalize={"none"}
                value={this.state.detail}
                placeholder="Wisdom "
                placeholderTextColor="gold"
                multiline
                editable
                numberOfLines={10}
                onChangeText={value => this.setState({ detail: value })}
                //autoComplete={false}
                autoCorrect={false}
                spellCheck={false}
                ref={component => {
                  this.textInputRef = component;
                }}
              />
            </View>
          )}
        </View>
        {this.state.showAddIcon && (
          <ActionButton
            position="right"
            action="+"
            onPress={this.handleButtonPlus}
          />
        )}
        <ScrollView>
          {this.state.showWisdoms && (
            <View>
              <SwipeListView
                data={
                  this.state.searchTerm.trim() !== ""
                    ? this.state.searchedItems[0]
                    : this.props.Wisdoms.wisdoms
                }
                renderItem={(data, rowMap) => (
                  <View style={styles.rowFront}>
                    <DisplayItems
                      wisdom={data.item}
                      key={data.item.title}
                      handleChangeCategory={this.handleChangeCategory}
                      showMoreIcon={true}
                      editable={true}
                      handleImagePress={this.handleImagePress}
                      navigation={this.props.navigation}
                    />
                  </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.rowBack}>
                    <View style={{ flexDirection: "column" }}>
                      <Ionicons
                        name="ios-aperture"
                        size={24}
                        color="#3432a8"
                        onPress={() => this.handleUpdateText(data.item)}
                        style={{ marginLeft: 15 }}
                      />
                      <Text style={styles.updateText}>Update</Text>
                    </View>
                    <Ionicons
                      name="ios-trash"
                      size={24}
                      color="#3432a8"
                      onPress={() => this.deleteItem(data.item)}
                    />
                  </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
              />
            </View>
          )}
        </ScrollView>
        {this.state.showDeleteIcon && (
          <ActionButton
            position="left"
            action="x"
            onPress={this.handleButtonAction}
          />
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
    width: "70%",
    fontSize: 15,
    paddingLeft: 4
  },
  inputContainer: {
    alignItems: "center"
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
    marginLeft: 10
  },

  searchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20
  },
  rowFront: {
    alignItems: "center",
    justifyContent: "center"
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15
  },
  updateText: {
    color: "#3432a8"
  },
  noDataMessage: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
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
