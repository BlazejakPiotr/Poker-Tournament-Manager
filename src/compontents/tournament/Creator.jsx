import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  clearRounds,
  createNewTournament,
  createRound,
} from "../../redux/actions";
import { RoundsContent } from "./blinds/index.js";

const Creator = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tournament, setTournament] = useState({
    name: "EUROPEAN POKER TOUR EPT 2021",
    type: "Freezout",
    date: "",
    roundDur: 15,
    tournamentDur: 2,
    smallestChip: 5,
    blinds: [],
    state: {
      status: "Scheduled",
      placements: [],
    },
  });

  const handleInput = (e, propertyName) => {
    setTournament({
      ...tournament,
      [propertyName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewTournament(tournament));
    history.push("/tournament");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={4}>
          <Form.Group className="mb-3" controlId="tournamentName">
            <Form.Label>Tournament name</Form.Label>
            <Form.Control
              type="text"
              placeholder="European Poker Tour - EPT 2021"
              required
              value={tournament.name}
              onChange={(e) => handleInput(e, "name")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tournamentType">
            <Form.Label>Tournament Type</Form.Label>
            <Form.Select onChange={(e) => handleInput(e, "type")}>
              <option value="Freezeout">Freezeout</option>
              <option value="Rebuys">Rebuys</option>
              <option value="Rebuys + Add-on">Rebuys + Add-on</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Round duration(min)</Form.Label>

            <Form.Control
              type="number"
              required
              value={tournament.roundDur}
              onChange={(e) => handleInput(e, "roundDur")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tournament duration(hrs)</Form.Label>

            <Form.Control
              type="number"
              required
              value={tournament.tournamentDur}
              onChange={(e) => handleInput(e, "tournamentDur")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Smallest chip</Form.Label>

            <Form.Control
              type="number"
              required
              value={tournament.smallestChip}
              onChange={(e) => handleInput(e, "smallestChip")}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Label>Level structure</Form.Label>
          {CalculateLevelStructure(
            tournament.roundDur,
            tournament.tournamentDur,
            tournament.smallestChip
          )}
          <RoundsContent />
        </Col>
      </Row>
    </Form>
  );
};

const CalculateLevelStructure = (roundDur, tournamentDur, smallestChip) => {
  const dispatch = useDispatch();
  // const blinds = useSelector((state) => state.tournament.blinds);
  dispatch(clearRounds());
  const [round, setRound] = useState({
    duration: roundDur,
    sb: 0,
    bb: smallestChip * 4,
    break: false,
  });
  // Calculate number of rounds
  const tournamentDurMins = parseInt(tournamentDur) * 60;
  const roundNumber = Math.round(tournamentDurMins / parseInt(roundDur));

  for (let i = 0; i < roundNumber; i++) {
    //     if (blinds.length < 1) {
    console.log(round);
    dispatch(createRound(round));
    //     } else {
    //       setRound({
    //         sb: blinds[i - 1] * 2,
    //         bb: round.sb * 2,
    //       });
    //     }
  }
};

export default Creator;
