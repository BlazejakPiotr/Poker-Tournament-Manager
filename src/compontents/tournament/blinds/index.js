import { faPlus } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Form } from "react-bootstrap";

export const AddBlind = () => {
  return (
    <Form className="d-flex align-items-center">
      <Form.Control type="number" placeholder="ante" required />
      <Form.Control type="number" placeholder="small blind" required />
      <Form.Control type="number" placeholder="big blind" required />
      <Form.Control type="number" placeholder="duration" required />
      <Button>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Form>
  );
};

export const AddBreak = () => {
  return (
    <Form className="d-flex align-items-center">
      <Form.Control type="number" placeholder="duration" required />
      <Button>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Form>
  );
};

export const BlindsListTable = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Duration</th>
          <th>Ante</th>
          <th>Small Blind</th>
          <th>Big Blind</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        <BlindsListTableItem />
        <BlindsListTableItem />
      </tbody>
    </Table>
  );
};

export const BlindsListTableItem = () => {
  return (
    <tr>
      <td>1</td>
      <td>10 min</td>
      <td>0</td>
      <td>10</td>
      <td>20</td>
      <td>...</td>
    </tr>
  );
};
