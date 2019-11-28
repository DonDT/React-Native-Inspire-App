import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import Modal from "react-native-modal";
import { connect } from "react-redux";
import ImageProgress from "react-native-image-progress";
import ProgressPie from "react-native-progress/Pie";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";

class DisplayItems extends React.PureComponent {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleChange = (item, cat) => {
    this.props.handleChangeCategory(item, cat);
    this.toggleModal();

    switch (cat) {
      case "ideas":
        return this.props.changeToIdeas("ideas");
      case "goals":
        return this.props.changeToGoals("goals");
      case "motivations":
        return this.props.changeToMotivations("motivations");
      case "ambitions":
        return this.props.changeToAmbitions("ambitions");

      default:
        return cat;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.handleImagePress(this.props.wisdom)}
          disabled={!this.props.editable}
        >
          {this.props.wisdom.image ? (
            <ImageProgress
              source={{ uri: this.props.wisdom.image }}
              style={styles.image}
              indicator={ProgressPie}
              indicatorProps={{
                size: 40,
                borderWidth: 0,
                color: "#E6E6FA",
                unfilledColor: "white"
              }}
              imageStyle={{ borderRadius: 25 }}
            />
          ) : (
            <Image
              source={require("../assets/rose-blue-flower.jpeg")}
              style={styles.image}
            />
          )}
        </TouchableOpacity>

        <View style={styles.textSection}>
          <View style={styles.titleAndIcon}>
            <Text style={styles.titleText}>{this.props.wisdom.title}</Text>
            <View style={styles.viewText}>
              <Text
                style={styles.viewButton}
                onPress={() =>
                  this.props.navigation.navigate("ItemScreen", {
                    wisdom: this.props
                  })
                }
              >
                View
              </Text>
            </View>
            {this.props.showMoreIcon && (
              <Ionicons
                name="ios-more"
                size={25}
                style={{ marginRight: 10 }}
                onPress={() => this.setState({ isModalVisible: true })}
              />
            )}

            <Modal
              visible={this.state.isModalVisible}
              modalAnimation={
                new SlideAnimation({
                  slideFrom: "bottom"
                })
              }
              width={0.8}
              height={0.2}
            >
              <ModalContent>
                <View
                  style={{
                    height: 180,
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: 5
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 25
                    }}
                  >
                    <Text style={{ color: "#3432a8" }}>
                      Choose New Category
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center"
                    }}
                  >
                    <View style={styles.changeIcon}>
                      <Ionicons
                        name="ios-home"
                        size={24}
                        color="#3432a8"
                        onPress={() =>
                          this.handleChange(this.props.wisdom, "home")
                        }
                      />
                    </View>
                    <View style={styles.changeIcon}>
                      <Ionicons
                        name="ios-thunderstorm"
                        size={24}
                        color="#3432a8"
                        onPress={() =>
                          this.handleChange(this.props.wisdom, "ideas")
                        }
                      />
                    </View>
                    <View style={styles.changeIcon}>
                      <Ionicons
                        name="ios-trending-up"
                        size={24}
                        color="#3432a8"
                        onPress={() =>
                          this.handleChange(this.props.wisdom, "goals")
                        }
                      />
                    </View>
                    <View style={styles.changeIcon}>
                      <Ionicons
                        name="ios-walk"
                        size={24}
                        color="#3432a8"
                        onPress={() =>
                          this.handleChange(this.props.wisdom, "motivations")
                        }
                      />
                    </View>
                    <View style={styles.changeIcon}>
                      <Ionicons
                        name="ios-trophy"
                        size={24}
                        color="#3432a8"
                        onPress={() =>
                          this.handleChange(this.props.wisdom, "ambitions")
                        }
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Button
                      title="Close"
                      onPress={() => this.toggleModal()}
                      color={"pink"}
                    />
                  </View>
                </View>
              </ModalContent>
            </Modal>
          </View>

          <Text numberOfLines={3}>{this.props.wisdom.detail}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 90,
    marginVertical: 10,
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    padding: 10
  },
  image: {
    flex: 1,
    height: 90,
    width: 90,
    marginLeft: 10,
    borderRadius: 25
  },
  titleText: {
    fontSize: 18,
    marginBottom: 7
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
    maxHeight: 90,
    paddingRight: 15
  },
  titleAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5
  },
  viewButton: {
    fontSize: 15,
    padding: 5,
    color: "#3432a8"
  },
  viewText: {
    marginLeft: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#3432a8",
    backgroundColor: "pink"
  },
  changeIcon: {
    width: 35,
    height: 35,
    borderWidth: 0.5,
    borderColor: "pink",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    Wisdom: state.Wisdom
  };
};

const mapDispatchActionToProps = dispatch => {
  return {
    changeToIdeas: item => dispatch({ type: "CHANGE_TO_IDEAS", payload: item }),
    changeToGoals: item => dispatch({ type: "CHANGE_TO_GOALS", payload: item }),
    changeToMotivations: item =>
      dispatch({ type: "CHANGE_TO_MOTIVATIONS", payload: item }),
    changeToAmbitions: item =>
      dispatch({ type: "CHANGE_TO_AMBITIONS", payload: item })
  };
};

export default connect(mapStateToProps, mapDispatchActionToProps)(DisplayItems);
