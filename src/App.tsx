import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { RootState } from "./app/store";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  const {id}: {id: number} = useSelector( (state: RootState) => state.movie);

  if (!sessionStorage.getItem("movies")){
    sessionStorage.setItem("movies",JSON.stringify([]));
  }

  return (
    <Router>
      <Navbar />
      
      <Switch>
        <Route exact path={`/movie/${id}`}>
          <About />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
