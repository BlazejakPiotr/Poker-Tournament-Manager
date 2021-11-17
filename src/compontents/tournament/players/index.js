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
  faInfoCircle,
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
} from "../../../redux/actions";
import { ChangePlayerStatus, renamePlayerPlace } from "./functions";

export const PlayerListTable = () => {
  const players = useSelector((state) => state.tournament.players);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="small-screen">#</th>
          <th style={{ width: "25%" }}>Name</th>
          <th>Status</th>
          <th className="small-screen">Paid</th>
          <th className="small-screen">Rebuy</th>
          <th className="small-screen">Add-on</th>
          <th>Total</th>
          <th>Place</th>
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
  const data = useSelector((state) => state.tournament.data);

  return (
    <tr>
      <td className="small-screen">{index + 1}.</td>
      <td>{player.name}</td>
      <td>{ChangePlayerStatus(player.status)}</td>
      <td className="small-screen">
        {player.buyin ? <FontAwesomeIcon icon={faCheck} /> : "-"}
      </td>
      <td className="small-screen">{player.rebuy ? player.rebuy : "-"}</td>
      <td className="small-screen">
        {player.addon ? <FontAwesomeIcon icon={faCheck} /> : "-"}
      </td>
      <td>
        {player.cost} {data.currency}
      </td>
      <td>{renamePlayerPlace(player.place)}</td>
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
        <Dropdown.Item onClick={() => console.log("modal")}>
          <div className="d-flex ">
            <div style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </div>
            <span>Details</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          disabled={players[index].buyin}
          onClick={() => dispatch(buyinPlayer(index))}
        >
          <div className="d-flex ">
            <div style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faCoins} />
            </div>
            <span>Buy-in </span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          disabled={
            !data.rebuy ||
            !players[index].buyin ||
            players[index].status === "Busted out"
          }
          onClick={() => dispatch(rebuyPlayer(index))}
        >
          <div className="d-flex ">
            <div style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faRetweet} />
            </div>
            <span>Rebuy</span>
          </div>
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
          <div className="d-flex ">
            <div style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faHandHoldingUsd} />
            </div>
            <span>Add-on</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          disabled={
            !players[index].buyin || players[index].status === "Busted out"
          }
          onClick={() => dispatch(bustoutPlayer(index))}
        >
          <div className="d-flex ">
            <div style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faUserMinus} />{" "}
            </div>
            <span>Bust out</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          disabled={players[index].buyin}
          onClick={() => dispatch(removePlayer(index))}
        >
          <div className="d-flex ">
            <div style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faTrash} />{" "}
            </div>
            <span>Delete</span>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
