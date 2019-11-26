import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import DisplayItems from "../components/DisplayItems";

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.ambitions.length === 0
            ? "No Ambitions to Display"
            : this.props.ambitions.map((item, index) => (
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
    ambitions: state.Wisdoms.ambitions
  };
};

export default connect(mapStateToProps)(HomeScreen);
