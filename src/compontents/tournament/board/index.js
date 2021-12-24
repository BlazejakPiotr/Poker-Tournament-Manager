import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setTournamentDuration,
  TOURNAMENT_STATUS,
} from "../../../redux/actions";
import { useInterval } from "../clock/functions";

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
  return (
    <Table
      striped
      borderless
      hover
      variant="dark"
      className="m-0"
      style={{ border: "0px" }}
    >
      <thead>
        <tr style={{ borderTop: "2px solid #212529" }}>
          <th style={{ textAlign: "left" }}>#</th>
          <th>A</th>
          <th>SB</th>
          <th>BB</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "left" }}>Round 1</td>
          <td>-</td>
          <td>5</td>
          <td>10</td>
          <td>20'</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const LevelsTableItem = () => {};

export const PlayersTable = () => {
  return (
    <Table
      striped
      borderless
      hover
      variant="dark"
      className="m-0"
      style={{ border: "0px" }}
    >
      <thead>
        <tr style={{ borderTop: "2px solid #212529" }}>
          <th style={{ textAlign: "left" }}>Name</th>
          <th>Buyin</th>
          <th>Rebuy</th>
          <th>Add-on</th>
          <th>Cost</th>
          <th>Status</th>
        </tr>
      </thead>
      <PlayersTableItem />
    </Table>
  );
};

export const PlayersTableItem = () => {
  return (
    <tbody>
      <tr>
        <td style={{ textAlign: "left" }}>Sir fuck you</td>
        <td>Buyin</td>
        <td>Rebuy</td>
        <td>Add-on</td>
        <td>Cost</td>
        <td>Status</td>
      </tr>
      <tr>
        <td style={{ textAlign: "left" }}>Sir fuck you</td>
        <td>Buyin</td>
        <td>Rebuy</td>
        <td>Add-on</td>
        <td>Cost</td>
        <td>Status</td>
      </tr>
    </tbody>
  );
};
