import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const JoinNow = () => {
  const history = useHistory();
  return (
    <div>
      <Form>
        <Google
          onClick={() => {
            history.push("/home");
          }}
        >
          <img src="/images/google-logo.png" alt="google-logo" />
          Sign in with Google
        </Google>
      </Form>
    </div>
  );
};

const Form = styled.div`
  margin-top: 100px;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  padding: 0.5rem 1.5rem;
  margin: auto;
  border-radius: 3rem;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 0.3s;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  & > img {
    margin-right: 1rem;
  }
`;

export default JoinNow;
