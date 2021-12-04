import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  signInWithGoogle,
  signInToAccount,
  loginAsGuestUser,
} from "../Redux/Actions/authActions";

const JoinNow = (props) => {
  const [error, setError] = useState({ state: false, message: null });
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const IS_INVALID = emailAddress === "" || password === "";

  const loginHandler = async (event) => {
    event.preventDefault();
    if (IS_INVALID) {
      setError({ state: true, message: "Check Input Values" });
      return;
    }
    setError({ state: false, message: "" });
    props.signInToAccount(emailAddress, password);
    setEmailAddress("");
    setPassword("");
    console.log("Join In user", props.user);
  };
  return (
    <CenterForm>
      {props.user && <Redirect to="/home" />}
      <FormComponent>
        <BrandName>LOGIN</BrandName>
        <Form onSubmit={loginHandler}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            placeholder="Enter Email-Id"
            autoComplete="email"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
          />
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            placeholder="Enter Password"
            autoComplete="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit"> Login</button>
          <p>
            Not a member?<Link to={"/sign-up"}>Signup</Link>
          </p>
          {error.state && <ErrorMsg>{error.message}</ErrorMsg>}
        </Form>
        <GuestBtn onClick={() => props.loginAsGuestUser()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/50px-Flag_of_India.svg.png"
            alt="flag-logo"
          />
          Login As Guest
        </GuestBtn>
        <Google onClick={() => props.signInWithGoogle()}>
          <img src="/images/google-logo.png" alt="google-logo" />
          Sign in with Google
        </Google>
      </FormComponent>
    </CenterForm>
  );
};

const CenterForm = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  margin: 1rem 0;
  text-align: left;
  label {
    margin-bottom: 1rem;
    width: 100%;
    color: rgba(0, 0, 0, 0.5);
  }
  input {
    width: 100%;
    padding: 0.7rem 1.3rem;
    margin: 0.3rem auto 1rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0.6rem;
    font-size: 1.2rem;
    &::placeholder {
      opacity: 0.4; /* Firefox */
    }
  }
  button {
    margin: 1rem 0 0.5rem;
    width: 100%;
    padding: 0.75rem 1.3rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    background-color: #2195f3;
    border: 1px solid white;
    border-radius: 0.6rem;
    cursor: pointer;
    &:hover {
      background-color: #2175f3;
    }
  }

  p {
    text-align: center;
    margin: 0.5rem 0;
    color: rgba(0, 0, 0, 0.5);
    a {
      color: #2195f3;
      margin: 0 0.3rem;
      font-weight: 700;
      &:hover {
        color: #2175f3;
      }
    }
  }
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  padding: 0.3rem 1.2rem;
  margin: auto;
  border-radius: 3rem;
  border: 1px solid black;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 0.3s;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  & > img {
    width: 2rem;
    margin-right: 0.5rem;
  }
`;

export const GuestBtn = styled(Google)`
  margin: 0.5rem auto;
  padding: 0.65rem;
`;

const Card = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

const FormComponent = styled(Card)`
  /* height: 100vh; */
  max-width: 300px;
  width: 90%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const BrandName = styled.h1`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
  text-align: left;
  width: 100%;
  /* padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3); */
`;

const ErrorMsg = styled.div`
  text-align: left;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid red;
  color: red;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    signInToAccount: (emailAddress, password) =>
      dispatch(signInToAccount(emailAddress, password)),
    loginAsGuestUser: () => dispatch(loginAsGuestUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinNow);
