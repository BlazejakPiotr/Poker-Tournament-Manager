import { faTrash, faCheck } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Form,
  Button,
  ListGroup,
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
  createPlayer,
} from "../../../redux/actions";

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
        <Button type="submit">Create</Button>
      </Form>
    </>
  );
};

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
