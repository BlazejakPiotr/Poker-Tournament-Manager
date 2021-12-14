import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createNewTournament } from "../../redux/actions";

const Creator = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tournament, setTournament] = useState({
    name: "EUROPEAN POKER TOUR EPT 2021",
    // date: String,
    buyin: Number,
    currency: "USD",
    type: "Freezout",
    rebuy: null,
    addon: null,
    roundDur: 0,
    tournamentDur: 2,
    smallestChip: 5,
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

          <Form.Group className="mb-3" controlId="tournamentBuyin">
            <Form.Label>Buy-in cost</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => handleInput(e, "buyin")}
                />
              </Col>
              <Col>
                <Form.Select onChange={(e) => handleInput(e, "currency")}>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="tournamentType">
            <Form.Label>Tournament Type</Form.Label>
            <Form.Select onChange={(e) => handleInput(e, "type")}>
              <option value="Freezeout">Freezeout</option>
              <option value="Rebuys">Rebuys</option>
              <option value="Rebuys + Add-on">Rebuys + Add-on</option>
            </Form.Select>
          </Form.Group>
          {tournament.type === "Rebuys" && (
            <Form.Group className="mb-3" controlId="tournamentRebuy">
              <Form.Label>Rebuy cost</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => handleInput(e, "rebuy")}
              />
            </Form.Group>
          )}
          {tournament.type === "Rebuys + Add-on" && (
            <>
              <Form.Group className="mb-3" controlId="tournamentRebuy">
                <Form.Label>Rebuy cost</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => handleInput(e, "rebuy")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tournamentAddon">
                <Form.Label>Add-on cost</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => handleInput(e, "addon")}
                />
              </Form.Group>
            </>
          )}
        </Col>
        <Col lg={3}>
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
      </Row>
    </Form>
  );
};

export default Creator;
