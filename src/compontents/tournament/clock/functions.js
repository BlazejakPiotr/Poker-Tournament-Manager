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

export const DisplayCurrentRound = () => {
  const ante = useSelector((state) => state.tournament.data.ante);
  const round = useSelector((state) => state.tournament.blinds);
  const currentRoundIndex = useSelector(
    (state) => state.tournament.data.state.currentRound
  );
  return round[currentRoundIndex] ? (
    <>
      <h4 style={{ marginBottom: "0px" }}>
        {round[currentRoundIndex].break
          ? "Break"
          : `Round ${currentRoundIndex + 1}`}
      </h4>
      <h1>
        {!round[currentRoundIndex].break &&
          `$${round[currentRoundIndex].sb} / $${round[currentRoundIndex].bb}`}
      </h1>
      <h2>{ante && `($${round[currentRoundIndex].ante})`}</h2>
    </>
  ) : (
    "Set rounds!"
  );
};
