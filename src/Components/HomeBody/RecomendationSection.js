import React from "react";
import styled from "styled-components";
const RecomendationSection = () => {
  return (
    <Container>
      <FollowCard>
        <span>Add</span>
        <h1>Rahul Kuvlekar</h1>
      </FollowCard>
    </Container>
  );
};

export default RecomendationSection;
const Container = styled.aside`
  grid-area: rightside;
`;
const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 4rem;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  span {
    display: block;
    text-align: right;
    color: rgba(0, 0, 0, 0.4);
  }
`;
