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
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createBreak,
  createNewRound,
  deleteRound,
  editRound,
  enableRoundEdit,
} from "../../../redux/actions/index.js";

// export const RoundForm = () => {
//   const dispatch = useDispatch();
//   const [round, setRound] = useState({
//     name: "",
//     duration: "",
//     ante: "",
//     sb: "",
//     bb: "",
//     break: null,
//   });

//   const handleInput = (e, propertyName) => {
//     setRound({
//       ...round,
//       [propertyName]: e.target.value,
//     });
//   };

//   return {
//     /*<Form onSubmit={} >
//       <Button type="submit">Save</Button>
//     </Form>

//       <Col className="p-0"></Col>
//       <Col className="p-0">
//         <Form.Control
//           size="sm"
//           className="w-75"
//           type="number"
//           placeholder="ante"
//           value={round.ante}
//           onChange={(e) => handleInput(e, "ante")}
//           disabled={round.break}
//         />
//       </Col>
//       <Col className="p-0">
//         <Form.Control
//           size="sm"
//           className="w-75"
//           type="number"
//           placeholder="small blind"
//           value={round.sb}
//           onChange={(e) => handleInput(e, "sb")}
//           disabled={round.break}
//           required
//         />
//       </Col>
//       <Col className="p-0">
//         <Form.Control
//           size="sm"
//           className="w-75 m-0"
//           type="number"
//           placeholder="big blind"
//           value={round.bb}
//           onChange={(e) => handleInput(e, "bb")}
//           disabled={round.break}
//           required
//         />
//       </Col>
//       <Col className="p-0">
//         <Form.Control
//           size="sm"
//           className="w-75 m-0"
//           type="number"
//           placeholder="20m"
//           required
//           value={round.duration}
//           onChange={(e) => handleInput(e, "duration")}
//         />
//       </Col>
//       <Col className="px-0 d-flex">
//         {/* <Button
//           style={{ padding: "0px 8px", marginLeft: "1rem" }}
//           onClick={() => dispatch(editRound(index, round))}
//         >
//           <FontAwesomeIcon icon={faSave} />
//         </Button>
//         <Button
//           variant="danger"
//           style={{ padding: "0px 10px", marginLeft: "1rem" }}
//           onClick={() => dispatch(deleteRound(index))}
//         >
//           <FontAwesomeIcon icon={faTimes} />
//         </Button>
//       </Col> */
//   };
// };

export const RoundsContent = () => {
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
            <RoundDetails key={index} round={round} index={index} />
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
      <ListGroup.Item
        action
        onClick={handleShowModal}
        className="d-flex"
        variant={round.break && "warning"}
      >
        {round.break ? (
          <>
            <Col className="small-screen">Break</Col>
          </>
        ) : (
          <>
            <Col className="p-0 small-screen">Round {index + 1}</Col>
            <Col className="p-0">{round.ante && "$ " + round.ante}</Col>
            <Col className="p-0">$ {round.sb}</Col>
            <Col className="p-0">$ {round.bb}</Col>
          </>
        )}

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
          <RoundForm level={round} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export const RoundForm = ({ level }) => {
  const dispatch = useDispatch();
  const [round, setRound] = useState({
    name: level.name,
    duration: level.duration,
    ante: level.ante,
    sb: level.sb,
    bb: level.bb,
    break: level.break,
  });

  const handleInput = (e, propertyName) => {
    setRound({
      ...round,
      [propertyName]:
        propertyName === "break" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRound({ round }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Break?"
              onChange={(e) => handleInput(e, "break")}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6} sm={3}>
          <FormGroup>
            <FormLabel>Ante</FormLabel>
            <Form.Control
              size="sm"
              type="number"
              placeholder="ante"
              value={round.ante}
              onChange={(e) => handleInput(e, "ante")}
              disabled={round.break}
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
              value={round.sb}
              onChange={(e) => handleInput(e, "sb")}
              disabled={round.break}
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
              value={round.bb}
              onChange={(e) => handleInput(e, "bb")}
              disabled={round.break}
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
              value={round.duration}
              onChange={(e) => handleInput(e, "duration")}
              disabled={round.break}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button type="submit">Edit round</Button>
        </Col>
      </Row>
    </Form>
  );
};

export const RoundModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);
  return (
    <>
      <Button className="mb-1" onClick={handleShowModal}>
        Add round
      </Button>
      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoundForm />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export const BlindsNav = () => {
  const dispatch = useDispatch();

  const [round, setRound] = useState({
    name: "",
    duration: "",
    ante: "",
    sb: "",
    bb: "",
    break: false,
  });
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
        <RoundModal />
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
          2
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
