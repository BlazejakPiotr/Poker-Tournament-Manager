import {
  CREATE_TOURNAMENT,
  CREATE_PLAYER,
  REMOVE_PLAYER,
  BUYIN_PLAYER,
} from "../actions";
import { initialState } from "../store";

const tournamentReducer = (state = initialState.tournament, action) => {
  switch (action.type) {
    case CREATE_TOURNAMENT:
      return {
        ...state,
        data: action.payload,
      };

    case CREATE_PLAYER:
      return {
        ...state,
        players: [...state.players, action.payload],
      };

    case REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter((player, i) => i !== action.payload),
      };

    default:
      return state;
  }
};

export default tournamentReducer;
