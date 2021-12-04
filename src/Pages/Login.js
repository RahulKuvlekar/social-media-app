import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginAsGuestUser } from "../Redux/Actions/authActions";
const Login = (props) => {
  return (
    <Container>
      {props.user && <Redirect to="/home" />}
      <Nav>
        <NavLink to="/">
          <img src="/Images/Logo.png" alt="LOGO-SMA" />
        </NavLink>
        <FlexColumn>
          <JoinNow to="/join-now">Join Now</JoinNow>
          <SignIn to="/sign-up">SignIn</SignIn>
          <LoginAsGuest
            onClick={() => {
              props.loginAsGuestUser();
            }}
          >
            Login As Guest
          </LoginAsGuest>
        </FlexColumn>
      </Nav>
      <Section>
        <h1>Welcome to our professional community</h1>
        <img src="/images/Logo-Hero.svg" alt="" />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
  overflow-y: hidden;
`;

const Nav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  max-width: 90%;
  margin: auto;
  padding: 1rem 0;
  /* background-color: blue; */
`;

const NavLink = styled(Link)`
  &:hover {
    transform: rotate(360deg) scale(1.05);
    transition: all 1s ease-out;
  }
  & > img {
    width: 6rem;
    height: 6rem;
  }
  @media (max-width: 768px) {
    &:hover {
      transform: rotate(360deg);
      transition: all 1s ease-out;
    }
    & > img {
      width: 3rem;
      height: 3rem;
    }
  }
`;

const FlexColumn = styled.div`
  @media (max-width: 480px) {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;
const LoginAsGuest = styled.button`
  color: #0a66c2;
  box-shadow: inset 0 0 0 1px #0a66c2;
  border-radius: 2rem;
  transition-duration: 0.3s;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.6rem 1.6rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const JoinNow = styled(Link)`
  padding: 0.6rem 0.8rem;
  font-size: 1.5rem;
  text-decoration: none;
  border-radius: 0.4rem;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 0.8rem;
  &:hover {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.9);
    background-color: rgba(0, 0, 0, 0.08);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SignIn = styled(Link)`
  color: #0a66c2;
  box-shadow: inset 0 0 0 1px #0a66c2;
  border-radius: 1.5rem;
  transition-duration: 0.3s;
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 0.5rem;
  padding: 0.6rem 1.6rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    text-decoration: none;
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100%;
  padding: 2rem;
  position: relative;
  top: 0;
  margin: auto;
  box-sizing: border-box;
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
    font-size: 4.2rem;
    color: #2977c9;
    font-weight: 200;
    line-height: 1.3;
    @media (max-width: 768px) {
      margin-top: 1rem;
      text-align: center;
      font-size: 2rem;
      width: 100%;
      line-height: 1.2;
    }
  }

  img {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      margin: auto;
      width: 80%;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    bottom: 0;
    flex-flow: column;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginAsGuestUser: () => dispatch(loginAsGuestUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
