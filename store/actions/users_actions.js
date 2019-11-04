import axios from "axios";
import { SIGN_IN_USER, SIGN_UP_USER } from "../types";
import { SIGNIN, SIGNUP, FIREBASEURL, REFRESH } from "../../utils/helperURLs";

export function signIn() {
  return {
    type: SIGN_IN_USER,
    payload: {
      email: "donald@gmail.com",
      token: "babubaxbajbxjobx"
    }
  };
}

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
      console.log(response.data);
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
