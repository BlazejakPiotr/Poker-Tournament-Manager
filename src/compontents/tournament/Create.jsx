import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
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
    name: String,
    date: String,
    buyin: Number,
    type: "Freezout",
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

      <Modal show={show} onHide={handleClose}>
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
              <Form.Label>Buy-in</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => handleInput(e, "buyin")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tournamentType">
              <Form.Label>Tournament Type</Form.Label>
              <Form.Select onChange={(e) => handleInput(e, "type")}>
                <option value="0">Freezeout</option>
              </Form.Select>
            </Form.Group>
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
