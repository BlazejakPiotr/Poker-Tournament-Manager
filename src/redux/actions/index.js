import { useSelector } from "react-redux";
import { calculateNumberOfRounds } from "../../compontents/home/functions.js";
import {
  calculatePlayerCost,
  setPlayerStatus,
  setPlayerPlace,
  playerObj,
} from "../../compontents/tournament/players/functions.js";

// USER

export const CREATE_USER = "CREATE_USER";

export const createNewUser = (username) => ({
  type: CREATE_USER,
  payload: username,
});

export const LOGIN_USER = "LOGIN_USER";

export const changeUserStatus = (bool) => ({
  type: LOGIN_USER,
  payload: bool,
});

// TOURNAMENT SETTINGS

export const SET_ROUND_TIME_LEFT = "SET_ROUND_TIME_LEFT";

export const TOURNAMENT_STATUS = {
  SCHEDULED: "Scheduled",
  LIVE: "Live",
  PAUSED: "Paused",
  BREAK: "Break",
  FINISHED: "Finished",
};

export const CLEAN_ALL_DATA = "CLEAN_ALL_DATA";
export const clearTournamentData = () => ({
  type: CLEAN_ALL_DATA,
});

export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
export const createNewTournament = (data) => ({
  type: CREATE_TOURNAMENT,
  payload: { data },
});

export const SET_TOURNAMENT_STATUS = "SET_TOURNAMENT_STATUS";
export const changeTournamentStatus = (status) => ({
  type: SET_TOURNAMENT_STATUS,
  payload: status,
});

export const SET_CURRENT_ROUND_INDEX = "SET_CURRENT_ROUND_INDEX";
export const updateCurrentRoundIndex = (index) => ({
  type: SET_CURRENT_ROUND_INDEX,
  payload: index,
});

export const SET_TOTAL_POT = "SET_TOTAL_POT";
export const updateTotalPot = (players) => {
  let playersCostArr = [];
  players.map((player) => playersCostArr.push(player.cost));
  return (dispatch) => {
    dispatch({
      type: SET_TOTAL_POT,
      payload: playersCostArr,
    });
  };
};

export const SET_ELAPSED_TIME = "SET_ELAPSED_TIME";
export const setTournamentDuration = (time) => ({
  type: SET_ELAPSED_TIME,
  payload: time,
});

export const CLEAR_BLINDS_STRUCTURE = "CLEAR_BLINDS_STRUCTURE";
export const clearBlindsStructure = () => ({ type: CLEAR_BLINDS_STRUCTURE });

export const SET_BLINDS_STRUCTURE = "SET_BLINDS_STRUCTURE";
export const createBlindsStructure = ({ duration, roundLength, initialSB }) => {
  let roundsToCreate = calculateNumberOfRounds(duration, roundLength);
  let initialLevel = {
    name: "",
    duration: parseInt(roundLength),
    sb: parseInt(initialSB),
    bb: initialSB * 2,
    break: false,
  };
  let smallBlind = (initialLevel.sb += parseInt(initialSB));
  let bigBlind = smallBlind * 2;
  return (dispatch) => {
    for (let i = 0; i < roundsToCreate; i++) {
      dispatch({
        type: CREATE_NEW_ROUND,
        payload: (initialLevel = {
          ...initialLevel,
          sb: smallBlind,
          bb: bigBlind,
        }),
      });
      smallBlind += parseInt(initialSB);
      bigBlind = smallBlind * 2;
    }
  };
};

export const CREATE_EXPECTED_PLAYERS = "CREATE_EXPECTED_PLAYERS";
export const createExpectedPlayers = (num) => {
  let initialPlayer = {
    buyin: null,
    rebuy: null,
    status: PLAYER_STATUS.REGISTERED,
    cost: 0,
    place: null,
  };
  console.log(playerObj);
  return (dispatch) => {
    for (let i = 0; i < num; i++) {
      let currentNumber = i + 1;
      dispatch({
        type: CREATE_EXPECTED_PLAYERS,
        payload: (initialPlayer = {
          ...initialPlayer,
          name: "Player " + currentNumber,
        }),
      });
    }
  };
};

