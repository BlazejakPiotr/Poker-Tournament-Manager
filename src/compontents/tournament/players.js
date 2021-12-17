import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Modal,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";

import {
  addonPlayer,
  bustoutPlayer,
  buyinPlayer,
  editPlayer,
  rebuyPlayer,
  removePlayer,
} from "../../redux/actions/index.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/fontawesome-free-solid";
import { setPlayerStatusBadge } from "./players/index.js";

export const PlayersList = () => {
  const tournament = useSelector((state) => state.tournament);

  return (
    <Row>
      <Col>
        <ListGroup>
          <ListGroup.Item
            className="d-flex justify-content-between bg-light"
            style={{ fontWeight: "bold" }}
          >
            <Col className="p-0">Players</Col>
            <Col className="p-0">Status</Col>
          </ListGroup.Item>
          {tournament.players.map((player, index) => (
            <PlayersListDetails key={index} player={player} index={index} />
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export const PlayersListDetails = ({ player, index }) => {
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
      <ListGroup.Item
        action
        onClick={handleShowModal}
        className="d-flex justify-content-between"
      >
        <Col className="p-0">{player.name}</Col>
        <Col className="p-0">{setPlayerStatusBadge(player.status)}</Col>
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
                disabled={!tournament.data.rebuy || player.place}
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
