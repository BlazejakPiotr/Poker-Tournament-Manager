import {
  CREATE_TOURNAMENT,
  CREATE_PLAYER,
  REMOVE_PLAYER,
  BUYIN_PLAYER,
  REBUY_PLAYER,
  ADDON_PLAYER,
  BUSTOUT_PLAYER,
  UPDATE_PLAYER_COST,
  SET_PLAYER_PLACE,
  RESET_TOURNAMENT_STATE,
  SET_WINNER,
  BUYIN_ALL_PLAYERS,
  ADD_ROUND,
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
    case RESET_TOURNAMENT_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          placements: [],
        },
        players: [
          ...state.players.map(
            (player) =>
              (player = {
                ...player,
                buyin: false,
                rebuy: false,
                addon: false,
                status: "Registered",
                cost: 0,
                place: null,
              })
          ),
        ],
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
          else
            return {
              ...player,
              buyin: true,
              status: "Still in",
            };
        }),
      };
    // case BUYIN_ALL_PLAYERS:
    //   return {
    //     ...state,
    //      players: state.players.map((player) =>  return {...player, buyin: true})
    //   };
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
          if (i !== action.payload.index) return player;
          else
            return {
              ...player,
              place: action.payload.place,
              status: "Busted out",
            };
        }),
      };
    case SET_PLAYER_PLACE:
      return {
        ...state,
        data: {
          ...state.data,
          placements: [...state.data.placements, { ...action.payload }],
        },
      };
    case UPDATE_PLAYER_COST:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (i !== action.payload.index) return player;
          else return { ...player, cost: action.payload.cost };
        }),
      };
    case SET_WINNER:
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.place) return player;
          else return { ...player, status: "Winner", place: 1 };
        }),
      };

    // ROUND STATE
    case ADD_ROUND:
      return {
        ...state,
        rounds: [...state.rounds, action.payload],
      };
    default:
      return state;
  }
};

export default tournamentReducer;
