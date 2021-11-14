import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { AddBlind, AddBreak, BlindsListTable } from "./blinds/index.js";

const Blinds = () => {
  const [isBreak, setIsBreak] = useState(false);
  const setBreak = () => setIsBreak(!isBreak);

  return (
    <>
      <Row className="justify-content-end mb-4">
        <Col md={6} className="d-flex justify-content-end align-items-center">
          {isBreak ? <AddBreak /> : <AddBlind />}
          <Form.Check
            inline
            label="Break"
            name="isBreak"
            value={isBreak}
            onChange={() => setBreak()}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlindsListTable />
        </Col>
      </Row>
    </>
  );
};

export default Blinds;
