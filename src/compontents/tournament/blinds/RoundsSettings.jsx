import {
  Modal,
  NavDropdown,
  Col,
  Row,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { NewRoundForm } from "./index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createBreak,
  createNewRound,
  deleteRound,
  enableRoundEdit,
} from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/fontawesome-free-solid";

const RoundsSettings = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const blinds = useSelector((state) => state.tournament.blinds);
  const dispatch = useDispatch();

  const [round, setRound] = useState({
    name: "",
    duration: "",
    ante: "",
    sb: "",
    bb: "",
    edit: true,
    break: false,
  });

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Rounds</NavDropdown.Item>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Rounds manger
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <Button onClick={() => dispatch(createNewRound(round))}>
                Add round
              </Button>
              <Button
                onClick={() => dispatch(createBreak({ ...round, break: true }))}
              >
                Add break
              </Button>
            </Col>
            <Col lg={9}>
              <ListGroup>
                <ListGroup.Item
                  className="d-flex"
                  style={{ fontWeight: "bold" }}
                  variant="secondary"
                >
                  <Col className="p-0">#</Col>
                  <Col className="p-0">Ante</Col>
                  <Col className="p-0">SB</Col>
                  <Col className="p-0">BB</Col>
                  <Col className="p-0">Duration</Col>
                  <Col className="p-0" xs={2}></Col>
                </ListGroup.Item>
                {blinds.map((round, index) => (
                  <ListGroup.Item
                    className="d-flex"
                    key={index}
                    variant={round.break && "warning"}
                  >
                    {round.edit ? (
                      <NewRoundForm index={index} level={round} />
                    ) : (
                      <>
                        {round.break ? (
                          <>
                            <Col>Break</Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                          </>
                        ) : (
                          <>
                            <Col className="p-0">R {index + 1}</Col>
                            <Col className="p-0">
                              {round.ante && "$ " + round.ante}
                            </Col>
                            <Col className="p-0">$ {round.sb}</Col>
                            <Col className="p-0">$ {round.bb}</Col>
                          </>
                        )}

                        <Col className="p-0">{round.duration}m</Col>
                        <Col className="p-0 px-4" xs={2}>
                          <Button
                            style={{
                              padding: "0px 6px",
                            }}
                          >
                            <FontAwesomeIcon
                              size="xs"
                              icon={faEdit}
                              onClick={() => dispatch(enableRoundEdit(index))}
                            />
                          </Button>
                        </Col>
                      </>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          {/* <NewRoundForm /> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RoundsSettings;
