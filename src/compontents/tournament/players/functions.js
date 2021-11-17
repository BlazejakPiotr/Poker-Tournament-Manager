import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  buyinAllPlayers,
  createPlayer,
  resetTournamentState,
  setPlayerCost,
} from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faUserPlus } from "@fortawesome/fontawesome-free-solid";
import { Form, Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

export const CreateNewPlayer = () => {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState({
    name: "",
    buyin: false,
    rebuy: 0,
    addon: false,
    status: "Registered",
    cost: 0,
    place: null,
  });

  const handleInput = (e) => {
    setPlayer({
      ...player,
      name: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlayer(player));
    setPlayer({
      name: "",
      buyin: false,
      rebuy: 0,
      addon: false,
      status: "Registered",
      cost: 0,
      place: null,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex align-items-center">
        <Form.Control
          type="text"
          placeholder="Add new player"
          required
          value={player.name}
          onChange={(e) => handleInput(e)}
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faUserPlus} />
        </Button>
      </Form>
    </>
  );
};

export const ChangePlayerStatus = (status) => {
  if (status === "Registered")
    return (
      <Badge pill bg="warning" text="dark">
        {status}
      </Badge>
    );
  if (status === "Still in")
    return (
      <Badge pill bg="success" text="white">
        {status}
      </Badge>
    );
  if (status === "Busted out")
    return (
      <Badge pill bg="danger" text="white">
        {status}
      </Badge>
    );
  if (status === "Winner")
    return (
      <Badge pill bg="primary" text="white">
        {status}
      </Badge>
    );
  else return status;
};

export const renamePlayerPlace = (place) => {
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
  return (
    tournament.players.length -
    tournament.data.placements.length +
    " / " +
    tournament.players.length
  );
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
