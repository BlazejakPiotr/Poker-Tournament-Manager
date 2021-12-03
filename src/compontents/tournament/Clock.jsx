import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetTournamentState } from "../../redux/actions/index.js";

import { TournamentTimer } from "./clock/index.js";

const Clock = () => {
  const tournament = useSelector((state) => state.tournament);
  const currentRound = tournament.data.state.currentRound;
  const dispatch = useDispatch();
  return (
    <Row className="py-3">
      <Col xs={12}>
        <h2>{tournament.data.name}</h2>
      </Col>
      <Col className="d-flex flex-column justify-content-end text-center">
        <h4 style={{ marginBottom: "0px" }}>Round {currentRound.name + 1}</h4>
        <h1>
          {currentRound.sb}/{currentRound.bb} ({currentRound.ante})
        </h1>
        {/*Row className="py-5">
      <Row>
        <Col>
          <h2>{tournament.data.name}</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => dispatch(resetTournamentState())}>
            RESET
          </Button>
          <Button>
            Settings <FontAwesomeIcon icon={faCog} />{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center" md={4}>
          <p>{tournament.data.date}</p>
          <h6>
            Buyin {tournament.data.buyin} {tournament.data.currency}
          </h6>
          <h6>
            {tournament.data.rebuy > 0 &&
              "Rebuy " + tournament.data.rebuy + tournament.data.currency}
          </h6>
          <h6>
            {tournament.data.addon > 0 &&
              "Add-on" + tournament.data.addon + tournament.data.currency}
          </h6> */}
      </Col>
      <Col className="text-center" md={4}>
        <div>
          <TournamentTimer />
        </div>
      </Col>

      <Col className="d-flex flex-column justify-content-end text-center">
        <h4 style={{ marginBottom: "0px" }}>Players</h4>
        <h1>10/10</h1>
      </Col>
    </Row>
  );
};
export default Clock;
