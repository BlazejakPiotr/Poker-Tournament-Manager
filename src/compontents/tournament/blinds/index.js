import {
  faSave,
  faTimes,
  faEdit,
  faChevronDown,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Form,
  Col,
  Row,
  ListGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createBreak,
  createNewRound,
  deleteRound,
  editRound,
  enableRoundEdit,
} from "../../../redux/actions/index.js";

export const NewRoundForm = ({ index, level }) => {
  const dispatch = useDispatch();
  const [round, setRound] = useState({
    name: "",
    duration: level.duration,
    ante: level.ante,
    sb: level.sb,
    bb: level.bb,
    break: level.break,
    edit: true,
  });
  const handleInput = (e, propertyName) => {
    setRound({
      ...round,
      [propertyName]: e.target.value,
    });
  };

  return (
    <>
      <Col className="p-0"></Col>
      <Col className="p-0">
        <Form.Control
          size="sm"
          className="w-75"
          type="number"
          placeholder="ante"
          value={round.ante}
          onChange={(e) => handleInput(e, "ante")}
          disabled={round.break}
        />
      </Col>
      <Col className="p-0">
        <Form.Control
          size="sm"
          className="w-75"
          type="number"
          placeholder="small blind"
          value={round.sb}
          onChange={(e) => handleInput(e, "sb")}
          disabled={round.break}
          required
        />
      </Col>
      <Col className="p-0">
        <Form.Control
          size="sm"
          className="w-75 m-0"
          type="number"
          placeholder="big blind"
          value={round.bb}
          onChange={(e) => handleInput(e, "bb")}
          disabled={round.break}
          required
        />
      </Col>
      <Col className="p-0">
        <Form.Control
          size="sm"
          className="w-75 m-0"
          type="number"
          placeholder="20m"
          required
          value={round.duration}
          onChange={(e) => handleInput(e, "duration")}
        />
      </Col>
      <Col className="px-0 d-flex">
        <Button
          style={{ padding: "0px 8px", marginLeft: "1rem" }}
          onClick={() => dispatch(editRound(index, round))}
        >
          <FontAwesomeIcon icon={faSave} />
        </Button>
        <Button
          variant="danger"
          style={{ padding: "0px 10px", marginLeft: "1rem" }}
          onClick={() => dispatch(deleteRound(index))}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Col>
    </>
  );
};

export const RoundsContent = () => {
  const dispatch = useDispatch();
  const blinds = useSelector((state) => state.tournament.blinds);

  return (
    <Row>
      <Col xs={12}>
        <ListGroup>
          <ListGroup.Item
            className="d-flex"
            style={{ fontWeight: "bold" }}
            variant="secondary"
          >
            <Col className="p-0 small-screen">#</Col>
            <Col className="p-0">Ante</Col>
            <Col className="p-0">SB</Col>
            <Col className="p-0">BB</Col>
            <Col className="p-0">Duration</Col>
            <Col className="p-0"></Col>
          </ListGroup.Item>
          {blinds.map((round, index) => (
            <RoundDetails key={index} level={round} index={index} />
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export const RoundDetails = ({ round, index }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);
  return (
    <>
      <ListGroup.Item action onClick={handleShowModal} className="d-flex">
        <Col className="p-0 small-screen">Round {index + 1}</Col>
        <Col className="p-0">{round.ante && "$ " + round.ante}</Col>
        <Col className="p-0">$ {round.sb}</Col>
        <Col className="p-0">$ {round.bb}</Col>

        <Col className="p-0">{round.duration}m</Col>

        <Col className="p-0">
          <Button
            style={{
              padding: "3px 6px",
              marginLeft: "1rem",
            }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => dispatch(enableRoundEdit(index))}
            />
          </Button>
        </Col>
      </ListGroup.Item>
      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewRoundForm index={index} round={round} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export const BlindsNav = () => {
  const dispatch = useDispatch();

  const round = {
    name: "",
    duration: "",
    ante: "",
    sb: "",
    bb: "",
    break: false,
  };
  return (
    <Row className="justify-content-between">
      <Col
        xs={12}
        sm={8}
        md={6}
        className="d-flex justify-content-end align-items-center"
      >
        <Col>
          <ul style={{ paddingInline: "0px", lineHeight: "2rem" }}>
            <li className="d-flex justify-content-between">
              <Col>Levels</Col>
              <Col>20</Col>
            </li>
            <li className="d-flex">
              <Col>Rounds</Col>
              <Col>20</Col>
            </li>
            <li className="d-flex">
              <Col>Breaks</Col>
              <Col>5</Col>
            </li>
          </ul>
        </Col>
        <Col>
          <ul style={{ paddingInline: "0px", lineHeight: "2rem" }}>
            <li className="d-flex justify-content-between">
              <Col>Length</Col>
              <Col>20</Col>
            </li>
            <li className="d-flex">
              <Col>Play</Col>
              <Col>20</Col>
            </li>
            <li className="d-flex">
              <Col>On break</Col>
              <Col>20</Col>
            </li>
          </ul>
        </Col>
      </Col>
      <Col
        xs={12}
        sm={4}
        md={3}
        className="d-flex flex-column justify-content-center"
      >
        <Button
          className="mb-1"
          onClick={() => dispatch(createNewRound(round))}
        >
          Add round
        </Button>
        <Button
          className="mb-1"
          onClick={() => dispatch(createBreak({ ...round, break: true }))}
        >
          Add break
        </Button>
        <Dropdown className="mb-1">
          <Dropdown.Toggle variant="primary" className="w-100">
            More tools
            <FontAwesomeIcon icon={faChevronDown} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Rounds creator</Dropdown.Item>
            <Dropdown.Item>Set all times</Dropdown.Item>
            <Dropdown.Item>Delete all</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Save as template</Dropdown.Item>
            <Dropdown.Item>Load template</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};
