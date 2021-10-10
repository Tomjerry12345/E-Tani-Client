import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Register } from "../../pages";
import LupaPassword from "../../pages/LupaPassword";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
