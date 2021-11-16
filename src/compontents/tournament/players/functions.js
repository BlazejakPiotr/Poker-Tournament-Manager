import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlayer } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/fontawesome-free-solid";
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
    place: 0,
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
    });
  };

  return (
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
};

export const CalculatePlayersTotalCost = (index, data) => {
  console.log(index, data);
  // const buyin = parseInt(tournament.data.buyin);
  // const rebuy = parseInt(tournament.data.rebuy);
  // const addon = parseInt(tournament.data.addon);

  // let cost = 0;
  // if (tournament.players[index].buyin) cost += buyin;
  // if (tournament.players[index].rebuy > 0)
  //   cost += rebuy * tournament.players[index].rebuy;
  // if (tournament.players[index].addon) cost += addon;

  // return cost;
};
