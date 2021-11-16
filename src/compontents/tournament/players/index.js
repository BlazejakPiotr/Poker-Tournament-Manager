import {
  faPlus,
  faTrash,
  faRandom,
  faRedo,
  faCoins,
  faEllipsisV,
  faRetweet,
  faUserMinus,
  faCheck,
  faHandHoldingUsd,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Form, Table, Button, ListGroup, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addonPlayer,
  bustoutPlayer,
  buyinPlayer,
  rebuyPlayer,
  removePlayer,
  setTotalPlayerCost,
} from "../../../redux/actions";
import { ChangePlayerStatus } from "./functions";

export const PlayerListTable = () => {
  const players = useSelector((state) => state.tournament.players);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="small-screen">#</th>
          <th style={{ width: "25%" }}>Name</th>
          <th className="small-screen">Paid</th>
          <th className="small-screen">Rebuy</th>
          <th className="small-screen">Add-on</th>
          <th>Total</th>
          <th>Status</th>
          <th style={{ width: "38px" }}></th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, index) => (
          <PlayersListTableItem key={index} player={p} index={index} />
        ))}
      </tbody>
    </Table>
  );
};

const PlayersListTableItem = ({ player, index }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td className="small-screen">{index + 1}.</td>
      <td className="small-screen">{player.name}</td>
      <td className="small-screen">
        {player.buyin ? <FontAwesomeIcon icon={faCheck} /> : "-"}
      </td>
      <td className="small-screen">{player.rebuy ? player.rebuy : "-"}</td>
      <td> {player.addon ? <FontAwesomeIcon icon={faCheck} /> : "-"}</td>
      <td>{player.cost} </td>
      <td>{ChangePlayerStatus(player.status)}</td>
      <td>
        <PlayerMenu index={index} />
      </td>
    </tr>
  );
};

export const TableControls = () => {
  return (
    <>
      <Button>
        <FontAwesomeIcon icon={faRedo} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faRandom} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </>
  );
};

export const TableList = () => {
  return (
    <ListGroup>
      <ListGroup.Item
        variant="dark"
        className="d-flex justify-content-between align-items-center"
      >
        Table 1
        <Form.Group controlId="tournamentType">
          <Form.Select>
            <option>Select player</option>
            <option value="0">Player 1</option>
            <option value="0">Player 2</option>
            <option value="0">Player 3</option>
            <option value="0">Player 4</option>
          </Form.Select>
        </Form.Group>
        <Button>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </ListGroup.Item>

      <ListGroup.Item>1</ListGroup.Item>
      <ListGroup.Item>2</ListGroup.Item>
      <ListGroup.Item>3</ListGroup.Item>
      <ListGroup.Item>4</ListGroup.Item>
      <ListGroup.Item>5</ListGroup.Item>
      <ListGroup.Item>6</ListGroup.Item>
      <ListGroup.Item>7</ListGroup.Item>
      <ListGroup.Item>8</ListGroup.Item>
      <ListGroup.Item>9</ListGroup.Item>
    </ListGroup>
  );
};

export const PlayerMenu = ({ index }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tournament.data);
  const players = useSelector((state) => state.tournament.players);
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <FontAwesomeIcon icon={faEllipsisV} color="black" />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item
          disabled={players[index].buyin}
          onClick={() => dispatch(buyinPlayer(index))}
        >
          <FontAwesomeIcon icon={faCoins} /> Buy-in
        </Dropdown.Item>
        <Dropdown.Item
          disabled={
            !data.rebuy ||
            !players[index].buyin ||
            players[index].status === "Busted out"
          }
          onClick={() => dispatch(rebuyPlayer(index))}
        >
          <FontAwesomeIcon icon={faRetweet} /> Rebuy
        </Dropdown.Item>
        <Dropdown.Item
          disabled={
            !data.addon ||
            !players[index].buyin ||
            players[index].addon ||
            players[index].status === "Busted out"
          }
          onClick={() => dispatch(addonPlayer(index))}
        >
          <FontAwesomeIcon icon={faHandHoldingUsd} /> Add-on
        </Dropdown.Item>
        <Dropdown.Item
          disabled={
            !players[index].buyin || players[index].status === "Busted out"
          }
          onClick={() => dispatch(bustoutPlayer(index))}
        >
          <FontAwesomeIcon icon={faUserMinus} /> Bust out
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(removePlayer(index))}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </Dropdown.Item>
        {/* <Dropdown.Item
          onClick={() => dispatch(setTotalPlayerCost(index, data))}
        >
          CALCULATE
        </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};
