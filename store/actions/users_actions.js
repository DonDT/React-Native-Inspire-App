import axios from "axios";
import { SIGN_IN_USER } from "../types";
import { SIGN_UP_USER } from "../types";

export function signIn() {
  return {
    type: SIGN_IN_USER,
    payload: {
      email: "donald@gmail.com",
      token: "babubaxbajbxjobx"
    }
  };
}

export function signUp() {
  return {
    type: SIGN_UP_USER,
    payload: {
      name: "don",
      email: "don@gmail.com",
      token: "passi pass pass"
    }
  };
}
