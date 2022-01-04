import { Container, Tab, Tabs, Row, Col, Table } from "react-bootstrap";
import { PlayersList } from "./players.js";
import Board from "./Board";
import Blinds from "./Blinds";
import Players from "./Players.jsx";
import Clock from "./Clock";
import { DangerAlert, SuccessAlert } from "./alerts";
import { useSelector } from "react-redux";
import { LevelsList } from "./levels.js";
import { TournamentTimer } from "./clock/index.js";
import { CurrentLocalTime, TournamentElapsedTime } from "./board/index.js";
import {
  calculatePaidinPlayers,
  calculateRebuys,
  CalculateTotalPot,
} from "./clock/functions.js";


const Tournament = () => {
  const tournament = useSelector((state) => state.tournament);
  return (
    <Container className="clock bg-dark">
      <Board />
    </Container>
  );
};

export default Tournament;
