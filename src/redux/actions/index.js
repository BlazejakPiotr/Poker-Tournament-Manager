import {
  calculatePlayerCost,
  setPlayerStatus,
  setPlayerPlace,
} from "../../compontents/tournament/players/functions.js";

// TOURNAMENT SETTINGS
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";
export const RESET_TOURNAMENT_STATE = "RESET_TOURNAMENT_STATE";
export const START_TOURNAMENT = "START_TOURNAMENT";
export const START_ALL_PLAYERS = "START_ALL_PLAYERS";

export const createNewTournament = (data) => ({
  type: CREATE_TOURNAMENT,
  payload: data,
});

export const resetTournamentState = () => ({
  type: RESET_TOURNAMENT_STATE,
});

export const startTournament = () => {
  return (dispatch) => {
    dispatch({
      type: START_TOURNAMENT,
      payload: "Running",
    });
    dispatch({
      type: START_ALL_PLAYERS,
      payload: "Still in",
    });
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

// export const buyinAllPlayers = () => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: BUYIN_ALL_PLAYERS,
//       payload: true,
//     });
//     // dispatch({
//     //   type: SET_ALL_PLAYERS_STATUS,
//     //   payload: "Bought in",
//     // });
//     const tournament = getState().tournament;
//     tournament.players.map((player, index) => {
//       const cost = calculatePlayerCost(index, tournament);
//       dispatch({
//         type: UPDATE_PLAYER_COST,
//         payload: { index, cost },
//       });
//     });
//   };
// };

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
export const SET_ROUND_TO_EDIT = "SET_ROUND_TO_EDIT";
export const DELETE_ROUND = "DELETE_ROUND";
export const CREATE_NEW_BREAK = "CREATE_NEW_BREAK ";

export const createNewRound = (round) => ({
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

export const enableRoundEdit = (index) => ({
  type: SET_ROUND_TO_EDIT,
  payload: index,
});

export const deleteRound = (index) => ({
  type: DELETE_ROUND,
  payload: index,
});

export const createBreak = (round) => ({
  type: CREATE_NEW_BREAK,
  payload: round,
});
