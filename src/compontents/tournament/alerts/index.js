import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { warningNotEnoughRounds } from "../../../redux/actions";

export const AlertSetRoundsWarning = () => {
  const alerts = useSelector((state) => state.tournament.alerts);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(alerts.roundsWarning);
  }, [alerts]);
  if (show) {
    return (
      <Alert
        variant="warning"
        onClose={() => dispatch(warningNotEnoughRounds(false))}
        dismissible
      >
        <Alert.Heading>Not enough rounds to start</Alert.Heading>
        <p>
          You have to add rounds before starting the tournament. Go to the{" "}
          <b>Rounds</b> tab and set tournament levels structure.
        </p>
      </Alert>
    );
  } else {
    return "";
  }
};

export const AlertSetPlayersWarning = () => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant="warning" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Not enough players to start</Alert.Heading>
        <p>
          You have to add rounds before starting the tournament. Go to the{" "}
          <b>Rounds</b> tab and set tournament levels structure.
        </p>
      </Alert>
    );
  } else {
    return "";
  }
};
