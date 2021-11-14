import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const Create = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Form>
            <Form.Group className="mb-3" controlId="tournamentName">
              <Form.Label>Tournament name</Form.Label>
              <Form.Control
                type="text"
                placeholder="European Poker Tour - EPT 2021"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tournamentDate">
              <Form.Label>Date & Time</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tournamentBuyin">
              <Form.Label>Buy-in</Form.Label>
              <Form.Control type="number" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tournamentChips">
              <Form.Label>Starting chips</Form.Label>
              <Form.Control type="number" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tournamentType">
              <Form.Label>Tournament Type</Form.Label>
              <Form.Select>
                <option value="0">Freezeout</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Create;
