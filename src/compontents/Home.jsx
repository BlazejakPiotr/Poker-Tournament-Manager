import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { setCurrentRound } from "../redux/actions/index.js";
import { CreateNewTournament, Footer, HomepageHeader } from "./home/index.js";


const Home = () => {
  useEffect(() => setCurrentRound(0), [])
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
