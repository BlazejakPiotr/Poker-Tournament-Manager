import { Container, Tab, Tabs, Row, Col, Table } from "react-bootstrap";
import { PlayersList } from "./players.js";
import Board from "./Board";
import Blinds from "./Blinds";
import Clock from "./Clock";
import { DangerAlert, SuccessAlert } from "./alerts";
import { useSelector } from "react-redux";
import { LevelsList } from "./levels.js";

const Tournament = () => {
  const blinds = useSelector((state) => state.tournament.blinds);
  return (
    <>
      <Container className="bg-primary">
        <Row>
          <Col md={12} lg={7} className="h-100">
            <Row>
              <Col className="bg-dark">
                Name
                <h1>NAME</h1>
              </Col>
            </Row>
            <Row>
              <Col className="bg-dark">
                Status <h3>Running</h3>
              </Col>
              <Col className="bg-dark">
                Elapsed time<h3>00:00</h3>
              </Col>
              <Col className="bg-dark">
                Current time <h3>07:42</h3>
              </Col>
            </Row>
            <Row>
              <Col className="bg-dark p-0">
                <h2>Round 12</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="bg-dark p-0">
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Small blind
                </div>
                <h1 style={{ fontSize: "5rem" }} className="text-center">
                  100
                </h1>
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Big Blind
                </div>
                <h1 style={{ fontSize: "5rem" }} className="text-center">
                  200
                </h1>
              </Col>
              <Col className="bg-dark">
                <h1 style={{ fontSize: "8rem" }} className="text-center">
                  15:00
                </h1>
              </Col>
            </Row>
            <Row>
              <Col className="bg-dark p-0">
                <div
                  className="px-3 py-1"
                  style={{ backgroundColor: "#1C1814" }}
                >
                  Players
                </div>
                <h2 className="text-center">0/9</h2>
              </Col>
              <Col className="bg-dark">
                Rebuys <h3>0</h3>
              </Col>
              <Col className="bg-dark">
                Total pot <h3>10 USD</h3>
              </Col>
            </Row>
          </Col>
          {/* <Col className="p-3 bg-dark text-dark" md={3}>
            <LevelsList />
          </Col> */}
          <Col className="p-3 bg-dark text-dark">
            <PlayersList />
          </Col>
        </Row>
        {/* <Tabs
          defaultActiveKey="Board"
          className="d-flex justify-content-evenly"
          className="bg-secondary "
        >
          <Tab eventKey="Board" title="Board">
            <Board />
          </Tab>
          <Tab eventKey="Rounds" title="Rounds">
            <Blinds />
          </Tab>
          <Tab eventKey="Players" title="Players">
            {/* <Players /> 
          </Tab>
        </Tabs> */}
      </Container>
    </>
  );
};

export default Tournament;
