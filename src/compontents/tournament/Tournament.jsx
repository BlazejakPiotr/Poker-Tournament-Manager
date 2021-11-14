import { Container, Tab, Tabs } from "react-bootstrap";
import Players from "./Players";
import Clock from "./Clock";
import Blinds from "./Blinds";

const Tournament = () => {
  return (
    <Container fluid>
      <Tabs defaultActiveKey="Clock" className="d-flex justify-content-evenly">
        <Tab eventKey="Clock" title="Clock">
          <Clock />
        </Tab>

        <Tab eventKey="Players" title="Players">
          <Players />
        </Tab>
        <Tab eventKey="Blinds" title="Blinds">
          <Blinds />
        </Tab>
        <Tab eventKey="Settings" title="Settings">
          {/* <TablesTab /> */}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Tournament;
