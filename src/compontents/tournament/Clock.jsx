import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DisplayCurrentRound } from "./clock/functions.js";
import { TournamentTimer } from "./clock/index.js";
import { calculatePlayersLeft } from "./players/functions.js";

const Clock = () => {
  const tournament = useSelector((state) => state.tournament);

  return (
    <Row>
      <Col md={3} className="d-flex flex-column text-center">
        <DisplayCurrentRound />
      </Col>
      <Col className="text-center" md={6}>
        <div>
          <TournamentTimer />
        </div>
      </Col>
    </Row>
  );
};
export default Clock;
