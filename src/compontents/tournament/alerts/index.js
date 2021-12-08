import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  displayDangerAlert,
  hideDangerAlert,
  hideSuccessAlert,
} from "../../../redux/actions";

export const DangerAlert = () => {
  const alerts = useSelector((state) => state.tournament.alerts);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(!show);
  }, [alerts]);

  if (alerts.notEnoughRounds) {
    return (
      <div style={{ position: "relative" }}>
        <Alert
          variant="danger"
          style={{ position: "absolute", width: "100%" }}
          onClose={() => dispatch(hideDangerAlert("notEnoughRounds"))}
          dismissible
        >
          <Alert.Heading>Not enough rounds to start tournament!</Alert.Heading>
          <p>You have to setup rounds for tournament before start.</p>
          <p>
            Go to the <b>Rounds</b> tab to manage levels
          </p>
        </Alert>
      </div>
    );
  }
  if (alerts.notEnoughPlayers) {
    return (
      <div style={{ position: "relative" }}>
        <Alert
          variant="danger"
          style={{ position: "absolute", width: "100%" }}
          onClose={() => dispatch(hideDangerAlert("notEnoughPlayers"))}
          dismissible
        >
          <Alert.Heading>
            You need atleast 2 bought-in players to start tournament!
          </Alert.Heading>
          <p>It seems like you don't have enough people to play with</p>
          <p>
            Go to the <b>Players</b> tab and check if there is atleast 2 players
            registered and bought in!
          </p>
        </Alert>
      </div>
    );
  } else return "";
};

export const SuccessAlert = () => {
  const alerts = useSelector((state) => state.tournament.alerts);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(!show);
  }, [alerts]);

  if (alerts.tournamentCreated) {
    return (
      <div style={{ position: "relative" }}>
        <Alert
          variant="success"
          style={{ position: "absolute", width: "100%" }}
          onClose={() => dispatch(hideSuccessAlert("tournamentCreated"))}
        >
          <p>Tournament has been created succesfuly!</p>
        </Alert>
      </div>
    );
  } else return "";
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
