import { faSave, faTimes } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewRound,
  deleteRound,
  editRound,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRound(index, round));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="p-0">
          <Form.Control
            size="sm"
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
            type="number"
            placeholder="20m"
            required
            value={round.duration}
            onChange={(e) => handleInput(e, "duration")}
          />
        </Col>
        <Col
          xs={2}
          className="p-0 d-flex align-items-center justify-content-evenly px-2"
        >
          <Button type="submit" style={{ padding: "0px 7px" }}>
            <FontAwesomeIcon size="sm" icon={faSave} />
          </Button>
          <Button
            variant="danger"
            style={{ padding: "0px 7px" }}
            onClick={() => dispatch(deleteRound(index))}
          >
            <FontAwesomeIcon size="sm" icon={faTimes} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export const BlindsButtons = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">Settings</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const BlindsListTable = () => {
  const rounds = useSelector((state) => state.tournament.blinds);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Ante</th>
          <th>SB</th>
          <th>BB</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {rounds.map((round, index) => (
          <BlindsListTableItem key={index} round={round} index={index} />
        ))}
      </tbody>
    </Table>
  );
};

export const BlindsListTableItem = ({ round, index }) => {
  return (
    <tr>
      <td>{round.break ? "Break" : "Round " + (index + 1)}</td>
      <td>{round.break ? "" : "$" + round.ante}</td>
      <td>{round.break ? "" : "$" + round.sb}</td>
      <td>{round.break ? "" : "$" + round.bb}</td>
      <td>{round.duration}min</td>
    </tr>
  );
};
