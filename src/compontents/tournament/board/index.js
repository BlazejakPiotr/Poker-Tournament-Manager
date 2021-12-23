import { useEffect, useState } from "react";
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
