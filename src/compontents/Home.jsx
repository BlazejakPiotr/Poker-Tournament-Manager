import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import Create from "./tournament/Create";
import {
  assignUserAsPlayer,
  createNewTournament,
  createNewUser,
} from "../redux/actions";
import Menu from "./Menu";
import { playerObj } from "./tournament/players/functions.js";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({ username: "Piotr" });

  const [tournament, setTournament] = useState({
    name: "EUROPEAN POKER TOUR EPT 2021",
    date: String,
    buyin: Number,
    currency: "USD",
    type: "Freezout",
    rebuy: null,
    addon: null,
    ante: false,
    state: {
      status: "Scheduled",
      placements: [],
      currentRound: 0,
    },
  });

  const handleInput = (e, propertyName) => {
    setTournament({
      ...tournament,
      [propertyName]:
        propertyName === "ante" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(user.username));
    dispatch(createNewTournament(tournament));
    history.push("/tournament");
  };

  return (
    <>
      <Container>
        <Row>
          <Col>text</Col>
          <Col md={12} lg={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="tournamentName">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User name"
                  required
                  value={user.username}
                  onChange={(e) => setUser({ username: e.target.value })}
                />
              </Form.Group>
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
              <Form.Group className="mb-3" controlId="tournamentDate">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) => handleInput(e, "date")}
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
                <Row>
                  <Col xs={8}>
                    <Form.Label>Tournament Type</Form.Label>

                    <Form.Select onChange={(e) => handleInput(e, "type")}>
                      <option value="Freezeout">Freezeout</option>
                      <option value="Rebuys">Rebuys</option>
                      <option value="Rebuys + Add-on">Rebuys + Add-on</option>
                    </Form.Select>
                  </Col>
                  <Col className="text-center">
                    <Form.Label>Ante</Form.Label>
                    <Form.Check
                      type="checkbox"
                      value={tournament.ante}
                      onChange={(e) => handleInput(e, "ante")}
                    />
                  </Col>
                </Row>
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
              <Button variant="primary" type="submit">
                Create tournament
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
