import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TournamentTimer } from "./index.js";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const twoDigits = (num) => String(num).padStart(2, "0");

export const convertMinutesToSeconds = (num) => num * 60;

export const SetClock = () => {
  const tournament = useSelector((state) => state.tournament);
  if (!tournament.blinds) {
    return <h1>Create first round!</h1>;
  } else {
    <TournamentTimer />;
  }
};
