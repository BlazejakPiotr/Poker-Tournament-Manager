import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CalculateTotalPot, tournamentTimer } from "./clock/functions.js";
import { CurrentLocalTime, TournamentElapsedTime } from "./board/index.js";

import { calculatePlayersLeft } from "./players/functions";
import { useDispatch } from "react-redux";
import {
  displaySuccessAlert,
  hideSuccessAlert,
} from "../../redux/actions/index.js";
import Clock from "./Clock.jsx";

const Board = () => {
  const tournament = useSelector((state) => state.tournament);

  return (
    <>
      <Row>
        <Col>
          <h1>{tournament.data.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="clock">
          <div>
            <p>Buyin</p>
            <h2>
              {tournament.data.buyin}
              {tournament.data.currency}
            </h2>
          </div>
          <div>
            <p>Rebuy</p>
            <h2>
              {tournament.data.rebuy
                ? tournament.data.rebuy + tournament.data.currency
                : "-"}
            </h2>
          </div>
          <div>
            <p>Add-on</p>
            <h2>
              {" "}
              {tournament.data.addon
                ? tournament.data.addon + tournament.data.currency
                : "-"}
            </h2>
          </div>
        </Col>
        <Col md={7} className="clock">
          {/* <AlertSetRoundsWarning /> */}

          <Clock />
        </Col>
        <Col className="clock">
          <div>
            <p>Scheduled</p>
            <h2>{tournament.data.date.slice(0, 10)}</h2>
          </div>
          <div>
            <CurrentLocalTime />
          </div>
          <div>
            <TournamentElapsedTime />
          </div>
          <div></div>
        </Col>
      </Row>
    </>
  );
};

export default Board;
