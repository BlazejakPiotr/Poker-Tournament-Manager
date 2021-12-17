import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Modal,
  Form,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import {
  createRound,
  deleteRound,
  editRound,
  setCurrentRound,
} from "../../redux/actions/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/fontawesome-free-solid";
export const LevelsList = () => {
  const levels = useSelector((state) => state.tournament.blinds);

  return (
    <Row>
      <Col xs={12}>
        <ListGroup>
          <ListGroup.Item
            className="d-flex bg-warning"
            style={{ fontWeight: "bold" }}
          >
            <Col className="p-0 small-screen">#</Col>
            <Col className="p-0">SB</Col>
            <Col className="p-0">BB</Col>
            <Col className="p-0">Time</Col>
          </ListGroup.Item>
          {levels.map((round, index) => (
            <LevelsListDetails key={index} round={round} index={index} />
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export const LevelsListDetails = ({ round, index }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);

  const [level, setlevel] = useState({
    name: "",
    duration: round.duration,
    ante: round.ante,
    sb: round.sb,
    bb: round.bb,
    break: round.break,
  });

  const handleInput = (e, propertyName) => {
    setlevel({
      ...level,
      [propertyName]:
        propertyName === "break" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRound(index, level));

    setShowModal(false);
  };

  return (
    <>
      <ListGroup.Item
        action
        onClick={handleShowModal}
        className="d-flex bg-dark text-light"
        style={{ borderColor: "#484848" }}
      >
        {round.break ? (
          <>
            <Col className="small-screen">Break</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </>
        ) : (
          <>
            <Col className="p-0">{index + 1}</Col>
            <Col className="p-0">{round.sb}</Col>
            <Col className="p-0">{round.bb}</Col>
          </>
        )}

        <Col className="p-0">{round.duration} '</Col>
      </ListGroup.Item>
      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={6} sm={3}>
                <FormGroup>
                  <FormLabel>Ante</FormLabel>
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="ante"
                    value={level.ante}
                    onChange={(e) => handleInput(e, "ante")}
                    disabled={level.break}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup>
                  <FormLabel>Small Blind</FormLabel>
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="SB"
                    value={level.sb}
                    onChange={(e) => handleInput(e, "sb")}
                    disabled={level.break}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup>
                  <FormLabel>Big Blind</FormLabel>
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="BB"
                    value={level.bb}
                    onChange={(e) => handleInput(e, "bb")}
                    disabled={level.break}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup>
                  <FormLabel>Duration</FormLabel>
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="minutes"
                    value={level.duration}
                    onChange={(e) => handleInput(e, "duration")}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-between">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Break"
                      value={level.break}
                      onChange={(e) => handleInput(e, "break")}
                    />
                  </Form.Group>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    onClick={() => dispatch(deleteRound(index))}
                    className="mx-3"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button type="submit">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Col>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
