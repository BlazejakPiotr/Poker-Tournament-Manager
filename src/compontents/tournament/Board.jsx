import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CalculateTotalPot, tournamentTimer } from "./clock/functions.js";
import { CurrentLocalTime, TournamentElapsedTime } from "./board/index.js";

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
            <p>Buyin</p>
            <h2>
              {tournament.data.buyin} {tournament.data.currency}
            </h2>
          </div>
          <div>
            <p>Rebuy</p>
            <h2>
              {tournament.data.rebuy
                ? tournament.data.rebuy + tournament.data.currency
                : "-"}
            </h2>
          </div>
          <div>
            <p>Add-on</p>
            <h2>
              {" "}
              {tournament.data.addon
                ? tournament.data.addon + tournament.data.currency
                : "-"}
            </h2>
          </div>
        </Col>
        <Col md={6} className="clock"></Col>
        <Col className="clock">
          <div>
            <CurrentLocalTime />
          </div>
          <div>
            <TournamentElapsedTime />
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
            <CalculateTotalPot />
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
