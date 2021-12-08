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
  SET_WINNER,
  BUYIN_ALL_PLAYERS,
  SET_PLAYER_STATUS,
  SET_ALL_PLAYERS_STATUS,
  CREATE_NEW_ROUND,
  EDIT_ROUND,
  DELETE_ROUND,
  EDIT_PLAYER,
  SET_TOTAL_POT,
  SET_ELAPSED_TIME,
  SET_TOURNAMENT_STATUS,
  SET_CURRENT_ROUND_INDEX,
  SHOW_DANGER_ALERT,
  HIDE_DANGER_ALERT,
  HIDE_SUCCESS_ALERT,
  SHOW_SUCCESS_ALERT,
  SET_CURRENT_ROUND,
} from "../actions";
import { initialState } from "../store";

const tournamentReducer = (state = initialState.tournament, action) => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  switch (action.type) {
    // TOURNAMENT STATE
    case CREATE_TOURNAMENT:
      return {
        data: { ...action.payload.data },
        players: [],
        blinds: [],
        tables: [],
        alerts: {},
      };
    case SET_TOURNAMENT_STATUS:
      return {
        ...state,
        data: {
          ...state.data,
          state: {
            ...state.data.state,
            status: action.payload,
          },
        },
      };
    case SET_CURRENT_ROUND_INDEX:
      return {
        ...state,
        data: {
          ...state.data,
          state: {
            ...state.data.state,
            currentRound: action.payload,
          },
        },
      };
    // CLOCK
    case SET_TOTAL_POT:
      return {
        ...state,
        data: {
          ...state.data,
          state: {
            ...state.data.state,
            totalPot: action.payload.reduce(reducer),
          },
        },
      };

    case SET_ELAPSED_TIME:
      return {
        ...state,
        data: {
          ...state.data,
          state: {
            ...state.data.state,
            elapsedTime: action.payload,
          },
        },
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
            };
        }),
      };
    case SET_PLAYER_STATUS:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (i !== action.payload.index) return player;
          else
            return {
              ...player,
              status: action.payload.status,
            };
        }),
      };
    case SET_ALL_PLAYERS_STATUS:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (!player.buyin) return player;
          else
            return {
              ...player,
              status: action.payload,
            };
        }),
      };
    case BUYIN_ALL_PLAYERS:
      return {
        ...state,
        players: state.players.map((player, i) => {
          if (player.status !== "Registered") return player;
          else {
            return {
              ...player,
              buyin: action.payload,
              status: "Bought in",
            };
          }
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
          state: {
            ...state.data.state,
            placements: [...state.data.state.placements, { ...action.payload }],
          },
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

    case EDIT_PLAYER:
      return {
        ...state,
        players: state.players.map((player, i) => {
          console.log(action.payload.user);
          if (i !== action.payload.index) return player;
          else return { ...action.payload.user };
        }),
      };

    // ROUND STATE
    case CREATE_NEW_ROUND:
      return {
        ...state,
        blinds: [...state.blinds, action.payload],
      };
    case EDIT_ROUND:
      return {
        ...state,
        blinds: state.blinds.map((round, i) => {
          if (i !== action.payload.index) return round;
          else return { ...action.payload.round };
        }),
      };

    case DELETE_ROUND:
      return {
        ...state,
        blinds: state.blinds.filter((round, i) => i !== action.payload),
      };
    case SET_CURRENT_ROUND:
      return {
        ...state,
        data: {
          ...state.data,
          state: {
            ...state.data.state,
            currentRound: action.payload,
          },
        },
      };
    // ALERTS
    case SHOW_DANGER_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload]: true,
        },
      };
    case HIDE_DANGER_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload]: false,
        },
      };
    case SHOW_SUCCESS_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload]: true,
        },
      };
    case HIDE_SUCCESS_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload]: false,
        },
      };

    default:
      return state;
  }
};

export default tournamentReducer;
