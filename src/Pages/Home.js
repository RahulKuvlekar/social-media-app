import React from "react";
import Header from "../Components/Header/Header";
import HomeBody from "../Components/HomeBody/HomeBody";
import { signInWithGoogle } from "../Redux/Actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const Home = (props) => {
  return (
    <>
      {!props.user && <Redirect to="/" />}
      <Header />
      <HomeBody />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInWithGoogle: () => dispatch(signInWithGoogle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
