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
import { LoginModal, UserMenu } from "./menu/index.js";

const Menu = () => {
  const data = useSelector((state) => state.tournament.data);
  const user = useSelector((state) => state.user);
  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/">Poker Tournament Manager</Navbar.Brand>
          {user.logged ? <UserMenu /> : <LoginModal />}
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
