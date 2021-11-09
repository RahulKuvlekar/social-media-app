import React from "react";
import Header from "../Components/Header/Header";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const ViewProfile = (props) => {
  //   const [filteredArticles, setFilteredArticles] = useState([]);
  return (
    <div>
      {!props.user && <Redirect to="/" />}
      <Header ViewProfile />
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
                <a href="#button" name="button">
                  <Photo />
                  <LinkDiv>
                    Welcome,
                    <br />
                    <span>{props.user?.displayName}</span>
                  </LinkDiv>
                </a>
                <a href="#button" name="button">
                  <AddPhototext>Add Photo</AddPhototext>
                </a>
              </>
            )}
          </UserInfo>
        </Card>
      </Container>
      {/* 
      {
          filteredArticles && 

      } */}
    </div>
  );
};

const Container = styled.aside`
  margin: 5rem auto 0;
  width: 60%;
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

const AddPhototext = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 0.7rem;
  line-height: 1.3;
  font-weight: 400;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
