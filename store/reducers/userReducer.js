import { SIGN_IN_USER, SIGN_UP_USER } from "../types";

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        auth: {
          email: action.payload.email,
          token: action.payload.token
        }
      };

    case SIGN_UP_USER:
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false
        }
      };

    default:
      return state;
  }
}
