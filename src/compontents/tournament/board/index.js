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
    <Table striped borderless hover variant="dark" className="m-0">
      <thead>
        <tr>
          <th>#</th>
          <th>SB</th>
          <th>BB</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const LevelsTableItem = () => {};

export const PrizesTable = () => {
  return (
    <Table striped borderless hover variant="dark" className="m-0">
      <thead>
        <tr variant="bg-primary">
          <th>Place</th>
          <th>Winnings</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1st place</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const PlayersTable = () => {
  return (
    <Table striped borderless hover variant="dark" className="m-0">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Status</th>
          <th>Buyin</th>
          <th>Rebuy</th>
          <th>Cost</th>
          <th>Place</th>
          <th>Winnings</th>
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
        <td>#</td>
        <td>Name</td>
        <td>Status</td>
        <td>Buyin</td>
        <td>Rebuy</td>
        <td>Total cost</td>
        <td>Place</td>
        <td>Winnings</td>
      </tr>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Status</td>
        <td>Buyin</td>
        <td>Rebuy</td>
        <td>Total cost</td>
        <td>Place</td>
        <td>Winnings</td>
      </tr>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Status</td>
        <td>Buyin</td>
        <td>Rebuy</td>
        <td>Total cost</td>
        <td>Place</td>
        <td>Winnings</td>
      </tr>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Status</td>
        <td>Buyin</td>
        <td>Rebuy</td>
        <td>Total cost</td>
        <td>Place</td>
        <td>Winnings</td>
      </tr>
    </tbody>
  );
};
