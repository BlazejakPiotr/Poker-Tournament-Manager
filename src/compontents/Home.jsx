import { Container, Row, Col, Button } from "react-bootstrap";
import backgroundimg from "../img/whiskey.png";
import Creator from "./tournament/Creator";

const Home = () => {
  return (
    <>
      <Container>
        <Row className="welcome">
          <Col
            className="py-5 d-flex flex-column justify-content-center"
            md={12}
            lg={6}
          >
            <h1 className="my-3" style={{ fontWeight: "bold" }}>
              Poker tournament manager
            </h1>
            <h4 className="my-3">
              Manage your home-made poker tournament like a pro
            </h4>
            <Button className="my-3 px-4 w-50" style={{ fontSize: "1.5rem" }}>
              START FOR FREE
            </Button>
          </Col>
          <Col md={12} lg={6}>
            {/* <img src={backgroundimg} style={{ maxHeight: "400px" }} /> */}
          </Col>
        </Row>
        <Row className="creator py-5">
          <Col xs={12}>
            <h4>Tournament parameters</h4>
          </Col>

          <Creator />
        </Row>
      </Container>
    </>
  );
};
export default Home;
