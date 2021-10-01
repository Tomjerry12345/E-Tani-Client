import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Register } from "../../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
