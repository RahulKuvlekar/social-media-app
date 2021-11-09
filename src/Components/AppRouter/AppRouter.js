import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { userAuthenticationStatus } from "../../Redux/Actions/authActions";
import { connect } from "react-redux";
import ImageLoader from "../UI/ImageLoader/ImageLoader";
// import Login from "../Login/Login";
const Login = lazy(() => import("../../Pages/Login"));
const SignUp = lazy(() => import("../../Pages/SignUp"));
const JoinNow = lazy(() => import("../../Pages/JoinNow"));
const Home = lazy(() => import("../../Pages/Home"));
const ViewProfile = lazy(() => import("../../Pages/ViewProfile"));

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
          <Route path="/view-profile" component={ViewProfile} />
          <Route path="/join-now" component={JoinNow} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/home" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};

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
