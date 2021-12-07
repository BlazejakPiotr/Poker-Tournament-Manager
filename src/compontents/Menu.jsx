import {
  Nav,
  Navbar,
  Dropdown,
  DropdownButton,
  NavDropdown,
  Container,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";

const Menu = () => {
  const data = useSelector((state) => state.tournament.data);
  const user = useSelector((state) => state.user);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Poker Tournament Manager</Navbar.Brand>

          <Nav className="mr-auto">
            <NavDropdown title={user.username} align="end" menuVariant="dark">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item href="/tournament">Tournament</NavDropdown.Item>
              <NavDropdown.Item>Tables</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
