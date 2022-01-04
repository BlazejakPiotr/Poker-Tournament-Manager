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
import { useEffect, useState } from "react";
import {
  createRound,
  deleteRound,
  editRound,
  setCurrentRound,
  setShowRoundsModal,
} from "../../redux/actions/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/fontawesome-free-solid";

export const LevelModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const [level, setlevel] = useState({
    name: "",
    duration: "",
    ante: "",
    sb: "",
    bb: "",
    break: "",
  });

  useEffect(() => {
    setlevel(modal.temp ? modal.temp : "", { level });
  }, [modal.temp]);

  const handleInput = (e, propertyName) => {
    setlevel({
      ...level,
      [propertyName]:
        propertyName === "break" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal.temp) {
      dispatch(editRound(modal.index, level));
    } else {
      dispatch(createRound(level));
    }

    dispatch(setShowRoundsModal(!modal.rounds));
  };

  return (
    <>
      <Modal
        show={modal.rounds}
        onHide={() => dispatch(setShowRoundsModal(!modal.rounds))}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modal.temp ? "Edit Round " + (modal.index + 1) : "Add new round"}
          </Modal.Title>
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
                    disabled
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
              </Col>
            </Row>
            <Row>
              <Col>
                <Col xs={12} className="d-flex justify-content-between">
                  <div>
                    {modal.temp && (
                      <button
                        
                        className="btn-button"
                        onClick={() => {
                          dispatch(setShowRoundsModal());
                          dispatch(deleteRound(modal.index));
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <button className="btn-button" type="submit">
                    {modal.temp ? "Edit" : "Create"}
                  </button>
                </Col>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
