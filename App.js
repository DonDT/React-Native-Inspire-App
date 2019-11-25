import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./authentication/LoginScreen";
import WellComeScreen from "./screens/WellComeScreen";
import RegisterScreen from "./authentication/RegisterScreen";
import Goals from "./screens/Goals";
import Ambitions from "./screens/Ambitions";
import Ideas from "./screens/Ideas";
import Motivations from "./screens/Motivations";
import Profile from "./screens/Profile";
import News from "./screens/News";
import LifeStyle from "./screens/LifeStyle";
import ItemScreen from "./screens/ItemScreen";
import InputScreen from "./screens/InputScreen";

import CustomDrawerLogo from "./screens/DrawerNavItems/CustomDrawerLogo";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import reducers from "./store/reducers";

import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";
import AuthCheckScreen from "./screens/AuthCheckScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

class App extends Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };

  render() {
    return (
      <Provider store={createStoreWithMiddleware}>
        <View style={styles.container}>
          <ActionSheetProvider>
            <AppContainer />
          </ActionSheetProvider>
        </View>
      </Provider>
    );
  }
}

const LoginRegisterStack = createStackNavigator(
  {
    WellComeScreen: {
      screen: WellComeScreen,
      navigationOptions: {
        header: null
      }
    },
    LoginScreen: {
      screen: LoginScreen
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {}
    }
  },
  {
    mode: "modal"
  }
);

const MainBottomNavigation = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({}) => (
          <Ionicons name="ios-home" size={24} color="#3432a8" />
        )
      }
    },
    Ideas: {
      screen: Ideas,
      navigationOptions: {
        tabBarLabel: "Ideas",
        headerBackTitle: "Home",

        tabBarIcon: ({}) => (
          <Ionicons name="ios-thunderstorm" size={24} color="#3432a8" />
        )
      }
    },
    Goals: {
      screen: Goals,
      navigationOptions: {
        tabBarLabel: "Goals",
        tabBarIcon: ({}) => (
          <Ionicons name="ios-trending-up" size={24} color="#3432a8" />
        )
      }
    },
    Motivations: {
      screen: Motivations,
      navigationOptions: {
        tabBarLabel: "Motivation",
        tabBarIcon: ({}) => (
          <Ionicons name="ios-walk" size={24} color="#3432a8" />
        )
      }
    },
    Ambitions: {
      screen: Ambitions,
      navigationOptions: {
        tabBarLabel: "Ambitions",
        tabBarIcon: ({}) => (
          <Ionicons name="ios-trophy" size={24} color="#3432a8" />
        )
      }
    }
  },
  {}
);

MainBottomNavigation.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case "Home":
      return { headerTitle: "Home" };
    case "Ideas":
      return { headerTitle: "Ideas" };
    case "Goals":
      return { headerTitle: "Goals" };
    case "Motivations":
      return { headerTitle: "Motivations" };
    case "Ambitions":
      return { headerTitle: "Ambitions" };
    default:
      return null;
  }
};

const BottomStacknavigation = createStackNavigator({
  MainBottomNavigation: {
    screen: MainBottomNavigation,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            name="ios-menu"
            size={30}
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 10 }}
          />
        )
      };
    }
  },
  ItemScreen: {
    screen: ItemScreen,
    navigationOptions: () => ({
      headerBackTitle: "Home"
    })
  },
  InputScreen: {
    screen: InputScreen,
    navigationOptions: () => ({
      headerBackTitle: "Home"
    })
  }
});

const AppDrawerNavigation = createDrawerNavigator(
  {
    BottomStacknavigation: {
      screen: BottomStacknavigation,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />
      }
    },

    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profile",
        headerBackTitle: "Home",
        drawerIcon: () => <Ionicons name="ios-happy" size={24} />
      }
    },
    News: {
      screen: News,
      navigationOptions: {
        title: "News",
        drawerIcon: () => <Ionicons name="ios-chatboxes" size={24} />
      }
    },
    LifeStyle: {
      screen: LifeStyle,
      navigationOptions: {
        title: "LifeStyle",
        drawerIcon: () => <Ionicons name="ios-contacts" size={24} />
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />
      }
    }
  },
  {
    contentComponent: CustomDrawerLogo
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerIcons: {
    flexDirection: "row"
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  AuthCheckScreen,
  LoginRegisterStack,
  AppDrawerNavigation
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
