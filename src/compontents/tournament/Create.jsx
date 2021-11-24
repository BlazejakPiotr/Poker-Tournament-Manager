import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createNewTournament } from "../../redux/actions";

const Create = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const [tournament, setTournament] = useState({
    name: "EUROPEAN POKER TOUR EPT 2021",
    date: String,
    buyin: Number,
    currency: "USD",
    type: "Freezout",
    rebuy: null,
    addon: null,
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
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create tournament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Create;
