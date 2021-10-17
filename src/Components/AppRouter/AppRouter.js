import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { userAuthenticationStatus } from "../../Redux/Actions/authActions";
import { connect } from "react-redux";

// import Login from "../Login/Login";
const Login = lazy(() => import("../../Pages/Login"));
const SignUp = lazy(() => import("../../Pages/SignUp"));
const JoinNow = lazy(() => import("../../Pages/JoinNow"));
const Home = lazy(() => import("../../Pages/Home"));

const AppRouter = (props) => {
  const { userAuthenticationStatus } = props; //take care of useEffect dependency
  useEffect(() => {
    userAuthenticationStatus();
  }, [userAuthenticationStatus]);

  return (
    <Router>
      <Suspense
        fallback={<ImageLoader src="/Images/Loading.gif" alt="Loading...." />}
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/join-now" component={JoinNow} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/home" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};

const ImageLoader = styled.img`
  position: absolute;
  z-index: 999;
  top: 45%;
  left: 45%;
  width: 4.5rem;
  height: 4.5rem;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticationStatus: () => dispatch(userAuthenticationStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
