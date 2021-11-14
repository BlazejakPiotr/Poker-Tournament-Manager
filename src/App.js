import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./compontents/Home";
import Tournament from "./compontents/tournament/Tournament";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tournament" component={Tournament} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
