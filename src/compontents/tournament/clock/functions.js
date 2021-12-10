import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TOURNAMENT_STATUS,
  updateTotalPot,
} from "../../../redux/actions/index.js";

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
  const status = useSelector((state) => state.tournament.data.state.status);
  if (status === TOURNAMENT_STATUS.SCHEDULED) {
    return <h1>{status}</h1>;
  }
  if (status === TOURNAMENT_STATUS.FINISHED) return <h1>FINISHED</h1>;
  else
    return round[currentRoundIndex] ? (
      <>
        <h4 style={{ marginBottom: "0px" }}>
          {round[currentRoundIndex].break
            ? "Break"
            : `Round ${currentRoundIndex + 1}`}
        </h4>
        <h2>
          {!round[currentRoundIndex].break &&
            `${round[currentRoundIndex].sb} / ${round[currentRoundIndex].bb}`}
        </h2>
        <h2>{ante && `(${round[currentRoundIndex].ante})`}</h2>
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
      dispatch(updateTotalPot(tournament.players));
    });
  }, [tournament.players]);

  return (
    <>
      <p>Total pot</p>
      <h2>{tournament.data.state.totalPot + tournament.data.currency}</h2>
    </>
  );
};

export const calculatePaidinPlayers = (players) => {
  let paid = [];
  players.map((player) => {
    if (player.buyin) paid = [...paid, { player }];
    else return;
  });
  return paid.length;
};
