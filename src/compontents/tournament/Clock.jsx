import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DisplayCurrentRound } from "./clock/functions.js";
import { TournamentTimer } from "./clock/index.js";
import { calculatePlayersLeft } from "./players/functions.js";

const Clock = () => {
  const tournament = useSelector((state) => state.tournament);
  const dispatch = useDispatch();
  const currentRoundIndex = useSelector(
    (state) => state.tournament.data.state.currentRound
  );
  useEffect(() => {});
  return (
    <Row className="py-3">
      <Col className="d-flex flex-column justify-content-end text-center">
        <DisplayCurrentRound />
      </Col>
      <Col className="text-center" md={4}>
        <div>
          <TournamentTimer />
        </div>
      </Col>

      <Col className="d-flex flex-column justify-content-end text-center">
        <h4 style={{ marginBottom: "0px" }}>Players</h4>
        <h1>
          {tournament.players.length > 0
            ? calculatePlayersLeft(tournament) + "/" + tournament.players.length
            : "Add players!"}
        </h1>
      </Col>
    </Row>
  );
};
export default Clock;
