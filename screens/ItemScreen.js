import React, { Component } from "react";
import * as Font from "expo-font";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";

import { connect } from "react-redux";

class ItemScreen extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Baskervville: require("../assets/fonts/Baskervville-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const wisdomKey = this.props.navigation.state.params.wisdom.wisdom.key;
    const item = this.props.Wisdom.filter(item => item.key === wisdomKey);

    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.fontLoaded && (
            <Animatable.Text animation={"zoomInUp"}>
              <Text style={styles.titleText}>{item[0].title}</Text>
            </Animatable.Text>
          )}
          {item[0].image ? (
            <Animatable.View animation={"zoomInDown"} delay={300}>
              <Image source={{ uri: item[0].image }} style={styles.image} />
            </Animatable.View>
          ) : (
            <Animatable.View animation={"zoomInDown"}>
              <Image
                source={require("../assets/rose-blue-flower.jpeg")}
                style={styles.image}
              />
            </Animatable.View>
          )}
          <Animatable.View animation={"zoomInLeft"}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>
                <Text style={{ color: "pink", fontSize: 15 }}>Category: </Text>

                {item[0].category.toUpperCase()}
              </Text>
            </View>
          </Animatable.View>
          <View style={styles.detailText}>
            {this.state.fontLoaded && (
              <Animatable.Text animation={"zoomInRight"}>
                <Text style={{ color: "#707C80", fontFamily: "Baskervville" }}>
                  {item[0].detail}
                </Text>
              </Animatable.Text>
            )}
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
    marginTop: 15,
    fontFamily: "Baskervville"
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
