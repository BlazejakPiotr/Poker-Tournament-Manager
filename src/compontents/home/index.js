import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import {
  createBlindsStructure,
  createNewTournament,
  createNewUser,
  TOURNAMENT_STATUS,
} from "../../redux/actions";
import { calculateNumberOfRounds } from "./functions";

export const CreateNewTournament = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({ username: "Piotr" });

  const [tournament, setTournament] = useState({
    name: "EUROPEAN POKER TOUR EPT 2021",
    currency: "USD",
    type: "Freezout",
    rebuy: undefined,
    expectedPlayers: 0,
    structure: {
      duration: 0,
      roundLength: 0,
      initialSB: 0,
    },
    state: {
      status: TOURNAMENT_STATUS.SCHEDULED,
      placements: [],
      currentRound: 0,
    },
  });

  const handleInput = (e, propertyName) => {
    if (propertyName === "duration" || "roundLength" || "initialSB") {
      setTournament({
        ...tournament,
        structure: {
          ...tournament.structure,
          [propertyName]: e.target.value,
        },
      });
    } else {
      setTournament({
        ...tournament,
        [propertyName]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(user.username));
    dispatch(createNewTournament(tournament));
    history.push("/tournament");
  };

  useEffect(() => {
    dispatch(createBlindsStructure(tournament.structure));
  }, [tournament.structure]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-5 tournament-form">
        <Col lg={5} className="px-4">
          {/* <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="User name"
              required
              value={user.username}
              onChange={(e) => setUser({ username: e.target.value })}
            />
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Tournament type</Form.Label>
            <Form.Select onChange={(e) => handleInput(e, "type")}>
              <option value="Freezeout">Freezeout</option>
              <option value="Rebuys">Rebuys</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tournament name</Form.Label>
            <Form.Control
              type="text"
              placeholder="European Poker Tour - EPT 2021"
              required
              value={tournament.name}
              onChange={(e) => handleInput(e, "name")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={tournament.date}
              onChange={(e) => handleInput(e, "date")}
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-between">
            <Col>
              <Form.Group>
                <Form.Label>Starting chips</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={tournament.chips}
                  onChange={(e) => handleInput(e, "chips")}
                />
              </Form.Group>
            </Col>{" "}
            <Col style={{ padding: "0px 1rem" }}>
              <Form.Group>
                <Form.Label>Buyin cost</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => handleInput(e, "buyin")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Currency</Form.Label>
                <Form.Select onChange={(e) => handleInput(e, "currency")}>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Form.Group>

          {tournament.type === "Rebuys" && (
            <Form.Group className="mb-3 d-flex justify-content-between align-items-end">
              <Col>
                <Form.Group>
                  <Form.Label>Rebuy chips</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    onChange={(e) => handleInput(e, "rebuyChips")}
                  />
                </Form.Group>
              </Col>
              <Col style={{ padding: "0px 1rem" }}>
                <Form.Group>
                  <Form.Label>Rebuy cost</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    onChange={(e) => handleInput(e, "rebuy")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last round</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    onChange={(e) => handleInput(e, "rebuyLast")}
                  />
                </Form.Group>
              </Col>
            </Form.Group>
          )}
        </Col>

        <Col lg={3} xl={2} className="px-4">
          <Form.Group className="mb-3">
            <Form.Label>Expected players</Form.Label>
            <Form.Control
              type="number"
              placeholder="9"
              value={tournament.expectedPlayers}
              required
              onChange={(e) => handleInput(e, "expectedPlayers")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Desired duration(hrs)</Form.Label>
            <Form.Control
              type="number"
              placeholder="3 hrs"
              value={tournament.structure.duration}
              required
              onChange={(e) => handleInput(e, "duration")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Round length(min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="20 min"
              value={tournament.structure.roundLength}
              required
              onChange={(e) => handleInput(e, "roundLength")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Initial small blind</Form.Label>
            <Form.Control
              type="number"
              placeholder="5"
              value={tournament.structure.initialSB}
              required
              onChange={(e) => handleInput(e, "initialSB")}
            />
          </Form.Group>
        </Col>
        <Col
          style={{ minHeight: "inherit", maxHeight: "inherit" }}
          className="px-4"
        >
          <div className="d-flex flex-column justify-content-between">
            <Form.Label>Blinds structure</Form.Label>
            <Table className="text-white">
              <thead>
                <tr>
                  <th style={{ paddingTop: "0px" }}>#</th>
                  <th style={{ paddingTop: "0px" }}>Time</th>
                  <th style={{ paddingTop: "0px" }}>Small blind</th>
                  <th style={{ paddingTop: "0px" }}>Big blind</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" type="submit" className="mb-3">
              Create tournament
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
