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

export const createPlayer = (player) => ({
  type: CREATE_PLAYER,
  payload: player,
});

export const removePlayer = ({ index }) => ({
  type: REMOVE_PLAYER,
  payload: index,
});

// ROUNDS
