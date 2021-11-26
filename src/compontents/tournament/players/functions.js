export const setPlayerPlace = (tournament) => {
  const place =
    tournament.players.length - tournament.data.state.placements.length;
  switch (place) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "4th";
    case 5:
      return "5th";
    case 6:
      return "6th";
    case 7:
      return "7th";
    case 8:
      return "8th";
    case 9:
      return "9th";
    case 10:
      return "10th";
    default:
      return place;
  }
};

export const calculatePlayerCost = (index, state) => {
  let buyin = parseInt(state.data.buyin);
  let rebuy = parseInt(state.data.rebuy);
  let addon = parseInt(state.data.addon);
  let cost = 0;

  if (state.players[index].buyin) cost += buyin;
  if (state.players[index].rebuy) {
    cost += rebuy * state.players[index].rebuy;
  }
  if (state.players[index].addon) cost += addon;
  return cost;
};

export const calculatePlayersLeft = (tournament) => {
  if (tournament.data.state.placements.length) {
    return (
      tournament.players.length -
      tournament.data.state.placements.length +
      " / " +
      tournament.players.length
    );
  } else {
    return "No players";
  }
};

export const setPlayerStatus = (player, state) => {
  if (player.buyin) {
    if (!player.place && state === "Running") return "Still in";
    if (!player.place) return "Bought in";
  } else return "Busted out";
};

// export const BuyinAllPlayers = () => {
//   const dispatch = useDispatch();
//   return (
//     <Button onClick={() => dispatch(buyinAllPlayers())}>Buy-in all</Button>
//   );
// };
