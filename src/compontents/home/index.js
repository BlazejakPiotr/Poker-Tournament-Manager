import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import {
  clearBlindsStructure,
  clearTournamentData,
  createBlindsStructure,
  createExpectedPlayers,
  createNewTournament,
  createNewUser,
  TOURNAMENT_STATUS,
} from "../../redux/actions";
import mePhoto from "../../img/me.jpg";
import reactLogo from "../../img/react-logo.png";
import bootstrapLogo from "../../img/reactbootstrap-logo.png";

export const HomepageHeader = () => {
  return (
    <Row className="p-3">
      <Col className="p-4" xs={12}></Col>
      <Col>f</Col>
    </Row>
  );
};

export const CreateNewTournament = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const blinds = useSelector((state) => state.tournament.blinds);

  const [user, setUser] = useState({ username: "Piotr" });

  const [tournament, setTournament] = useState({
    name: "EUROPEAN POKER TOUR EPT 2021",
    currency: "USD",
    type: "Freezout",
    buyin: 0,
    rebuy: 0,
    rebuyLast: 0,
    startingChips: 0,
    rebuyChips: 0,
    state: {
      status: TOURNAMENT_STATUS.SCHEDULED,
      placements: [],
      currentRound: 0,
    },
  });

  const [structure, setStructure] = useState({
    expectedPlayers: 0,
    duration: 2,
    roundLength: 15,
    initialSB: 5,
  });

  const handleInput = (e, propertyName) => {
    setTournament({
      ...tournament,
      [propertyName]: e.target.value,
    });
  };

  const handleStructureInput = (e, propertyName) => {
    setStructure({
      ...structure,
      [propertyName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearTournamentData());
    dispatch(createNewTournament(tournament));
    dispatch(createExpectedPlayers(structure.expectedPlayers));
    history.push("/tournament");
  };

  useEffect(() => {
    dispatch(clearBlindsStructure());
    if (
      structure.duration > 0 &&
      structure.roundLength > 0 &&
      structure.initialSB > 0
    )
      dispatch(createBlindsStructure(structure));
  }, [structure]);

  return (
    <>
      <h2 className="mb-4">Set tournament structure</h2>

      <Form onSubmit={handleSubmit}>
        <Row className="tournament-form">
          <Col lg={5} className="d-flex flex-column">
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
                required
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
                    onChange={(e) => handleInput(e, "startingChips")}
                  />
                </Form.Group>
              </Col>
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
                  <Form.Select
                    value={tournament.currency}
                    onChange={(e) => handleInput(e, "currency")}
                  >
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
                      value={tournament.rebuy}
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
                      value={tournament.rebuyLast}
                      required
                      onChange={(e) => handleInput(e, "rebuyLast")}
                    />
                  </Form.Group>
                </Col>
              </Form.Group>
            )}
          </Col>

          <Col lg={3} xl={3} className="d-flex flex-column">
            <Form.Group className="mb-3">
              <Form.Label>Expected players</Form.Label>
              <Form.Control
                type="number"
                placeholder="9"
                required
                onChange={(e) => handleStructureInput(e, "expectedPlayers")}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Desired duration(hrs)</Form.Label>
              <Form.Control
                type="number"
                placeholder="3 hrs"
                required
                onChange={(e) => handleStructureInput(e, "duration")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Round length(min)</Form.Label>
              <Form.Control
                type="number"
                placeholder="20 min"
                required
                onChange={(e) => handleStructureInput(e, "roundLength")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Initial small blind</Form.Label>
              <Form.Control
                type="number"
                placeholder="5"
                required
                onChange={(e) => handleStructureInput(e, "initialSB")}
              />
            </Form.Group>
          </Col>
          <Col className="h-100">
            <Form.Label>Blinds structure</Form.Label>
            <div className="p-2 mb-3">
              <Table className="text-white">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>#</th>
                    <th style={{ width: "35%" }}>Small blind</th>
                    <th style={{ width: "35%" }}>Big blind</th>
                    <th style={{ width: "15%" }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {blinds &&
                    blinds.map((round, index) => {
                      if (index < 5) {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>$ {round.sb}</td>
                            <td>$ {round.bb}</td>
                            <td>{round.duration} ' </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </Table>
              <div className="p-1">... and {blinds.length - 5} more rounds</div>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="danger" type="submit">
            Create tournament
          </Button>
        </div>
      </Form>
    </>
  );
};

export const Footer = () => {
  return (
    <>
      <Row className="footer mb-3">
        <h2 style={{ marginBottom: "2rem" }}>About author</h2>
        <Col xs={12} sm={6} md={5} lg={4} xl={3}>
          <img src={mePhoto} alt="photo of me" className="mePhoto" />
        </Col>
        <Col xs={12} sm={6}>
          <p>
            My name is Piotr Błażejak, I'm from Poland and I am Front-end
            webdeveloper!
          </p>
          <p>
            Poker Tournament Manager is a free web app to manage home-made poker
            tournaments. Idea to create this application came about 5 years ago
            but I didn't know how to code. At this time web apps like this
            wasn't available and there was no point of buying proffesional
            program like The Tournament Director just for kitchen table
            tournaments created for few people.
          </p>
          <p>This application was created by Strive School student.</p>
        </Col>
        <Col className="d-flex flex-column justify-content-between  tools-img">
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/react/react-original.svg"
            alt="react logo"
          />
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/redux/redux-original.svg"
            alt="redux logo"
          />
          <img src={bootstrapLogo} alt="react bootstrap logo" />
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};
