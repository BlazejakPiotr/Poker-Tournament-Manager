import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BuyinAllPlayers, CreateNewPlayer } from "./players/functions.js";
import { PlayerListTable, PlayersContent } from "./players/index.js";

const Players = () => {
  return (
    <>
      <Row className="mb-3">
        <Col md={6} lg={5}>
          <CreateNewPlayer />
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayersContent />
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
    </>
  );
};

export default Players;
