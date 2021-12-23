import { Container } from "react-bootstrap";
import { CreateNewTournament, Footer, HomepageHeader } from "./home/index.js";

const Home = () => {
  return (
    <>
      <div className="header">
        <Container fluid>
          <HomepageHeader />
        </Container>
      </div>
      <div className="creator">
        <Container>
          <CreateNewTournament />
        </Container>
      </div>
      <div className="footer bg-light text-dark">
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
};
export default Home;
