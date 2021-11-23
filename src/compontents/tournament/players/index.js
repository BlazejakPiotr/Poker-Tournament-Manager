import {
  faPlus,
  faTrash,
  faRandom,
  faRedo,
  faCoins,
  faEllipsisV,
  faRetweet,
  faUserMinus,
  faHandHoldingUsd,
  faInfoCircle,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/fontawesome-free-solid";
import { RiCoinFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { FaCoins, FaUserEdit, FaUserSlash } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Form,
  Table,
  Button,
  ListGroup,
  Dropdown,
  Badge,
  Col,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addonPlayer,
  bustoutPlayer,
  buyinPlayer,
  rebuyPlayer,
  removePlayer,
} from "../../../redux/actions";

export const PlayerListTable = () => {
  const players = useSelector((state) => state.tournament.players);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>#</th>
          <th style={{ width: "40%" }}>Name</th>
          <th style={{ width: "30%" }}>Status</th>
          <th className="small-screen">Total Cost</th>
          <th style={{ width: "5%" }}></th>
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
  const [details, setDetails] = useState(false);
  return (
    <>
      <tr onClick={() => setDetails(!details)}>
        <td>{index + 1}.</td>
        <td>{player.name}</td>
        <td>{setPlayerStatusBadge(player.status)}</td>
        <td className="small-screen">{`${player.cost} ${data.currency}`}</td>
        <td>
          {details ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => setDetails(!details)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => setDetails(!details)}
            />
          )}

          {/* <PlayerMenu index={index} /> */}
        </td>
      </tr>
      {details ? (
        <tr>
          <td colSpan={6}>
            <PlayerTableDetails player={player} index={index} data={data} />
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
};

export const PlayerTableDetails = ({ player, index, data }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Row>
        <Col xs={6} sm={3} md={3} lg={2}>
          <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
            <li>Buy-in</li>
            <li>Rebuy</li>
            <li>Add-on</li>
          </ul>
        </Col>
        <Col>
          <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
            <li>{player.buyin && data.buyin + data.currency}</li>
            <li>{player.rebuy && data.rebuy + data.currency}</li>
            <li>{player.addon && data.addon + data.currency}</li>
          </ul>
        </Col>
        <Col xs={6} sm={3} md={3} lg={2}>
          <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
            <li>Rank</li>
            <li>Round out</li>
            <li>Winnings</li>
          </ul>
        </Col>
        <Col>
          <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
            <li>{player.place ? player.place : "In game"}</li>
            <li>Round 56</li>
            <li>120$</li>
          </ul>
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col xs={6} sm={4} md={3} lg={2} className="mb-1">
          <Button
            variant="outline-primary"
            onClick={() => dispatch(buyinPlayer(index))}
            className="w-100 d-flex justify-content-evenly align-items-center"
            disabled={player.buyin ? true : false}
          >
            <RiCoinFill /> Buy-in
          </Button>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-1">
          <Button
            variant="outline-primary"
            onClick={() => dispatch(rebuyPlayer(index))}
            className="w-100 d-flex justify-content-evenly align-items-center"
            // disabled={player.buyin ? true : false}
          >
            <GiTwoCoins size={20} /> Rebuy
          </Button>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-1">
          <Button
            variant="outline-primary"
            onClick={() => dispatch(addonPlayer(index))}
            className="w-100 d-flex justify-content-evenly align-items-center"
            disabled={player.addon ? true : false}
          >
            <FaCoins /> Add-on
          </Button>
        </Col>

        <Col xs={6} sm={4} md={3} lg={2} className="mb-1">
          <Button
            variant="outline-danger"
            disabled={!player.buyin || player.status === "Busted out"}
            onClick={() => dispatch(bustoutPlayer(index))}
            className="w-100 d-flex justify-content-evenly align-items-center"
          >
            <FaUserSlash size={21} /> Bust out
          </Button>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-1">
          <Button
            variant="outline-warning"
            disabled={player.buyin}
            onClick={() => dispatch(removePlayer(index))}
            className="w-100 d-flex justify-content-evenly align-items-center mb-1"
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
        </Col>
      </Row>
      {/* {/* <Row className="justify-content-between">
        <Col xs={7} sm={6} md={5} lg={3}>
          <Row>
            <Col className="mb-1">
              <Button
                onClick={() => dispatch(buyinPlayer(index))}
                className="w-100 d-flex justify-content-evenly align-items-center"
                disabled={player.buyin ? true : false}
              >
                <RiCoinFill /> Buy-in
              </Button>
            </Col>
            <Col
              xs={3}
              className="d-flex justify-content-center align-items-center"
            >
              {player.buyin && <ImCheckmark size={24} />}
            </Col>
          </Row>
          <Row>
            <Col className="mb-1">
              <Button
                onClick={() => dispatch(rebuyPlayer(index))}
                className="w-100 d-flex justify-content-evenly align-items-center"
                // disabled={player.buyin ? true : false}
              >
                <GiTwoCoins size={20} /> Rebuy
              </Button>
            </Col>
            <Col
              xs={3}
              className="d-flex justify-content-center align-items-center"
            >
              <strong style={{ fontSize: "1.5rem" }}>
                {player.rebuy ? player.rebuy : "0"}
              </strong>
            </Col>
          </Row>
          <Row className="d-flex  align-items-center">
            <Col className="mb-1">
              <Button
                onClick={() => dispatch(addonPlayer(index))}
                className="w-100 d-flex justify-content-evenly align-items-center"
                disabled={player.addon ? true : false}
              >
                <FaCoins /> Add-on
              </Button>
            </Col>
            <Col
              xs={3}
              className="d-flex  justify-content-center align-items-center"
            >
              {player.addon && <ImCheckmark size={24} />}
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" xs={9}>
              <Button
                variant="warning"
                disabled={!player.buyin || player.status === "Busted out"}
                onClick={() => dispatch(bustoutPlayer(index))}
                className="w-100 d-flex justify-content-evenly align-items-center"
              >
                <FaUserSlash size={21} /> Bust out
              </Button>
            </Col>
            <Col
              xs={3}
              className="d-flex  justify-content-center align-items-center"
            ></Col>
          </Row> 
          <Row>
            <Col className="mb-1" xs={9}>
              <Button
                variant="danger"
                disabled={player.buyin}
                onClick={() => dispatch(removePlayer(index))}
                className="w-100 d-flex justify-content-evenly align-items-center mb-1"
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </Col>
            <Col
              xs={3}
              className="d-flex  justify-content-center align-items-center"
            ></Col>
          </Row> 
        </Col>
        <Col xs={5} sm={6} lg={3}></Col>
      </Row>*/}
    </>
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

export const setPlayerStatusBadge = (status) => {
  if (status === "Registered")
    return (
      <Badge pill bg="warning" text="dark">
        {status}
      </Badge>
    );
  if (status === "Bought in")
    return (
      <Badge pill bg="info" text="dark">
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
