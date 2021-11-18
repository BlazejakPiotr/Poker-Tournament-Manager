import { calculatePlayerCost } from "../../compontents/tournament/players/functions.js";

// TOURNAMENT SETTINGS
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
export const RESET_TOURNAMENT_STATE = "RESET_TOURNAMENT_STATE";

export const createNewTournament = (data) => ({
  type: CREATE_TOURNAMENT,
  payload: data,
});

export const resetTournamentState = () => ({
  type: RESET_TOURNAMENT_STATE,
});

// PLAYERS
export const CREATE_PLAYER = "CREATE_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const BUYIN_PLAYER = "BUYIN_PLAYER";
export const BUYIN_ALL_PLAYERS = "BUYIN_ALL_PLAYERS";
export const REBUY_PLAYER = "REBUY_PLAYER";
export const ADDON_PLAYER = "ADDON_PLAYER";
export const BUSTOUT_PLAYER = "BUSTOUT_PLAYER";
export const SET_PLAYER_PLACE = "SET_PLAYER_PLACE";
export const UPDATE_PLAYER_COST = "UPDATE_PLAYER_COST";
export const SET_WINNER = "SET_WINNER";

export const createPlayer = (player) => ({
  type: CREATE_PLAYER,
  payload: player,
});

export const removePlayer = (index) => ({
  type: REMOVE_PLAYER,
  payload: index,
});

export const buyinPlayer = (index) => {
  return (dispatch, getState) => {
    dispatch({
      type: BUYIN_PLAYER,
      payload: index,
    });
    const state = getState().tournament;
    const cost = calculatePlayerCost(index, state);
    dispatch({
      type: UPDATE_PLAYER_COST,
      payload: { index, cost },
    });
  };
};

export const buyinAllPlayers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BUYIN_ALL_PLAYERS,
    });
    // const state = getState().tournament;
    // const cost = calculatePlayerCost(index, state);
    // dispatch({
    //   type: UPDATE_PLAYER_COST,
    //   payload: { index, cost },
    // });
  };
};

export const rebuyPlayer = (index) => {
  return (dispatch, getState) => {
    dispatch({
      type: REBUY_PLAYER,
      payload: index,
    });
    const state = getState().tournament;
    const cost = calculatePlayerCost(index, state);
    dispatch({
      type: UPDATE_PLAYER_COST,
      payload: { index, cost },
    });
  };
};

export const addonPlayer = (index) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADDON_PLAYER,
      payload: index,
    });
    const state = getState().tournament;
    const cost = calculatePlayerCost(index, state);
    dispatch({
      type: UPDATE_PLAYER_COST,
      payload: { index, cost },
    });
  };
};

export const bustoutPlayer = (index) => {
  return (dispatch, getState) => {
    const state = getState().tournament;
    const place = state.players.length - state.data.placements.length;

    dispatch({
      type: BUSTOUT_PLAYER,
      payload: { index, place },
    });
    const updatedState = getState().tournament;

    dispatch({
      type: SET_PLAYER_PLACE,
      payload: updatedState.players[index],
    });

    if (
      updatedState.data.placements.length + 2 ===
      updatedState.players.length
    ) {
      console.log("winner");
      dispatch({
        type: SET_WINNER,
        payload: "Winner",
      });
    }
  };
};

// ROUNDS
export const ADD_ROUND = "ADD_ROUND";
export const ADD_BREAK = "ADD_BREAK";

export const addRound = (round) => ({
  type: ADD_ROUND,
  payload: round,
});
