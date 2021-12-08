import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProfileSection = (props) => {
  return (
    <Container>
      <Card>
        <UserInfo>
          <CardBackground />
          {props.user?.photoURL ? (
            <>
              <PhotoURL src={props.user?.photoURL} alt="Profile" />
              <LinkDiv>
                Welcome,
                <br />
                <span>{props.user?.displayName}</span>
              </LinkDiv>
            </>
          ) : (
            <>
              <Link to="/view-profile">
                <Photo style={{ cursor: "default" }} />
                <LinkDiv>
                  Welcome,
                  <br />
                  <span>{props.user?.displayName}</span>
                </LinkDiv>
              </Link>
              {/* <a href="#button" name="button">
                <AddPhototext>Add Photo</AddPhototext>
              </a> */}
            </>
          )}
        </UserInfo>
      </Card>
      <CardRecent>
        <h2 style={{ cursor: "default" }}>Trending #Hashtags</h2>
        <div>
          <Hashtag>
            <span>#</span>
            100DaysOfCode
          </Hashtag>
          <Hashtag>
            <span>#</span>
            Coding
          </Hashtag>
          <Hashtag>
            <span>#</span>
            programming
          </Hashtag>
          <Hashtag>
            <span>#</span>
            innovation
          </Hashtag>
          {/* <Channeltext>Group</Channeltext>
          <Channeltext>Events</Channeltext> */}
        </div>
      </CardRecent>
    </Container>
  );
};

const Container = styled.aside`
  grid-area: leftside;
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
const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.6rem 1rem;
  word-wrap: break-word;
  word-break: break-word;
  a {
    text-decoration: none;
    color: black;
  }
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg") center center/cover;
  /* background-size: 462px; */
  height: 4.5rem;
  margin: -0.6rem -1rem;
`;
const Photo = styled.div`
  background: url("/images/photo.svg") no-repeat center center/cover;
  background-color: white;
  width: 4rem;
  height: 4rem;
  background-size: 60%;
  margin: -2rem auto 0;
  border: 2px solid white;
  border-radius: 50%;
`;
const PhotoURL = styled.img`
  object-fit: cover;
  width: 4rem;
  height: 4rem;
  background-size: 60%;
  margin: -2rem auto 0;
  border: 2px solid white;
  border-radius: 50%;
`;

const LinkDiv = styled.div`
  font-size: 1rem;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

// const AddPhototext = styled.div`
//   color: #0a66c2;
//   margin-top: 4px;
//   font-size: 0.7rem;
//   line-height: 1.3;
//   font-weight: 400;
// `;

const CardRecent = styled(Card)`
  padding: 1rem 0;

  h2 {
    padding: 0.3rem 0;
  }

  div {
    text-align: left;
  }
`;
const Hashtag = styled.p`
  padding: 0.5rem 0.3rem;
  display: flex;
  border-radius: 0.2rem;
  text-align: center;
  justify-content: flex-start;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  cursor: default;
  span {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 600;
    margin-right: 0.2rem;
  }
  /* &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: default;
  } */
`;

// const Channeltext = styled(AddPhototext)`
//   padding: 0.2rem 0.5rem;
//   font-size: 1rem;
//   font-weight: 600;
//   &:hover {
//     text-decoration: underline;
//     cursor: pointer;
//   }
// `;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
