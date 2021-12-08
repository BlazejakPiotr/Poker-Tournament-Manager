import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTotalPot,
  warningNotEnoughRounds,
} from "../../../redux/actions/index.js";
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

export const DisplayCurrentRound = () => {
  const dispatch = useDispatch();
  const ante = useSelector((state) => state.tournament.data.ante);
  const round = useSelector((state) => state.tournament.blinds);
  const currentRoundIndex = useSelector(
    (state) => state.tournament.data.state.currentRound
  );
  useEffect(() => {
    if (round.length === 0) {
      dispatch(warningNotEnoughRounds(true));
    } else {
      dispatch(warningNotEnoughRounds(false));
    }
  }, [round]);
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
    ""
  );
};

export const CalculateTotalPot = () => {
  const tournament = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  useEffect(() => {
    tournament.players.map((player) => {
      dispatch(setCurrentTotalPot(tournament.players));
    });
  }, [tournament.players]);

  return (
    <>
      <p>Total pot</p>
      <h2>{tournament.data.state.totalPot + tournament.data.currency}</h2>
    </>
  );
};
