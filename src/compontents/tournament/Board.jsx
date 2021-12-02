import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tournamentTimer } from "./clock/functions.js";
import { CurrentLocalTime } from "./board/index.js";

import { calculatePlayersLeft } from "./players/functions";

const Board = () => {
  const tournament = useSelector((state) => state.tournament);
  useEffect(() => {});
  return (
    <>
      <Row className="justify-content-end mb-4">
        <Col sm={4} className="d-flex justify-content-end"></Col>
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
        <Col md={6} className="clock"></Col>
        <Col className="clock">
          <div>
            <CurrentLocalTime />
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
            <h3>{calculatePlayersLeft(tournament)}</h3>
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

export default Board;
