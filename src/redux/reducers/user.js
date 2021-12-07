import { CREATE_USER } from "../actions";
import { initialState } from "../store";

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
