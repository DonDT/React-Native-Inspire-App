import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  ScrollView
} from "react-native";
import DisplayItems from "../components/DisplayItems";
import { connect } from "react-redux";

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* <Text>Ideas Screen </Text>
        <Button
          onPress={() => this.props.navigation.navigate("ItemScreen")}
          title="Item"
        /> */}

          {this.props.ideas.length > 0
            ? this.props.ideas.map((item, index) => (
                <DisplayItems
                  wisdom={item}
                  key={index}
                  index={index}
                  showMoreIcon={false}
                  navigation={this.props.navigation}
                />
              ))
            : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    ideas: state.Wisdoms.ideas
  };
};

export default connect(mapStateToProps)(HomeScreen);
