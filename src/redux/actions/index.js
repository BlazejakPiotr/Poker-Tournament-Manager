import { CalculatePlayersTotalCost } from "../../compontents/tournament/players/functions";

// TOURNAMENT SETTINGS
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";

export const createNewTournament = (data) => ({
  type: CREATE_TOURNAMENT,
  payload: data,
});

// PLAYERS
export const CREATE_PLAYER = "CREATE_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const BUYIN_PLAYER = "BUYIN_PLAYER";
export const REBUY_PLAYER = "REBUY_PLAYER";
export const ADDON_PLAYER = "ADDON_PLAYER";
export const BUSTOUT_PLAYER = "BUSTOUT_PLAYER";
export const SET_PLAYER_COST = "SET_PLAYER_COST";

export const createPlayer = (player) => ({
  type: CREATE_PLAYER,
  payload: player,
});

export const removePlayer = (index) => ({
  type: REMOVE_PLAYER,
  payload: index,
});

export const buyinPlayer = (index) => ({
  type: BUYIN_PLAYER,
  payload: index,
});

export const rebuyPlayer = (index) => ({
  type: REBUY_PLAYER,
  payload: index,
});

export const addonPlayer = (index) => ({
  type: ADDON_PLAYER,
  payload: index,
});

export const bustoutPlayer = (index) => ({
  type: BUSTOUT_PLAYER,
  payload: index,
});

// export const setTotalPlayerCost = (index, data) => dispatch => dispatch({
//   type: SET_PLAYER_COST,
//   payload: CalculatePlayersTotalCost(index, data),
// });

// ROUNDS
