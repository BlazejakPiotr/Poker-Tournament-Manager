import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowRoundsModal,
  setTournamentDuration,
  TOURNAMENT_STATUS,
} from "../../../redux/actions";
import { useInterval } from "../clock/functions";
import { LevelModal } from "../levels";

export const CurrentLocalTime = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return currentTime;
};

export const TournamentElapsedTime = () => {
  const status = useSelector((state) => state.tournament.data.state.status);
  const dispatch = useDispatch();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedHours, setElapsedHours] = useState(0);

  useInterval(
    () => {
      if (elapsedSeconds < 60) {
        setElapsedSeconds(elapsedSeconds + 1);
      }
      if (elapsedSeconds === 59) {
        setElapsedSeconds(0);
        setElapsedMinutes(elapsedMinutes + 1);
      }
      if (elapsedMinutes === 60) {
        setElapsedHours(elapsedHours + 1);
      }
    },
    status === TOURNAMENT_STATUS.LIVE ? 1000 : null
  );

  useEffect(() => {
    dispatch(
      setTournamentDuration({
        hours: elapsedHours,
        minutes: elapsedMinutes,
        seconds: elapsedSeconds,
      })
    );
  }, [elapsedMinutes]);

  return (
    <>
      {`${elapsedHours < 10 ? "0" + elapsedHours : elapsedHours}:${
        elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes
      }:${elapsedSeconds < 10 ? "0" + elapsedSeconds : elapsedSeconds}`}
    </>
  );
};

export const LevelsTable = () => {
  const blinds = useSelector((state) => state.tournament.blinds);
  const currentLevel = useSelector(
    (state) => state.tournament.data.state.currentRound
  );
  return (
    <>
      <Table
        striped
        borderless
        responsive
        hover
        variant="dark"
        className="m-0 scrollable-content"
      >
        <thead>
          <tr style={{ borderTop: "2px solid #212529" }}>
            <th style={{backgroundColor: "#1c1814"}}></th>
            <th style={{backgroundColor: "#1c1814", textAlign: "left"}}>#</th>
            <th style={{backgroundColor: "#1c1814"}}>
              Ante
            </th>
            <th style={{backgroundColor: "#1c1814"}}>SB</th>
            <th style={{backgroundColor: "#1c1814"}}>BB</th>
            <th style={{backgroundColor: "#1c1814"}}>
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {blinds.map((round, index) => (
            <LevelsTableItem
              index={index}
              round={round}
              key={index}
              currentLevel={currentLevel}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export const LevelsTableItem = ({ index, round, currentLevel }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.rounds);
  return (
    <>
      <tr
        onClick={() => dispatch(setShowRoundsModal(!modal, round, index))}
        className={index === currentLevel ? "currentLevel" : ""}

      >
        <td style={{width: "5%"}}>
          {index === currentLevel && <FontAwesomeIcon icon={faChevronRight} />}
        </td>
        <td style={{width:"20%", textAlign: "left"}}>{round.break ? "Break" : "Round " + (index + 1)}</td>
        <td style={{width: "15%"}}>{round.ante ?? "-"}</td>
        <td style={{width: "15%"}}>{round.sb}</td>
        <td style={{width: "15%"}}>{round.bb}</td>
        <td style={{width: "15%"}}>
          {round.duration} <small>min</small>
        </td>
      </tr>
      {/* <LevelModal round={round} index={index} /> */}
    </>
  );
};

export const PlayersTable = () => {
  const players = useSelector((state) => state.tournament.players);
  return (
    <Table
      striped
      borderless
      hover
      variant="dark"
      className="m-0 scrollable-content"
      style={{ border: "0px" }}
    >
      <thead>
        <tr style={{ borderTop: "2px solid #212529" }}>
          <th style={{ textAlign: "left" }}>Name</th>
          <th>Buyin</th>
          <th>Rebuy</th>
          <th>Cost</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <PlayersTableItem key={index} index={index} player={player} />
        ))}
      </tbody>
    </Table>
  );
};

export const PlayersTableItem = ({ index, player }) => {
  return (
    <tr>
      <td style={{ textAlign: "left" }}>{player.name}</td>
      <td>{player.buyin}</td>
      <td>Rebuy</td>
      <td>Cost</td>
      <td>Status</td>
    </tr>
  );
};

export const PrizesTable = () => {
  const data = useSelector((state) => state.tournament.data);

  return (
    <Table
      striped
      borderless
      hover
      variant="dark"
      className="m-0 scrollable-content"
      style={{ border: "0px" }}
    >
      <thead>
        <tr style={{ borderTop: "2px solid #212529" }}>
          <th style={{ textAlign: "left" }}>Place</th>
          <th>Winnings</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "left" }}>1st</td>
          <td>50 EUR</td>
          <td>50%</td>
        </tr>
      </tbody>
    </Table>
  );
};
