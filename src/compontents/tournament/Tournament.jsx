import { Container, Tab, Tabs } from "react-bootstrap";
import Players from "./Players";
import Board from "./Board";
import Blinds from "./Blinds";
import Clock from "./Clock";
import { DangerAlert, SuccessAlert } from "./alerts";

const Tournament = () => {
  return (
    <>
      <Container>
        {/* <AlertSetRoundsWarning /> */}
        <DangerAlert />
        <SuccessAlert />
        <Clock />
        <Tabs
          defaultActiveKey="Board"
          className="d-flex justify-content-evenly"
        >
          <Tab eventKey="Board" title="Board">
            <Board />
          </Tab>
          <Tab eventKey="Rounds" title="Rounds">
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
