import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlayer } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/fontawesome-free-solid";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const CreateNewPlayer = () => {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState({
    name: "",
    buyin: true,
    rebuy: false,
    addon: false,
    status: null,
    cost: null,
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
      rebuy: false,
      addon: false,
      status: null,
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

export const CalculatePlayerCosts = (player) => {
  const data = useSelector((state) => state.tournament.data);
  if (player.buyin && player.rebuy && player.addon) {
    return data.buyin + data.rebuy + data.addon;
  } else if (player.buyin && player.rebuy) {
    return data.buyin + data.rebuy;
  } else if (player.buyin && player.addon) {
    return data.buyin + data.addon;
  } else if (player.buyin) {
    return data.buyin;
  } else {
    return 0;
  }
};
