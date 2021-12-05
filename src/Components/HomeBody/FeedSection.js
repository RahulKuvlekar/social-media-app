import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PostModal from "../UI/PostModal/PostModal";
import { getArticles, deletePost } from "../../Redux/Actions/authActions";
import ReactPlayer from "react-player";
import Modal from "../UI/Modal/Modal";
import "../UI/Modal/EditModal.css";
import db from "../../Utils/init-firebase";
// import ImageLoader from "../UI/ImageLoader/ImageLoader";
import { arrayUnion, arrayRemove } from "../../Utils/init-firebase";
import PostItem from "../PostItem/PostItem";

const FeedSection = (props) => {
  // const [displayDropbox, setDisplayDropbox] = useState(false);
  const [modal, setModal] = useState(false);
  const [editDiscriptionModal, showEditDiscriptionModal] = useState(false);
  const [editDiscriptionInput, SetEditDiscriptionInput] = useState("");
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
  const hideEditDiscriptionModal = () => {
    showEditDiscriptionModal(false);
    SetEditDiscriptionInput("");
    setCurrentEvent("");
  };
  const OpenEditDiscriptionModal = (event) => {
    showEditDiscriptionModal(true);
    setCurrentEvent(event);
    SetEditDiscriptionInput("");
  };

  const hideDeletePostModal = () => {
    setDeletePostModal(false);
    setCurrentEvent("");
  };
  const OpenDeletePostModal = (event) => {
    setDeletePostModal(true);
    setCurrentEvent(event);
  };

  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };

  const editPostHandler = (event) => {
    const postID = event.target.getAttribute("postid");
    console.log("Edit post ", postID);
    if (editDiscriptionInput.trim() !== "") {
      db.collection("posts").doc(postID).update({
        description: editDiscriptionInput,
      });
    }
    hideEditDiscriptionModal();
  };
  const deletePostHandler = (event) => {
    const postID = event.target.getAttribute("postid");
    const imgURL = event.target.getAttribute("imgurl");
    console.log("Delete Post ", postID, imgURL);
    props.deletePost(postID, imgURL);
    hideDeletePostModal();
    alert("post deleted sucessfully");
  };

  const likeHandler = (event, postID) => {
    let IfExist = -1;
    db.collection("posts")
      .doc(postID)
      .get()
      .then((ans) => {
        IfExist = ans.data().Likes.indexOf(props.user.uid);
        console.log(IfExist);
        if (IfExist < 0) {
          console.log("Like union ", IfExist);
          db.collection("posts")
            .doc(postID)
            .update({ Likes: arrayUnion(props.user.uid) });
        } else {
          console.log("Like remove", IfExist);
          db.collection("posts")
            .doc(postID)
            .update({ Likes: arrayRemove(props.user.uid) });
        }
      });
  };

  const { getArticles } = props;

  useEffect(() => {
    getArticles();
    console.log("article log");
  }, [getArticles]);
  return (
    <>
      {deletePostModal && (
        <Modal onHideModal={hideDeletePostModal}>
          <div className="editModal__section">
            <div
              style={{ textAlign: "center", opacity: ".6", marginTop: "1rem" }}
            >
              <h1>Are you sure you want to delete this POST ???</h1>
            </div>
            <div className="modal__btns">
              <button onClick={hideDeletePostModal}>Cancel</button>
              <button onClick={() => deletePostHandler(currentEvent)}>
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      {editDiscriptionModal && (
        <Modal onHideModal={hideEditDiscriptionModal}>
          <div className="editModal__section">
            {/* <div>
              <div>
                <h1>Old Discription:-</h1>
                <h2 style={{ opacity: ".6", marginTop: ".5rem" }}>{}</h2>
              </div>
              <hr />
            </div> */}
            <h1>Updated Discription:-</h1>
            <input
              type="text"
              value={editDiscriptionInput}
              onChange={(event) => SetEditDiscriptionInput(event.target.value)}
            />
            <div className="modal__btns">
              <button onClick={hideEditDiscriptionModal}>Cancel</button>
              <button
                disabled={editDiscriptionInput.trim() === ""}
                onClick={() => editPostHandler(currentEvent)}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Container>
        {modal && <PostModal onHideModal={hideModal} />}
        <ShareBox>
          <Upload>
            {props.user?.photoURL ? (
              <img src={props.user?.photoURL} alt="dp" />
            ) : (
              <img src="/images/NavLogo/user.svg" alt="dp" />
            )}

            <button onClick={showModal}>Start a post</button>
          </Upload>
          <UploadIcons>
            <button onClick={showModal}>
              <img src="/images/Sharebox/photo.png" alt="" />
              <span>Photo</span>
            </button>

            <button onClick={showModal}>
              <img src="/images/Sharebox/video.png" alt="" />
              <span>Video</span>
            </button>

            {/* <button onClick={showModal}>
              <img src="/images/Sharebox/event.png" alt="" />
              <span>Event</span>
            </button> */}

            <button onClick={showModal}>
              <img src="/images/Sharebox/article.svg" alt="" />
              <span>Write Article</span>
            </button>
          </UploadIcons>
        </ShareBox>
        {props.loadingState && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              src="/Images/Loading.gif"
              alt="Loading...."
              style={{ width: "4.5rem", height: "4.5rem", margin: "1rem 0" }}
            />
          </div>
        )}
        {props.articles.length > 0 &&
          props.articles.map((post) => (
            // <PostItem
            //   user={props.user}
            //   post={post}
            //   OpenEditDiscriptionModal={OpenEditDiscriptionModal}
            //   OpenDeletePostModal={OpenDeletePostModal}
            //   likeHandler={likeHandler}
            // />
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
                {props.user.email === post.userInfo?.emailID && (
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
                      post?.Likes?.indexOf(props.user?.uid) >= 0
                        ? "red"
                        : "black"
                    }`,
                  }}
                  onClick={(event) => likeHandler(event, post.id)}
                >
                  <img
                    src={`${
                      post?.Likes?.indexOf(props.user?.uid) >= 0
                        ? "/Images/heartRedIcon.gif"
                        : "/Images/heartIcon.png"
                    }`}
                    alt=""
                  />
                  <span>{`${
                    post?.Likes?.indexOf(props.user?.uid) >= 0
                      ? "Unlike"
                      : "Like"
                  }`}</span>
                </button>
                <button>
                  <img
                    style={{ fill: "red" }}
                    src="/Images/Comment.svg"
                    alt=""
                  />
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
          ))}
      </Container>
    </>
  );
};

const Container = styled.section`
  grid-area: middle;
`;
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

const ShareBox = styled(CartMain)`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  color: #958b7b;
  margin-bottom: 0.5rem;

  button {
    color: #958b7b;
    font-weight: 600;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 1rem;
    line-height: 1.2;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Upload = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;

  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 0.8rem;
  }
  button {
    background-color: transparent;
    border: 1px solid #958b7b;
    border-radius: 2rem;
    width: 100%;
    height: 3rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.01);
    }
  }
`;

const UploadIcons = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  button {
    outline: none;
    padding: 5px;
    img {
      width: 2rem;
      height: 2rem;
      opacity: 0.8;
    }
    span {
      font-size: 0.7rem;
      color: #70b5f9;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 5px;
    }
  }
  @media (max-width: 768px) {
    flex-flow: row wrap;
  }
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
    deletePost: (postID, imgURL) => dispatch(deletePost(postID, imgURL)),
    getArticles: () => dispatch(getArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSection);
