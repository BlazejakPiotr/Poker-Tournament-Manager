import { SHOW_ROUNDS_MODAL } from "../actions";
import { initialState } from "../store";

const modalReducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case SHOW_ROUNDS_MODAL:
      return {
        ...state,
        index: action.payload.index,
        temp: action.payload.round,
        rounds: action.payload.bool,
      };
    default: {
      return state;
    }
  }
};

export default modalReducer;
