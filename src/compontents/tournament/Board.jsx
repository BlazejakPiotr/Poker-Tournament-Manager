import { Row, Col, ProgressBar, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  CurrentLocalTime,
  LevelsTable,
  TournamentElapsedTime,
  PrizesTable,
  PlayersTable,
  TablesTable,
} from "./board/index.js";
import { PlayersContent } from "./players/index.js";
import Clock from "./Clock.jsx";
import {
  calculatePaidinPlayers,
  calculateRebuys,
  CalculateTotalPot,
} from "./clock/functions.js";
import { TournamentTimer } from "./clock/index.js";

const Board = () => {
  const tournament = useSelector((state) => state.tournament);

  return (
    <>
      {/* TOP */}
      <Row>
        <Col xs={12} className="p-0 board">
          <div style={{ textAlign: "left" }}>Event name</div>
          <h1 className="p-3 m-0" style={{ textAlign: "left" }}>
            {tournament.data.name}
          </h1>
        </Col>
      </Row>
      {/* MIDDLE */}
      <Row>
        {/* MID LEFT*/}
        <Col xs={12} md={3} xl={2}>
          <Row className="h-100">
            <Col xs={12} className="p-0 board">
              <div>Round</div>
              <p>Round {tournament.data.state.currentRound + 1}</p>
            </Col>
            <Col xs={4} md={12} className="p-0 board">
              <div>Ante</div>
              <p>-</p>
            </Col>
            <Col xs={4} md={12} className="p-0 board">
              <div>SB</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].sb}</p>
            </Col>
            <Col xs={4} md={12} className="p-0 board">
              <div>BB</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].bb}</p>
            </Col>
            {/* <Col xs={12} className="p-0 board">
              <div>Level</div>
              <h1>Round {tournament.data.state.currentRound + 1}</h1>
              <h2 style={{ fontSize: "4rem" }}>
                {tournament.blinds[tournament.data.state.currentRound].sb} /{" "}
                {tournament.blinds[tournament.data.state.currentRound].bb}{" "}
              </h2>
            </Col> */}

            {/* <Col xs={6} className="p-0 board">
              <div>SB</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].sb}</p>
            </Col>
            <Col xs={6} className="p-0 board">
              <div>BB</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].bb}</p>
            </Col> */}
          </Row>
        </Col>
        {/* MID CENTER */}

        <Col md={12} md={6} xl={8}>
          <Row>
            <Col xs={12} className="p-0 board" style={{ borderBottom: "none" }}>
              <div>Timer</div>
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <div className="board" style={{ border: "none" }}>
                <TournamentTimer />
              </div>
            </Col>
          </Row>
        </Col>

        {/* MID RIGHT */}
        <Col xs={12} md={3} lg={3} xl={2}>
          <Row className=" h-100">
            <Col xs={12} className="p-0 board">
              <div>Status</div>
              <p style={{ fontSize: "2rem" }}>{tournament.data.state.status}</p>
            </Col>
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
            <Col xs={6} md={12} className="board">
              <div>Players</div>
              <p>
                {calculatePaidinPlayers(tournament.players)}/
                {tournament.players.length}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Row>
        <Col xs={6} md={4} lg={2} className="board">
          <div>Rebuys</div>
          <p className="d-flex justify-content-center align-items-center">-</p>
        </Col>
        <Col xs={6} md={4} lg={2} className="board">
          <div>Add-ons</div>
          <p className="d-flex justify-content-center align-items-center">-</p>
        </Col>
        <Col xs={6} md={4} lg={2} className="board">
          <div>Total pot</div>
          <p className="d-flex justify-content-center align-items-center">
            {CalculateTotalPot()}
          </p>
        </Col>
        <Col xs={6} md={4} lg={2} className="board">
          <div>Players</div>
          <p>
            {calculatePaidinPlayers(tournament.players)}/
            {tournament.players.length}
          </p>
        </Col>
        <Col xs={6} md={4} lg={2} className="board">
          <div>Avg chips</div>
          <p className="d-flex justify-content-center align-items-center">-</p>
        </Col>
        <Col xs={6} md={4} lg={2} className="board">
          <div>Total chips</div>
          <p className="d-flex justify-content-center align-items-center">-</p>
        </Col>
      </Row> */}

      {/* BOTTOM */}

      <Row>
        <Col md={12} lg={4} className="p-0 board">
          <div>Blinds structure</div>
          <div className="p-0 bg-dark">
            <LevelsTable />
          </div>
        </Col>
        <Col md={12} lg={8} className="board pb-5">
          <div>Players</div>
          <div className="p-0 bg-dark">
            <PlayersTable />
          </div>
        </Col>
        {/* <Col md={12} lg={2} className="board">
          <div>Tables</div>
          <div className="p-0 bg-dark d-flex">
            <TablesTable />
          </div>
        </Col>
        <Col md={12} lg={2} className="board">
          <div>Prizes</div>
          <div className="p-0 bg-dark d-flex">
            <TablesTable />
          </div>
        </Col> */}
      </Row>
    </>
  );
};

export default Board;
