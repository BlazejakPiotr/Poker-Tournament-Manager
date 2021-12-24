import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRedo,
  faStop,
  faVolumeUp,
} from "@fortawesome/fontawesome-free-solid";
import {
  changeTournamentStatus,
  displayDangerAlert,
  setCurrentRound,
  setTournamentDuration,
  TOURNAMENT_STATUS,
  updateCurrentRoundIndex,
} from "../../../redux/actions";
import { Button } from "react-bootstrap";
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
    setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration * 60);
  }, []);

  useEffect(() => setStatus(data.state.status), [data.state.status]);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useEffect(() => {
    setStatus(data.state.status);
  }, []);

  const handleStart = () => {
    dispatch(changeTournamentStatus(TOURNAMENT_STATUS.LIVE));
  };
  const handleStop = () => {
    dispatch(changeTournamentStatus(TOURNAMENT_STATUS.PAUSED));
  };
  const handleEnd = () =>
    dispatch(changeTournamentStatus(TOURNAMENT_STATUS.FINISHED));

  const handleReset = () => {
    dispatch(changeTournamentStatus(TOURNAMENT_STATUS.SCHEDULED));
    dispatch(updateCurrentRoundIndex(0));
    dispatch(
      setTournamentDuration({
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
    );
  };

  useInterval(
    () => {
      if (secondsRemaining === 0) {
        if (CURRENT_ROUND_INDEX < rounds.length - 1) {
          dispatch(setCurrentRound(CURRENT_ROUND_INDEX + 1));
          setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration);
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
  if (status === TOURNAMENT_STATUS.FINISHED) {
    return "";
  }
  return (
    <>
      <h4 className="d-flex flex-column justify-content-center align-items-center">
        {twoDigits(minutesToDisplay) + ":" + twoDigits(secondsToDisplay)}
      </h4>

      <div
        className="d-flex justify-content-center"
        style={{ backgroundColor: "#212529" }}
      >
        <button
          className="time-controls px-3"
          onClick={() => {
            if (CURRENT_ROUND_INDEX > 0) {
              dispatch(updateCurrentRoundIndex(CURRENT_ROUND_INDEX - 1));
            }
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>

        {status === TOURNAMENT_STATUS.LIVE ? (
          <button className="time-controls px-3" onClick={handleStop}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button className="time-controls px-3" onClick={handleStart}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <button className="time-controls">
          <FontAwesomeIcon
            icon={faForward}
            onClick={() => {
              if (CURRENT_ROUND_INDEX < rounds.length - 1) {
                dispatch(updateCurrentRoundIndex(CURRENT_ROUND_INDEX + 1));
                setSecondsRemaining(rounds[CURRENT_ROUND_INDEX].duration);
              }
            }}
          />
        </button>
      </div>
    </>
  );
};

// {status === TOURNAMENT_STATUS.LIVE && (
//   <>
//     {twoDigits(minutesToDisplay) + ":" + twoDigits(secondsToDisplay)}
//     <FontAwesomeIcon icon={faPause} size="2x" onClick={handleStop} />
//   </>
// )}
{
  /* {status === TOURNAMENT_STATUS.FINISHED ? (
        <>
          <FontAwesomeIcon
            icon={faRedo}
            size="2x"
            onClick={handleStart}
            onClick={handleReset}
          />
        </>
      ) : (
        <>
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
      )} */
  // </>
  // );
}
