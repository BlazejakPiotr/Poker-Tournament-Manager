import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyinAllPlayers,
  createPlayer,
  TOURNAMENT_STATUS,
} from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faUserPlus } from "@fortawesome/fontawesome-free-solid";
import { Form, Button, Badge } from "react-bootstrap";

export let playerObj = {
  name: "",
  buyin: false,
  rebuy: 0,
  addon: false,
  status: "Registered",
  cost: 0,
  place: null,
};

export const CreateNewPlayer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const players = useSelector((state) => state.tournament.players);
  const [player, setPlayer] = useState(playerObj);

  useEffect(() => {
    if (players.length < 1) {
      dispatch(
        createPlayer((playerObj = { ...playerObj, name: user.username }))
      );
    }
  }, []);

  const handleInput = (e) => {
    setPlayer({
      ...player,
      name: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlayer(player));
    setPlayer(playerObj);
  };

  return (
    <>
      <h6>Create new player</h6>
      <Form onSubmit={handleSubmit} className="d-flex mb-2">
        <Form.Control
          type="text"
          placeholder="Name"
          required
          value={player.name}
          onChange={(e) => handleInput(e)}
        />
        <Button type="submit" className="mx-1">
          <FontAwesomeIcon icon={faUserPlus} />
        </Button>
      </Form>
    </>
  );
};

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
  const totalPlayers = tournament.players.length;
  const playersBustedOut = tournament.data.state.placements.length;

  return totalPlayers - playersBustedOut;
};

export const setPlayerStatus = (player, state) => {
  if (player.buyin) {
    if (!player.place) return "Still in";
    if (!player.place) return "Bought in";
  } else return "Busted out";
};

export const BuyinAllPlayers = () => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(buyinAllPlayers())}>
      Buy-in all
      <FontAwesomeIcon icon={faCoins} />
    </Button>
  );
};
