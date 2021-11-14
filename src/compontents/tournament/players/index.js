import {
  faUserPlus,
  faPlus,
  faTrash,
  faRandom,
  faRedo,
  faEllipsisV,
  faCoins,
  faEllipsisV,
  faRetweet,
  faTrash,
  faUserMinus,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table, Button, ListGroup, Dropdown } from "react-bootstrap";

export const AddPlayer = () => {
  return (
    <Form className="d-flex align-items-center">
      <Form.Control type="text" placeholder="Add new player" />
      <Button>
        <FontAwesomeIcon icon={faUserPlus} />
      </Button>
    </Form>
  );
};

export const PlayerListTable = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="small-screen">#</th>
          <th style={{ width: "25%" }}>Name</th>
          <th className="small-screen">Paid</th>
          <th className="small-screen">Re-buy</th>
          <th className="small-screen">Add-on</th>
          <th>Total</th>
          <th>Status</th>
          <th style={{ width: "38px" }}></th>
        </tr>
      </thead>
      <tbody>
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
        <PlayersListTableItem />
      </tbody>
    </Table>
  );
};

const PlayersListTableItem = () => {
  return (
    <tr>
      <td className="small-screen">1</td>
      <td className="small-screen"></td>
      <td className="small-screen"></td>
      <td className="small-screen"></td>
      <td></td>
      <td>10</td>
      <td>Playing</td>
      <td>
        <Buyin />
      </td>
    </tr>
  );
};

export const TableControls = () => {
  return (
    <>
      <Button>
        <FontAwesomeIcon icon={faRedo} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faRandom} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </>
  );
};

export const TableList = () => {
  return (
    <ListGroup>
      <ListGroup.Item
        variant="dark"
        className="d-flex justify-content-between align-items-center"
      >
        Table 1
        <Form.Group controlId="tournamentType">
          <Form.Select>
            <option>Select player</option>
            <option value="0">Player 1</option>
            <option value="0">Player 2</option>
            <option value="0">Player 3</option>
            <option value="0">Player 4</option>
          </Form.Select>
        </Form.Group>
        <Button>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </ListGroup.Item>

      <ListGroup.Item>1</ListGroup.Item>
      <ListGroup.Item>2</ListGroup.Item>
      <ListGroup.Item>3</ListGroup.Item>
      <ListGroup.Item>4</ListGroup.Item>
      <ListGroup.Item>5</ListGroup.Item>
      <ListGroup.Item>6</ListGroup.Item>
      <ListGroup.Item>7</ListGroup.Item>
      <ListGroup.Item>8</ListGroup.Item>
      <ListGroup.Item>9</ListGroup.Item>
    </ListGroup>
  );
};

export const PlayerMenu = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <FontAwesomeIcon icon={faEllipsisV} color="black" />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item>
          <FontAwesomeIcon icon={faCoins} /> Buy-in
        </Dropdown.Item>
        <Dropdown.Item disabled>
          <FontAwesomeIcon icon={faRetweet} /> Re-buy
        </Dropdown.Item>
        <Dropdown.Item disabled>
          <FontAwesomeIcon icon={faUserMinus} /> Bust out
        </Dropdown.Item>
        <Dropdown.Item>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
