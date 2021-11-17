import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPlay,
} from "@fortawesome/fontawesome-free-solid";

export const ClockControls = () => {
  return (
    <div className="controls">
      <FontAwesomeIcon icon={faFastBackward} size="2x" />
      <FontAwesomeIcon icon={faPlay} size="2x" />
      <FontAwesomeIcon icon={faFastForward} size="2x" />
    </div>
  );
};
