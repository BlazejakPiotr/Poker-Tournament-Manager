import { Row, Col } from "react-bootstrap";
import { CreateNewPlayer, PlayersContent } from "./players/index.js";

const Players = () => {
  return (
    <>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <CreateNewPlayer />
          {/* <BuyinAllPlayers /> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayersContent />
        </Col>
      </Row>
    </>
  );
};

export default Players;
