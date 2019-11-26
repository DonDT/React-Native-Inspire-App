import React, { Component } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

import { connect } from "react-redux";

class ItemScreen extends Component {
  render() {
    const wisdomKey = this.props.navigation.state.params.wisdom.wisdom.key;
    //console.log(this.props.navigation.state.params.wisdom.wisdom);
    const item = this.props.Wisdom.filter(item => item.key === wisdomKey);
    //console.log(item[0].image);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>{item[0].title}</Text>
          <Image source={{ uri: item[0].image }} style={styles.image} />

          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>
              <Text style={{ color: "pink", fontSize: 15 }}>Category: </Text>

              {item[0].category.toUpperCase()}
            </Text>
          </View>
          <View style={styles.detailText}>
            <Text style={{ color: "#707C80" }}>{item[0].detail}</Text>
          </View>
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
  image: {
    width: 300,
    height: 400,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 25
  },
  detailText: {
    width: 310,
    padding: 2,
    height: 150,
    //marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#E6E6FA",
    justifyContent: "flex-start"
  },
  titleText: {
    fontSize: 35,
    color: "gold",
    marginTop: 15
  },
  categoryView: {
    marginTop: 20,
    marginBottom: 20
  },
  categoryText: {
    fontSize: 10,
    color: "#707C80"
  }
});

const mapStateToProps = state => {
  return {
    Wisdom: state.Wisdoms.wisdoms
  };
};

export default connect(mapStateToProps)(ItemScreen);
