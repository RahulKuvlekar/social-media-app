import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "../Login/Login";
const Login = lazy(() => import("../../Pages/Login"));
const SignIn = lazy(() => import("../../Pages/SignIn"));
const JoinNow = lazy(() => import("../../Pages/JoinNow"));
const Home = lazy(() => import("../../Pages/Home"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/join-now" component={JoinNow} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/home" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
