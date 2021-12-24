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
        <Col xs={12} md={12} lg={3} xl={3}>
          <Row className="h-100">
            <Col sm={12} md={6} lg={12} className="p-0 board">
              <div>Round</div>
              <p>Round {tournament.data.state.currentRound + 1}</p>
            </Col>

            <Col xs={4} md={6} lg={12} className="p-0 board">
              <div>SB</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].sb}</p>
            </Col>
            <Col xs={4} md={6} lg={12} className="p-0 board">
              <div>BB</div>
              <p>{tournament.blinds[tournament.data.state.currentRound].bb}</p>
            </Col>
            <Col xs={4} md={6} lg={12} className="p-0 board">
              <div>Ante</div>
              <p>-</p>
            </Col>
          </Row>
        </Col>
        {/* MID CENTER */}

        <Col md={12} lg={6}>
          <Row className="h-100">
            <TournamentTimer />
          </Row>
        </Col>

        {/* MID RIGHT */}
        <Col xs={12} md={12} lg={3} xl={3}>
          <Row className="h-100">
            <Col sm={6} md={6} lg={12} className="board">
              <div>Local time</div>
              <p>
                <CurrentLocalTime />
              </p>
            </Col>

            <Col sm={6} md={6} lg={12} className="board">
              <div>Elapsed time</div>
              <p>
                <TournamentElapsedTime />
              </p>
            </Col>

            <Col xs={6} md={6} lg={12} className="board">
              <div>Players</div>
              <p>
                {calculatePaidinPlayers(tournament.players)}/
                {tournament.players.length}
              </p>
            </Col>
            <Col xs={6} md={6} lg={12} className="p-0 board">
              <div>Total pot</div>
              <p> {CalculateTotalPot()}</p>
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
        <Col md={12} lg={3} className="p-0 board">
          <div>Blinds structure</div>
          <div className="flex-content">
            <div className="p-0 bg-dark scrollable-content-wrapper">
              <LevelsTable />
            </div>
          </div>
        </Col>
        <Col md={12} lg={6} className="board pb-5 ">
          <div>Players</div>
          <div className="p-0 bg-dark">
            <PlayersTable />
          </div>
        </Col>
        <Col md={12} lg={3} className="board">
          <div>Prizes</div>
          <div className="p-0 bg-dark d-flex">
            <PrizesTable />
          </div>
        </Col>
        {/* <Col md={12} lg={2} className="board">
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
