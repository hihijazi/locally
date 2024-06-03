import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Places from "./Places";
import SearchBar from "./SearchBar";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dropdown">
            <Dropdown />
          </Route>
          <Route exact path="/places">
            <Places />
          </Route>
          <Route exact path="/searchbar">
            <SearchBar />
          </Route>
          <Route exact path="/footer">
            <Footer />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
