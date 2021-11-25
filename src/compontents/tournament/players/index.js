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
  faCheck,
  faUserPlus,
} from "@fortawesome/fontawesome-free-solid";
import { RiCoinFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { FaCoins, FaUserSlash } from "react-icons/fa";

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
  Modal,
  FormGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addonPlayer,
  bustoutPlayer,
  buyinPlayer,
  editPlayer,
  rebuyPlayer,
  removePlayer,
} from "../../../redux/actions";

export const PlayersContent = () => {
  const tournament = useSelector((state) => state.tournament);

  return (
    <Row>
      <Col xs={12}>
        <ListGroup>
          <ListGroup.Item
            className="d-flex"
            style={{ fontWeight: "bold" }}
            variant="secondary"
          >
            <Col sm={1} className="d-none d-md-block p-0">
              #
            </Col>
            <Col xs={5} md={4} lg={3} className="p-0">
              Name
            </Col>
            <Col xs={4} md={3} lg={2} className="p-0">
              Status
            </Col>
            <Col md={12} lg={1} className="d-none d-lg-block p-0">
              Buy-in
            </Col>
            <Col md={12} lg={1} className="d-none d-lg-block p-0">
              Rebuy
            </Col>
            <Col md={12} lg={1} className="d-none d-lg-block p-0">
              Add-on
            </Col>
            <Col sm={3} lg={2} className="d-none d-md-block p-0">
              Total cost
            </Col>
            <Col xs={3} md={1} className="p-0">
              Place
            </Col>
          </ListGroup.Item>
          {tournament.players.map((player, index) => (
            <PlayerDetails key={index} player={player} index={index} />
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export const PlayerDetails = ({ player, index }) => {
  const tournament = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);

  const [playerState, setPlayerState] = useState({
    ...player,
    name: player.name,
  });
  const handleInput = (e) => {
    setPlayerState({
      ...playerState,
      name: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editPlayer(index, playerState));
  };

  return (
    <>
      <ListGroup.Item action onClick={handleShowModal} className="d-flex">
        <Col sm={1} className="d-none d-md-block p-0">
          {index + 1}.
        </Col>
        <Col xs={5} md={4} lg={3} className="p-0">
          {player.name}
        </Col>
        <Col xs={4} md={3} lg={2} className="p-0">
          {setPlayerStatusBadge(player.status)}
        </Col>
        <Col md={12} lg={1} className="d-none d-lg-block p-0">
          {player.buyin && <FontAwesomeIcon icon={faCheck} />}
        </Col>
        <Col md={12} lg={1} className="d-none d-lg-block p-0">
          {player.rebuy > 0 && player.rebuy}
        </Col>
        <Col md={12} lg={1} className="d-none d-lg-block p-0">
          {player.addon && <FontAwesomeIcon icon={faCheck} />}
        </Col>
        <Col
          xs={3}
          lg={2}
          className="d-none d-md-block p-0 "
        >{`${player.cost} ${tournament.data.currency}`}</Col>
        <Col xs={3} md={1} className="p-0">
          Place
        </Col>
      </ListGroup.Item>
      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={8}>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="d-flex align-items-center mb-2">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Add new player"
                      required
                      style={{ margin: "0px 1rem" }}
                      value={playerState.name}
                      onChange={(e) => handleInput(e)}
                    />
                    {/* <Button type="submit">Edit</Button> */}
                  </FormGroup>
                </Form>
              </Col>
              <Row>
                <Col xs={5}>
                  <ul
                    style={{
                      paddingInline: "0px",
                      lineHeight: "2rem",
                      listStyle: "none",
                    }}
                  >
                    <li className="d-flex justify-content-between">
                      <Col xs={10}>Buy-in</Col>
                      <Col>
                        {player.buyin && <FontAwesomeIcon icon={faCheck} />}
                      </Col>
                    </li>
                    <li className="d-flex justify-content-between">
                      <Col xs={10}>Rebuy </Col>
                      <Col>{player.rebuy > 0 && player.rebuy}</Col>
                    </li>
                    <li className="d-flex justify-content-between">
                      <Col xs={10}>Add-on </Col>
                      <Col>
                        {player.addon && <FontAwesomeIcon icon={faCheck} />}
                      </Col>
                    </li>
                  </ul>
                </Col>
                <Col>
                  <ul
                    style={{
                      paddingInline: "0px",
                      lineHeight: "2rem",
                      listStyle: "none",
                    }}
                  >
                    <li className="d-flex justify-content-between align-items-center">
                      Status
                      {setPlayerStatusBadge(player.status)}
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <Col>Place</Col>
                      <Col>{player.place}</Col>
                    </li>
                    <li className="d-flex justify-content-between">
                      <Col>Total cost </Col>
                      <Col>{player.cost + tournament.data.currency}</Col>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>

            <Col xs={4}>
              <Button
                onClick={() => dispatch(buyinPlayer(index))}
                className="w-100 mb-2"
                disabled={player.buyin ? true : false}
              >
                Buy-in
              </Button>
              <Button
                onClick={() => dispatch(rebuyPlayer(index))}
                className="w-100 mb-2"
                disabled={tournament.data.rebuy && player.place}
              >
                Rebuy
              </Button>
              <Button
                onClick={() => dispatch(addonPlayer(index))}
                className="w-100 mb-2"
                disabled={!tournament.data.addon || player.addon}
              >
                Add-on
              </Button>
              <Button
                variant="danger"
                disabled={!player.buyin || player.status === "Busted out"}
                onClick={() => dispatch(bustoutPlayer(index))}
                className="w-100 mb-2"
              >
                Bust out
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-warning"
            disabled={player.buyin}
            onClick={() => dispatch(removePlayer(index))}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>

          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

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
            disabled={data.rebuy ? false : true}
          >
            <GiTwoCoins size={20} /> Rebuy
          </Button>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-1">
          <Button
            variant="outline-primary"
            onClick={() => dispatch(addonPlayer(index))}
            className="w-100 d-flex justify-content-evenly align-items-center"
            disabled={!data.addon ? true : false}
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
