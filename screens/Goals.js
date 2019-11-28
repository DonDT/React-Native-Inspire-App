import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import DisplayItems from "../components/DisplayItems";

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {!this.props.goals ? (
            <View styles={styles.noItemStyle}>
              <Text>No Goals to display yet</Text>
            </View>
          ) : (
            this.props.goals.map((item, index) => (
              <DisplayItems
                wisdom={item}
                key={index}
                index={index}
                showMoreIcon={false}
                navigation={this.props.navigation}
              />
            ))
          )}
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
  },
  noItemStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    goals: state.Wisdoms.goals
  };
};

export default connect(mapStateToProps)(HomeScreen);
