import { Row, Col } from "react-bootstrap";
import {
  BlindsButtons,
  BlindsListTable,
  NewRoundForm,
} from "./blinds/index.js";
import { ClockButtons } from "./clock/index.js";

const Blinds = () => {
  return (
    <>
      {/* <Row className="mb-4">
        <Col xs={9} className="">
          <h2>TOURNAMENT NAME</h2>
        </Col>
        <Col xs={3}>
          <BlindsButtons />
        </Col>
        <Col sm={12} md={3}>
          <h6>Round 1</h6>
          <h4>10/20 (0)</h4>
        </Col>
        <Col sm={12} md={6} className="text-center">
          <h1>15:00</h1>
          <ClockButtons />
        </Col>
        <Col sm={12} md={3}>
          <h6>Players</h6>
          <h4>10/10</h4>

          {/* <NewRoundForm /> 
        </Col>
      </Row> */}
      <Row>
        <Col>
          <BlindsListTable />
        </Col>
      </Row>
    </>
  );
};

export default Blinds;
