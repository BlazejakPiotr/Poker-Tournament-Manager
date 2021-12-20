import { Container, Tab, Tabs, Row, Col, Table } from "react-bootstrap";
import { PlayersList } from "./players.js";
import Board from "./Board";
import Blinds from "./Blinds";
import Players from "./Players.jsx";
import Clock from "./Clock";
import { DangerAlert, SuccessAlert } from "./alerts";
import { useSelector } from "react-redux";
import { LevelsList } from "./levels.js";
import { TournamentTimer } from "./clock/index.js";
import { CurrentLocalTime, TournamentElapsedTime } from "./board/index.js";
import {
  calculatePaidinPlayers,
  calculateRebuys,
  CalculateTotalPot,
} from "./clock/functions.js";

const Tournament = () => {
  const tournament = useSelector((state) => state.tournament);
  return (
    <>
      <Container className="mt-5 clock">
        <Row>
          <Col md={12} lg={8}>
            <Row>
              <Col className="p-0 " xs={12}>
                <div
                  className="px-3 py-1"
                  style={{
                    backgroundColor: "#1C1814",
                  }}
                >
                  Event name
                </div>
                <h1 className="p-3 bg-dark m-0">{tournament.data.name}</h1>
              </Col>

              <Col xs={12} md={3} className="bg-dark p-0">
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Small blind
                </div>
                <h1 style={{ fontSize: "3rem" }} className="p-3 text-center">
                  {tournament.blinds[tournament.data.state.currentRound].sb}
                </h1>
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Big Blind
                </div>
                <h1 style={{ fontSize: "3rem" }} className="p-3 text-center">
                  {tournament.blinds[tournament.data.state.currentRound].bb}
                </h1>
              </Col>
              <Col sm={12} md={6} className="bg-dark p-0  text-center">
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Level {tournament.data.state.currentRound + 1}
                </div>
                <div className=" d-flex flex-column justify-content-evenly h-75">
                  <h2>{tournament.data.state.status}</h2>
                  <TournamentTimer />
                </div>
              </Col>
              <Col sm={12} md={3} className="bg-dark p-0">
                <div>
                  <div
                    className="px-3 py-1"
                    style={{ backgroundColor: "#1C1814" }}
                  >
                    Local time
                  </div>

                  <CurrentLocalTime />
                </div>
                <div>
                  <div
                    className="px-3 py-1"
                    style={{ backgroundColor: "#1C1814" }}
                  >
                    Elapsed time
                  </div>
                  <TournamentElapsedTime />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="bg-dark p-0">
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814", margin: "0px" }}
                >
                  Players
                </div>
                <h1 className="p-3 text-center">
                  {calculatePaidinPlayers(tournament.players)}/
                  {tournament.players.length}
                </h1>
              </Col>

              <Col className="bg-dark p-0 text-center">
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Rebuys
                </div>
                <h1 className="p-3 text-center">
                  {calculateRebuys(tournament.players)}
                </h1>
              </Col>

              <Col className="bg-dark p-0">
                <div
                  className="px-3 py-1 text-center"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Total Pot
                </div>
                <div className="p-3 text-center">{CalculateTotalPot()}</div>
              </Col>
            </Row>
          </Col>

          <Col className="bg-dark text-dark">
            <PlayersList />
          </Col>
        </Row>
        <Row>
          <Col className="p-0 tournament-tabs">
            <Tabs
              defaultActiveKey="Structure"
              className="d-flex justify-content-start  p-0 "
            >
              <Tab eventKey="Structure" title="Structure">
                <Blinds />
              </Tab>
              <Tab eventKey="Prizes" title="Prizes">
                <Players />
              </Tab>
              <Tab eventKey="Players" title="Players">
                <Players />
              </Tab>
              <Tab eventKey="Tables" title="Tables">
                <Players />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tournament;
