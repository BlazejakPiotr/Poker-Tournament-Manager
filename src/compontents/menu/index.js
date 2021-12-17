import {
  faChevronDown,
  faUserCircle,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal, Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeUserStatus, createNewUser } from "../../redux/actions";
import avatarImg from "../../img/avatar.jpg";

export const LoginModal = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(user));
    dispatch(changeUserStatus(true));
    handleClose();
  };

  return (
    <>
      <Button variant="danger" className="btn" onClick={handleShow}>
        Sign in
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center px-5">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="8x"
            color="#ab2c17"
            className="mb-4"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="d-flex justify-content-between mb-4">
              <Form.Check
                inline
                label="Remember me"
                name="group1"
                type="checkbox"
              />
              <a style={{ textDecoration: "underline" }}>Forgot password?</a>
            </div>
            <Button variant="danger" type="submit" className="w-100 mb-4">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Nav>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <div
            className="bg-secondary d-flex justify-content-between align-items-center p-0 px-3"
            style={{ borderRadius: "16px" }}
          >
            <img src={avatarImg} alt="avatar" />
            <NavDropdown
              title={user.username}
              menuVariant="dark"
              className="p-0"
            >
              <NavDropdown.Item href="/tournament">Tournament</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => dispatch(changeUserStatus(false))}
              >
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Nav>
  );
};
