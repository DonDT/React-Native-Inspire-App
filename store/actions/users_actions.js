import axios from "axios";
import { SIGN_IN_USER, SIGN_UP_USER, AUTO_SIGN_IN } from "../types";
import { SIGNIN, SIGNUP, FIREBASEURL, REFRESH } from "../../utils/helperURLs";

export function signUp(data) {
  const request = axios({
    method: "POST",
    url: SIGNUP,
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      //console.log(response.data);
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: SIGN_UP_USER,
    payload: request
  };
}

export function signIn(data) {
  const request = axios({
    method: "POST",
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      //console.log(response.data);
      return response.data;
    })
    .catch(e => console.log(e));
  return {
    type: SIGN_IN_USER,
    payload: request
  };
}

export const autoSignIn = refToken => {
  const request = axios({
    methos: "POST",
    url: REFRESH,
    data: "grant_type=refresh_token&refresh_token=" + refToken,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));

  return {
    type: AUTO_SIGN_IN,
    payload: request
  };
};
