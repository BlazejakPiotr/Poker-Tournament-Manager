import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BuyinAllPlayers, CreateNewPlayer } from "./players/functions.js";
import { PlayerListTable } from "./players/index.js";

const Players = () => {
  return (
    <Row>
      <Col>
        <Row className="mb-4">
          <Col className="d-flex justify-content-between">
            <CreateNewPlayer />
            <BuyinAllPlayers />
          </Col>
        </Row>
        <Row>
          <Col>
            <PlayerListTable />
          </Col>
        </Row>
      </Col>
      {/* 
      // TABLES
      <Col >
         <Row className=" mb-4 "> 
          <Col className="d-flex justify-content-end">
            <TableControls />
          </Col>
        </Row>
         <Row>
          <Col md={4} lg={12}>
            <TableList />
          </Col>
          <Col md={4} lg={12}>
            <TableList />
          </Col>
          <Col md={4} lg={12}>
            <TableList />
          </Col>
        </Row> 
      </Col>*/}
    </Row>
  );
};

export default Players;
