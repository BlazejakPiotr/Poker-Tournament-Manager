import {
  Nav,
  Navbar,
  Dropdown,
  DropdownButton,
  NavDropdown,
  Container,
  Button,
} from "react-bootstrap";

import RoundsSettings from "./tournament/blinds/RoundsSettings";

const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">PTM</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="TOURNAMENT" align="end" menuVariant="dark">
            <NavDropdown.Item>General</NavDropdown.Item>
            <RoundsSettings />
            <NavDropdown.Item>Players</NavDropdown.Item>
            <NavDropdown.Item>Tables</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
