import { Row, Col } from "react-bootstrap";
import { BlindsNav, RoundsContent } from "./blinds/index.js";

const Blinds = () => {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <BlindsNav />
        </Col>
      </Row>
      <Row>
        <Col>
          <RoundsContent />
        </Col>
      </Row>
    </>
  );
};

export default Blinds;
