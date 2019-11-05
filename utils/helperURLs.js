import { AsyncStorage } from "react-native";

export const FIREBASEURL = `https://motivations-app.firebaseio.com`;
export const APIKEY = `AIzaSyARaxpnXJmxH_mTU0daL8EXXqZElpyIYBU`;
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const setTokens = (values, cbFunction) => {
  AsyncStorage.multiSet([
    ["@motivations@token", values.token],
    ["@motivations@refreshToken", values.refToken],
    ["@motivations@uid", values.uid]
  ]).then(response => {
    cbFunction();
  });
};

export const getTokens = cbFunction => {
  AsyncStorage.multiGet([
    "@motivations@token",
    "@motivations@refreshToken",
    "@motivations@uid"
  ]).then(response => {
    cbFunction(response);
  });
};
