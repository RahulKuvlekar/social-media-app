import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import FeedSection from "./FeedSection";
import RecomendationSection from "./RecomendationSection";
const HomeBody = () => {
  return (
    <Container>
      <Section>
        <h5>
          Welcome to
          <Link to="/home"> @RahulKuvlekar </Link>
          Social Media App
        </h5>
      </Section>
      <GridLayout>
        <ProfileSection />
        <FeedSection />
        <RecomendationSection />
      </GridLayout>
    </Container>
  );
};

export default HomeBody;

const Container = styled.div`
  margin-top: 4rem;
`;

const Section = styled.section`
  /* min-height: 50px; */
  padding: 1rem 0;
  /* box-sizing: content-box; */
  text-align: center;
  display: flex;
  justify-content: center;
  h5 {
    color: #434649;
    font-size: 1rem;
    cursor: default;
    a {
      color: #0a66c2;
      font-weight: 700;
      font-size: 1.2rem;
      margin: 0 5px;
      cursor: default;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 0.4rem;
  }
`;
// const Link = styled(Link)``;
const GridLayout = styled.div`
  display: grid;
  grid-template-areas: "leftside middle rightside";
  grid-template-columns: minmax(0, 7fr) minmax(0, 12fr) minmax(200px, 5fr);
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  /* grid-template-row: auto; */
  margin: 1.5rem 1rem;
  @media (max-width: 768px) {
    padding: 0 5px;
    display: flex;
    flex-direction: column;
  }
`;