// PLAYERS
export const CREATE_PLAYER = "CREATE_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const BUYIN_PLAYER = "BUYIN_PLAYER";
export const SET_PLAYER_STATUS = "SET_PLAYER_STATUS";
export const SET_ALL_PLAYERS_STATUS = "SET_ALL_PLAYERS_STATUS";
export const BUYIN_ALL_PLAYERS = "BUYIN_ALL_PLAYERS";
export const REBUY_PLAYER = "REBUY_PLAYER";
export const ADDON_PLAYER = "ADDON_PLAYER";
export const BUSTOUT_PLAYER = "BUSTOUT_PLAYER";
export const SET_PLAYER_PLACE = "SET_PLAYER_PLACE";
export const UPDATE_PLAYER_COST = "UPDATE_PLAYER_COST";
export const UPDATE_ALL_PLAYERS_COST = "UPDATE_ALL_PLAYERS_COST";
export const SET_WINNER = "SET_WINNER";
export const EDIT_PLAYER = "EDIT_PLAYER";

export const PLAYER_STATUS = {
  REGISTERED: "Registered",
  BOUGHT_IN: "Bought in",
  STILL_IN: "Still in",
  BUSTED_OUT: "Busted out",
  WINNER: "Winner",
};

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
    const tournament = getState().tournament;
    const cost = calculatePlayerCost(index, tournament);
    dispatch({
      type: UPDATE_PLAYER_COST,
      payload: { index, cost },
    });
    const status = setPlayerStatus(
      tournament.players[index],
      tournament.data.state.status
    );
    dispatch({
      type: SET_PLAYER_STATUS,
      payload: { index, status },
    });
  };
};

export const buyinAllPlayers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BUYIN_ALL_PLAYERS,
      payload: true,
    });
    // dispatch({
    //   type: SET_ALL_PLAYERS_STATUS,
    //   payload: "Bought in",
    // });
    const tournament = getState().tournament;
    tournament.players.map((player, index) => {
      const cost = calculatePlayerCost(index, tournament);
      dispatch({
        type: UPDATE_PLAYER_COST,
        payload: { index, cost },
      });
    });
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
    const tournament = getState().tournament;
    const place = setPlayerPlace(tournament);
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
      updatedState.data.state.placements.length + 2 ===
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

export const editPlayer = (index, user) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PLAYER,
      payload: { index, user },
    });
  };
};

// ROUNDS
export const CREATE_NEW_ROUND = "CREATE_NEW_ROUND";
export const EDIT_ROUND = "EDIT_ROUND";
export const DELETE_ROUND = "DELETE_ROUND";
export const SET_CURRENT_ROUND = "SET_CURRENT_ROUND";

export const createRound = (round) => ({
  type: CREATE_NEW_ROUND,
  payload: round,
});

export const editRound = (index, round) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_ROUND,
      payload: { index, round },
    });
  };
};

export const deleteRound = (index) => ({
  type: DELETE_ROUND,
  payload: index,
});

export const setCurrentRound = (index) => ({
  type: SET_CURRENT_ROUND,
  payload: index,
});

//TOURNAMENT ALERTS
export const SHOW_DANGER_ALERT = "SHOW_DANGER_ALERT";
export const displayDangerAlert = (alert) => ({
  type: SHOW_DANGER_ALERT,
  payload: alert,
});

export const HIDE_DANGER_ALERT = "HIDE_DANGER_ALERT";
export const hideDangerAlert = (alert) => ({
  type: HIDE_DANGER_ALERT,
  payload: alert,
});

export const SHOW_SUCCESS_ALERT = "SHOW_SUCCESS_ALERT";
export const displaySuccessAlert = (alert) => ({
  type: SHOW_SUCCESS_ALERT,
  payload: alert,
});

export const HIDE_SUCCESS_ALERT = "HIDE_SUCCESS_ALERT";
export const hideSuccessAlert = (alert) => ({
  type: HIDE_SUCCESS_ALERT,
  payload: alert,
});
