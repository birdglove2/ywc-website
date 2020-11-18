import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/ywc-website" exact component={Homepage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
