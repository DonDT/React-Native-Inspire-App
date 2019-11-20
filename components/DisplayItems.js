import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

class DisplayItems extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            source={require("../assets/rose-blue-flower.jpeg")}
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.textSection}>
          <View style={styles.titleAndIcon}>
            <Text style={styles.titleText}>{this.props.wisdom.title}</Text>
            <Ionicons
              name="ios-more"
              size={25}
              style={{ marginRight: 10 }}
              onPress={() => this.setState({ isModalVisible: true })}
            />
            <Modal
              isVisible={this.state.isModalVisible}
              animationIn="fadeInRight"
              animationOut="fadeOutRight"
              animationOutTiming={500}
            >
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
                    width: "100%",
                    height: 80
                  }}
                >
                  <Text>Change Category</Text>
                  <Text style={{ marginTop: 15 }}>Add To</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                  }}
                >
                  <Ionicons name="ios-home" size={24} color="#3432a8" />
                  <Ionicons name="ios-thunderstorm" size={24} color="#3432a8" />
                  <Ionicons name="ios-trending-up" size={24} color="#3432a8" />
                  <Ionicons name="ios-walk" size={24} color="#3432a8" />
                  <Ionicons name="ios-trophy" size={24} color="#3432a8" />
                </View>
                <Button title="Close" onPress={() => this.toggleModal()} />
              </View>
            </Modal>
          </View>

          <Text style={styles.textDetails}>{this.props.wisdom.detail}</Text>
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
    marginVertical: 15
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
    marginBottom: 10
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
    maxHeight: 90,
    overflow: "hidden"
  },
  titleAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 17
  }
});

export default DisplayItems;
