import { Container, Row, Col } from "react-bootstrap";
import Create from "./tournament/Create";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Create />
        </Col>
        <Col>2</Col>
      </Row>
    </Container>
  );
};
export default Home;
