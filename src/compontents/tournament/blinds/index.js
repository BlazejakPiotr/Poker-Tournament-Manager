import {
  faSave,
  faTimes,
  faEdit,
  faChevronDown,
  faPlus,
  faTrash,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
  createRound,
  deleteRound,
  editRound,
  setCurrentRound,
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
            <Col className="p-0">SB</Col>
            <Col className="p-0">BB</Col>
            <Col className="p-0">Duration</Col>
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

  const [level, setlevel] = useState({
    name: "",
    duration: round.duration,
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
        className="d-flex"
        variant={round.break && "warning"}
      >
        {round.break ? (
          <>
            <Col className="small-screen">Break</Col>
            <Col></Col>
            <Col></Col>
          </>
        ) : (
          <>
            <Col className="p-0 small-screen">Round {index + 1}</Col>
            <Col className="p-0">$ {round.sb}</Col>
            <Col className="p-0">$ {round.bb}</Col>
          </>
        )}

        <Col className="p-0">{round.duration}m</Col>
      </ListGroup.Item>
      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={6} sm={3} className="d-flex align-items-end">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Break"
                    value={level.break}
                    onChange={(e) => handleInput(e, "break")}
                  />
                </Form.Group>
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
                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteRound(index))}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="danger" type="submit">
                    Edit
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

export const RoundForm = () => {
  const dispatch = useDispatch();
  const currentRound = useSelector(
    (state) => state.tournament.data.state.currentRound
  );
  const [round, setRound] = useState({
    name: "",
    duration: "",
    ante: "",
    sb: "",
    bb: "",
    break: false,
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
    dispatch(createRound(round));
    setRound({
      name: "",
      duration: "",
      sb: "",
      bb: "",
      break: false,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h6>Create new round</h6>
      <Row className="mb-3">
        <Col xs={12} sm={2} className="d-flex align-items-center mb-2">
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Break"
              value={round.break}
              onChange={(e) => handleInput(e, "break")}
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={2} className="p-0 mb-2">
          <FormGroup style={{ paddingRight: "5px" }}>
            <Form.Control
              type="number"
              placeholder="SB"
              value={round.sb}
              onChange={(e) => handleInput(e, "sb")}
              disabled={round.break}
              required
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={2} className="p-0 mb-2">
          <FormGroup style={{ paddingRight: "5px" }}>
            <Form.Control
              type="number"
              placeholder="BB"
              value={round.bb}
              onChange={(e) => handleInput(e, "bb")}
              disabled={round.break}
              required
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={2} className="p-0 mb-2">
          <FormGroup style={{ paddingRight: "5px" }}>
            <Form.Control
              type="number"
              placeholder="duration"
              value={round.duration}
              onChange={(e) => handleInput(e, "duration")}
              required
            />
          </FormGroup>
        </Col>

        <Col xs={1} className="p-0">
          <Button variant="danger" type="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
