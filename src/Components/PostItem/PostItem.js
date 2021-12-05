import React from "react";
import "../UI/Modal/EditModal.css";
import styled from "styled-components";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
const PostItem = ({
  user,
  post,
  OpenEditDiscriptionModal,
  OpenDeletePostModal,
  likeHandler,
}) => {
  return (
    <>
      <PostSection key={post.key} id={post.id}>
        <PostHeader>
          <img
            src={
              post.userInfo?.image
                ? `${post.userInfo?.image}`
                : "/Images/NavLogo/user.svg"
            }
            alt="Avatar"
          />
          <div>
            <PostTitle>{post.userInfo?.name}</PostTitle>
            <PostSubTitle>{post.userInfo?.emailID}</PostSubTitle>
            <PostSubTitle>
              {post.userInfo?.date.toDate().toLocaleString()}
            </PostSubTitle>
          </div>
          {user.email === post.userInfo?.emailID && (
            <button>
              <img src="/Images/ellipsis.svg" alt="Logo" />
              <Dropdown>
                <li
                  postid={post.id}
                  imgurl={post.shareImage}
                  onClick={(event) => OpenEditDiscriptionModal(event)}
                >
                  Edit
                </li>
                <li
                  postid={post.id}
                  imgurl={post.shareImage}
                  onClick={(event) => OpenDeletePostModal(event)}
                >
                  Delete
                </li>
                {/* <li>Cancle</li> */}
              </Dropdown>
            </button>
          )}
        </PostHeader>
        <PostBody>
          <div>{post.description}</div>
          {post.shareImage && <img src={post.shareImage} alt="post" />}
          {post.shareVideo && (
            <ReactPlayerDiv
              url={post?.shareVideo}
              width="100%"
              style={{ padding: "0" }}
            />
          )}
          <li>
            <button>
              <img
                src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                alt="Like"
              />
            </button>
            <button>
              <img
                src="https://static-exp1.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                alt="Like"
              />
            </button>
            <button>
              <img
                src="https://static-exp1.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                alt="Like"
              />
            </button>
            <span>
              | {post.Likes ? post?.Likes?.length : "0"} Like | Comments
            </span>
          </li>
        </PostBody>
        <PostFooter>
          <button
            style={{
              color: `${
                post?.Likes?.indexOf(user?.uid) >= 0 ? "red" : "black"
              }`,
            }}
            onClick={(event) => likeHandler(event, post.id)}
          >
            <img
              src={`${
                post?.Likes?.indexOf(user?.uid) >= 0
                  ? "/Images/heartRedIcon.gif"
                  : "/Images/heartIcon.png"
              }`}
              alt=""
            />
            <span>{`${
              post?.Likes?.indexOf(user?.uid) >= 0 ? "Unlike" : "Like"
            }`}</span>
          </button>
          <button>
            <img style={{ fill: "red" }} src="/Images/Comment.svg" alt="" />
            <span>Comment</span>
          </button>
          <button>
            <img src="/Images/Share.svg" alt="" />
            <span>Share</span>
          </button>
          <button>
            <img src="/Images/Send.svg" alt="" />
            <span>Send</span>
          </button>
        </PostFooter>
      </PostSection>
    </>
  );
};

const CartMain = styled.section`
  padding: 1rem 0.8rem;
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
const PostSection = styled(CartMain)`
  padding: 1rem 0;
`;
const Dropdown = styled(CartMain)`
  display: none;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 2rem;
  right: 0;
  width: 6rem;
  z-index: 50;
  li {
    width: 100%;
    cursor: pointer;
    height: 1.5rem;
    padding: 0.2 rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 5px;
    }
  }
`;

const PostTitle = styled.div``;
const PostSubTitle = styled.div``;

const PostHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 0.6rem;
  img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
  div {
    text-align: left;
    width: 90%;
    margin: auto;
    cursor: default;
    ${PostTitle} {
      font-size: 0.9rem;
      font-weight: 900;
      color: rgba(0, 0, 0, 0.7);
    }
    ${PostSubTitle} {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    img {
      width: 3rem;
      height: 3rem;
      padding: 0 10px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      ${Dropdown} {
        display: block;
      }
    }
  }
`;

const PostBody = styled.div`
  position: relative;
  div {
    position: relative;
    padding: 0 1rem;
    text-align: left;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.8);
    cursor: default;
  }
  img {
    object-fit: contain;
    width: 100%;
    position: relative;
    max-height: 450px;
    /* border: 1px solid black; */
  }
  li {
    padding: 1rem;
    list-style: none;
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
    button {
      background: transparent;
      border: none;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    span {
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;
    }
  }
`;

const PostFooter = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  button {
    /* width: 100%; */
    background: transparent;
    border: none;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    opacity: 0.7;
    cursor: pointer;
    img {
      width: 1.5rem;
      margin-right: 5px;
      @media (max-width: 425px) {
        width: 1rem;
        margin-right: 5px;
      }
    }
    span {
      font-size: 1rem;
      font-weight: 700;
      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 5px;
    }
    @media (max-width: 428px) {
      padding: 0.3rem;
    }
  }
`;

const ReactPlayerDiv = styled(ReactPlayer)`
  div {
    padding: 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
    loadingState: state.loadingState.loading,
    articles: state.articlesState.articles,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    //deletePost: (postID, imgURL) => dispatch(deletePost(postID, imgURL)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
