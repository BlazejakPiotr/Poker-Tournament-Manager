import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPlay,
} from "@fortawesome/fontawesome-free-solid";
import { useDispatch } from "react-redux";
import { startTournament } from "../../../redux/actions";
import { useEffect, useState } from "react";

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

export const TournamentTimer = () => {};
