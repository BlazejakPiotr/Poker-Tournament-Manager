import { Row, Col } from "react-bootstrap";
import { RoundsContent, RoundForm } from "./blinds/index.js";

const Blinds = () => {
  return (
    <Row>
      <Col md={12} lg={7}>
        <RoundForm />
      </Col>
      <Col xs={12}>
        <RoundsContent />
      </Col>
    </Row>
  );
};

export default Blinds;
