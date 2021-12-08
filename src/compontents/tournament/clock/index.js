import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPause,
  faPlay,
} from "@fortawesome/fontawesome-free-solid";
import { setCurrentRound, startTournament } from "../../../redux/actions";
import { useEffect, useState } from "react";
import { twoDigits, useInterval } from "./functions";
import { useSelector, useDispatch } from "react-redux";

export const ClockButtons = () => {
  const dispatch = useDispatch();
  return (
    <div className="controls">
      <FontAwesomeIcon icon={faFastBackward} size="2x" />
      <FontAwesomeIcon
        icon={faPlay}
        size="2x"
        onClick={() => dispatch(startTournament())}
      />
      <FontAwesomeIcon icon={faFastForward} size="2x" />
    </div>
  );
};

const STATUS = {
  STARTED: "Started",
  NEXT: "Next round",
  STOPPED: "Stopped",
};

let CURRENT_ROUND_INDEX = 0;

export const TournamentTimer = () => {
  const rounds = useSelector((state) => state.tournament.blinds);
  const data = useSelector((state) => state.tournament.data);
  const dispatch = useDispatch();
  const [secondsRemaining, setSecondsRemaining] = useState();
  const [status, setStatus] = useState(STATUS.STOPPED);

  useEffect(() => {
    if (rounds.length === 1) {
      dispatch(setCurrentRound(0));
      setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration * 60);
    }
  }, [rounds]);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);
    if (data.state.status === "Scheduled") {
      dispatch(startTournament());
    }
  };
  const handleStop = () => setStatus(STATUS.STOPPED);

  useInterval(
    () => {
      if (secondsRemaining === 0) {
        if (CURRENT_ROUND_INDEX < rounds.length - 1) {
          CURRENT_ROUND_INDEX++;
          dispatch(setCurrentRound(CURRENT_ROUND_INDEX));
          setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration * 60);
          setStatus(STATUS.STARTED);
        } else {
          setCurrentRound(rounds[0]);
          setStatus(STATUS.STARTED);
          setStatus(STATUS.STOPPED);
        }
      }
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <>
      <h2 style={{ fontSize: "5rem" }}>
        {rounds[CURRENT_ROUND_INDEX]
          ? twoDigits(minutesToDisplay) + ":" + twoDigits(secondsToDisplay)
          : "00:00"}
      </h2>
      <div>
        {status === STATUS.STOPPED ? (
          <FontAwesomeIcon icon={faPlay} size="2x" onClick={handleStart} />
        ) : (
          <FontAwesomeIcon icon={faPause} size="2x" onClick={handleStop} />
        )}
      </div>
    </>
  );
};
