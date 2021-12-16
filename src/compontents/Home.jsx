import { Container } from "react-bootstrap";
import { CreateNewTournament } from "./home/index.js";

const Home = () => {
  return (
    <>
      <div className="bg-dark">
        <Container>
          <CreateNewTournament />
        </Container>
      </div>
    </>
  );
};
export default Home;
