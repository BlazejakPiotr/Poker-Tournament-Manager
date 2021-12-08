import { Container, Tab, Tabs } from "react-bootstrap";
import Players from "./Players";
import Board from "./Board";
import Blinds from "./Blinds";
import Clock from "./Clock";
import { AlertSetPlayersWarning, AlertSetRoundsWarning } from "./alerts";

const Tournament = () => {
  return (
    <>
      <Container>
        <AlertSetRoundsWarning />
        <AlertSetPlayersWarning />
        <Clock />
        <Tabs
          defaultActiveKey="Board"
          className="d-flex justify-content-evenly"
        >
          <Tab eventKey="Board" title="Board">
            <Board />
          </Tab>
          <Tab eventKey="Blinds" title="Blinds">
            <Blinds />
          </Tab>
          <Tab eventKey="Players" title="Players">
            <Players />
          </Tab>

          <Tab eventKey="Tables" title="Tables">
            {/* <TablesTab /> */}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Tournament;
