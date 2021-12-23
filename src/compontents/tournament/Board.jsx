import { Row, Col, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";

import { CurrentLocalTime, TournamentElapsedTime } from "./board/index.js";

import Clock from "./Clock.jsx";
import { calculateRebuys } from "./clock/functions.js";
import { TournamentTimer } from "./clock/index.js";

const Board = () => {
  const tournament = useSelector((state) => state.tournament);

  return (
    <>
      <Row>
        {/* TOP LEFT */}
        <Col xs={12} md={3} xl={2} className="board">
          <div>Round</div>
          <p>Level {tournament.data.state.currentRound + 1}</p>
        </Col>
        {/* TOP CENTER */}
        <Col className="p-0 board">
          <div>Event name</div>
          <h1 className="p-3 m-0">{tournament.data.name}</h1>
        </Col>
        {/* TOP RIGHT */}
        <Col xs={12} md={3} xl={2} className="p-0 board">
          <div>Status</div>
          <p>{tournament.data.state.status}</p>
        </Col>
      </Row>
      <Row>
        {/* MID LEFT*/}
        <Col xs={12} md={3} xl={2}>
          <Row>
            <Col xs={6} md={12} className="board">
              <div>Small blind</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].sb}</p>
            </Col>
            <Col xs={6} md={12} className="board">
              <div>Big blind</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].bb}</p>
            </Col>
          </Row>
        </Col>
        {/* MID CENTER */}
        <Col className="p-0 board d-flex flex-column">
          <div>Timer</div>
          <h4>
            <TournamentTimer />
          </h4>
          <div className="bg-dark mb-2 px-5">
            <ProgressBar
              variant="secondary"
              animated
              now={45}
              style={{ height: "10px" }}
            />
          </div>
        </Col>
        {/* MID RIGHT */}
        <Col xs={12} md={3} xl={2}>
          <Row>
            <Col xs={6} md={12} className="board">
              <div>Local time</div>
              <p>
                <CurrentLocalTime />
              </p>
            </Col>
            <Col xs={6} md={12} className="board">
              <div>Elapsed time</div>
              <p>
                <TournamentElapsedTime />
              </p>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        {/* BOT LEFT */}
        <Col xs={12} md={3} xl={2}>
          <Row>
            <Col xs={6} md={12} className="board">
              <div>Avg stack</div>
              <p>-</p>
            </Col>
            <Col xs={6} md={12} className="board">
              <div>Total chips</div>
              <p>-</p>
            </Col>
          </Row>
        </Col>
        {/* BOT CENTER */}
        <Col className="p-0 board">
          <Row>
            <Col className="board w-100">
              <div>Rounds</div>
            </Col>
            <Col className="board w-100">
              <div>Prizes</div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={3} xl={2}>
          <Row>
            <Col xs={6} md={12} className="board">
              <div>Players</div>
              <p>-</p>
            </Col>
            <Col xs={6} md={12} className="board">
              <div>Total pot</div>
              <p>-</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Board;
