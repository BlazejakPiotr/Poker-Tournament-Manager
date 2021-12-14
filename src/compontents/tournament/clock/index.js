import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/fontawesome-free-solid";
import {
  changeTournamentStatus,
  displayDangerAlert,
  setCurrentRound,
  TOURNAMENT_STATUS,
  updateCurrentRoundIndex,
} from "../../../redux/actions";
import { useEffect, useState } from "react";
import { calculatePaidinPlayers, twoDigits, useInterval } from "./functions";
import { useSelector, useDispatch } from "react-redux";

export const TournamentTimer = () => {
  const dispatch = useDispatch();
  const rounds = useSelector((state) => state.tournament.blinds);
  const players = useSelector((state) => state.tournament.players);
  const data = useSelector((state) => state.tournament.data);
  let CURRENT_ROUND_INDEX = data.state.currentRound;

  const [secondsRemaining, setSecondsRemaining] = useState();
  const [status, setStatus] = useState(data.state.status);

  useEffect(() => {
    dispatch(setCurrentRound(CURRENT_ROUND_INDEX));
    setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration);
  }, []);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useEffect(() => {
    setStatus(data.state.status);
  }, []);

  const handleStart = () => {
    if (TOURNAMENT_STATUS.SCHEDULED) {
      if (rounds.length < 1) {
        return dispatch(displayDangerAlert("notEnoughRounds"));
      }
      if (calculatePaidinPlayers(players) < 2) {
        dispatch(displayDangerAlert("notEnoughPlayers"));
      } else {
        dispatch(changeTournamentStatus(TOURNAMENT_STATUS.LIVE));
      }
    } else {
    }
  };
  const handleStop = () =>
    dispatch(changeTournamentStatus(TOURNAMENT_STATUS.PAUSED));

  useInterval(
    () => {
      if (secondsRemaining === 0) {
        if (CURRENT_ROUND_INDEX < rounds.length - 1) {
          dispatch(setCurrentRound(CURRENT_ROUND_INDEX + 1));
          setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration);
          dispatch(changeTournamentStatus(TOURNAMENT_STATUS.LIVE));
        }
        if (data.state.currentRound === rounds.length - 1) {
          dispatch(changeTournamentStatus(TOURNAMENT_STATUS.FINISHED));
        }
      }
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    },
    status === TOURNAMENT_STATUS.LIVE ? 1000 : null
  );

  return (
    <>
      <h4>{status}</h4>
      <h2 style={{ fontSize: "5rem" }}>
        {rounds[CURRENT_ROUND_INDEX]
          ? twoDigits(minutesToDisplay) + ":" + twoDigits(secondsToDisplay)
          : "--:--"}
      </h2>
      <div>
        {status === TOURNAMENT_STATUS.PAUSED ||
        status === TOURNAMENT_STATUS.SCHEDULED ? (
          <FontAwesomeIcon icon={faPlay} size="2x" onClick={handleStart} />
        ) : (
          <FontAwesomeIcon icon={faPause} size="2x" onClick={handleStop} />
        )}
      </div>
    </>
  );
};
