import { Container, Tab, Tabs } from "react-bootstrap";
import Players from "./Players";
import Board from "./Board";
import Blinds from "./Blinds";
import Clock from "./Clock";
import { DangerAlert, SuccessAlert } from "./alerts";

const Tournament = () => {
  return (
    <>
      <Container fluid>
        <h1 className="text-center">NAME</h1>
        <Tabs
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
