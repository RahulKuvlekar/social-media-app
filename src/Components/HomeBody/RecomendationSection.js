import React, { useState, useEffect } from "react";
import styled from "styled-components";
const RecomendationSection = () => {
  const [randomNo, setRandomNo] = useState(Math.floor(Math.random() * (3 + 1)));
  console.log("random no", randomNo);
  const imgUrls = [
    "https://coursework.vschool.io/content/images/size/w2000/2017/08/react.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/SocialMediaSignDirection.jpg/640px-SocialMediaSignDirection.jpg",
  ];
  useEffect(() => {
    setRandomNo(Math.floor(Math.random() * (2 + 1)));
  }, []);
  return (
    <Container>
      <FollowCard>
        <span>Advertisement</span>
        <img src={imgUrls[randomNo]} alt="advertisement img" />
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
    padding-right: 0.5rem;
    cursor: default;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
`;
