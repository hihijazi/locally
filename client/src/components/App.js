import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Places from "./Places";  

function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/header/">
            <Header />
          </Route>
          <Route exact path="/dropdown/">
            <Dropdown />
          </Route>
          <Route exact path="/places/">
            <Places />
          </Route>
          <Route exact path="/footer/">
            <Footer />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
