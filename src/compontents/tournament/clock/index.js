import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPause,
  faPlay,
} from "@fortawesome/fontawesome-free-solid";
import { useDispatch } from "react-redux";
import { startTournament } from "../../../redux/actions";
import { useEffect, useState } from "react";
import { twoDigits, useInterval } from "./functions";
import Button from "@restart/ui/esm/Button";

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
  STOPPED: "Stopped",
};

const INITIAL_COUNT = 120;

export const TournamentTimer = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const handleStart = () => setStatus(STATUS.STARTED);
  const handleStop = () => setStatus(STATUS.STOPPED);

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );
  return (
    <>
      <h1 style={{ fontSize: "5rem" }}>
        {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
      </h1>
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
