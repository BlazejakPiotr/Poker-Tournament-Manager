import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPlay,
} from "@fortawesome/fontawesome-free-solid";

const Clock = () => {
  return (
    <>
      <Row className="justify-content-end mb-4">
        <Col sm={4} className="d-flex justify-content-end"></Col>
      </Row>
      <Row>
        <Col className="clock">
          <h2>EPT EUROPEAN POKER TOUR</h2>
        </Col>
      </Row>
      <Row>
        <Col className="clock">
          <div>
            <p>Ante</p>
            <h2>100</h2>
          </div>
          <div>
            <p>Small blind</p>
            <h2>500</h2>
          </div>
          <div>
            <p>Big blind</p>
            <h2>1000</h2>
          </div>
        </Col>
        <Col md={6} className="clock">
          <div>
            <h3 style={{ marginBottom: "0px" }}>Round 1</h3>
            <h1>15:00</h1>
            <div className="controls">
              <FontAwesomeIcon icon={faFastBackward} size="2x" />
              <FontAwesomeIcon icon={faPlay} size="2x" />
              <FontAwesomeIcon icon={faFastForward} size="2x" />
            </div>
          </div>
        </Col>
        <Col className="clock">
          <div>
            <p>Current time</p>
            <h2>21:00</h2>
          </div>
          <div>
            <p>Elapsed time</p>
            <h2>00:00</h2>
          </div>
          <div>
            <p>Next break</p>
            <h2>00:15</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="clock">
          <div>
            <p>Players</p>
            <h3>0/10</h3>
          </div>
        </Col>
        <Col className="clock">
          <div>
            <p>Avg stack</p>
            <h3>1000</h3>
          </div>
        </Col>
        <Col className="clock">
          <div>
            <p>Pot</p>
            <h3>0$</h3>
          </div>
        </Col>
        <Col className="clock">
          <div>
            <p>Next round</p>
            <h3>1000/2000 (200)</h3>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Clock;
