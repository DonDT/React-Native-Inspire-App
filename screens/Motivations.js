import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import DisplayItems from "../components/DisplayItems";

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.motivations.length === 0
            ? "No Motivations to display yet"
            : this.props.motivations.map((item, index) => (
                <DisplayItems
                  wisdom={item}
                  key={index}
                  index={index}
                  showMoreIcon={false}
                  navigation={this.props.navigation}
                />
              ))}
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
    motivations: state.Wisdoms.motivations
  };
};

export default connect(mapStateToProps)(HomeScreen);
