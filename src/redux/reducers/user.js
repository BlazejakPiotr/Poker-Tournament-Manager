import { CREATE_USER, LOGIN_USER } from "../actions";
import { initialState } from "../store";

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        username: action.payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        logged: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default userReducer;
