import {
  CREATE_TOURNAMENT,
  CREATE_PLAYER,
  REMOVE_PLAYER,
  BUYIN_PLAYER,
  REBUY_PLAYER,
  ADDON_PLAYER,
  BUSTOUT_PLAYER,
  SET_PLAYER_COST,
} from "../actions";
import { initialState } from "../store";

const tournamentReducer = (state = initialState.tournament, action) => {
  switch (action.type) {
    // TOURNAMENT STATE
    case CREATE_TOURNAMENT:
      return {
        ...state,
        data: action.payload,
      };

    // PLAYER STATE
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
    case BUYIN_PLAYER:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (i !== action.payload) return player;
          else return { ...player, buyin: true, status: "Still in" };
        }),
      };
    case REBUY_PLAYER:
      return {
        ...state,
        players: state.players.map((player, i) => {
          const rebuy = player.rebuy;
          if (i !== action.payload) return player;
          else return { ...player, rebuy: rebuy + 1 };
        }),
      };
    case ADDON_PLAYER:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (i !== action.payload) return player;
          else return { ...player, addon: true };
        }),
      };
    case BUSTOUT_PLAYER:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (i !== action.payload) return player;
          else return { ...player, place: 0, status: "Busted out" };
        }),
      };
    case SET_PLAYER_COST:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (i !== action.payload) return player;
          else return { ...player, cost: action.cost };
        }),
      };
    default:
      return state;
  }
};

export default tournamentReducer;
