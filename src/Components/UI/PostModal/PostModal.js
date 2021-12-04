import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { postArticle } from "../../../Redux/Actions/authActions";
import firebase from "firebase/compat/app";

const PostModal = (props) => {
  const [discription, setDiscription] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [shareVideo, setShareVideo] = useState("");
  const [showVideo, setShowVideo] = useState("");
  const IS_INVALID = discription.trim() === "";

  const resetAll = () => {
    setDiscription("");
    setShareImage("");
    setShareVideo("");
    setShowVideo("");
  };
  const hideModal = () => {
    resetAll();
    props.onHideModal();
  };

  const handlerShareImage = (event) => {
    const IMAGE = event.target.files[0];
    console.dir(IMAGE);

    if (IMAGE === "" || IMAGE === undefined) {
      alert("Not an Image,the file is of", typeof IMAGE);
      return;
    }
    setShareImage(IMAGE);
  };

  const postArticleHandler = (event) => {
    // event.preventDefault();
    // console.log("EVENT", event);
    // if (event.target !== event.currentTarget) {
    //   console.log("IF-EVENT", event);
    //   return;
    // }
    // console.log("AFTER-EVENT", event);
    const payload = {
      user: props.user,
      image: shareImage,
      video: shareVideo,
      description: discription,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    resetAll();
    props.onHideModal();
  };

  return (
    <Modal onHideModal={hideModal}>
      {/* To hide Modal by clicking on backdrop */}
      <ModalHeader>
        <h1>Create a Post</h1>
        <AssetButton onClick={hideModal}>
          {/* Hide Modal by click on cancle Logo  */}
          <img src="/Images/PostModal/cancle.svg" alt="cancle" />
        </AssetButton>
      </ModalHeader>
      <ModalBody>
        <ModalInfo>
          <img
            src={
              props.user?.photoURL
                ? `${props.user?.photoURL}`
                : "/Images/NavLogo/user.svg"
            }
            alt="user"
          />
          <h1>
            {props.user?.displayName
              ? `${props.user?.displayName}`
              : "USERNAME"}
          </h1>
        </ModalInfo>
        <textarea
          placeholder="What do you want to talk about ?"
          value={discription}
          onChange={(event) => setDiscription(event.target.value)}
        />

        <UploadPhoto>
          <input
            type="file"
            id="file"
            accept="Image/jpeg,Image/gif,Image/jpg,Image/png,Image/svg"
            name="ImageUpload"
            onChange={handlerShareImage}
            style={{ display: "none " }}
          />
          {shareImage && (
            <UploadImage
              src={URL.createObjectURL(shareImage)}
              alt="uploadPhoto"
            />
          )}

          {showVideo && (
            <input
              type="text"
              id="video"
              name="VideoUpload"
              placeholder="Enter your Video URL "
              value={shareVideo}
              onChange={(event) => setShareVideo(event.target.value)}
            />
          )}
          {shareVideo && (
            <ReactPlayer
              height="300px"
              //   style={{ objectFit: "contain" }}
              width="100%"
              url={shareVideo}
            />
          )}
        </UploadPhoto>
      </ModalBody>
      <ModalFooter>
        <div>
          <AssetButton>
            <label htmlFor="file">
              <img src="/Images/PostModal/photo.svg" alt="photoimage" />
            </label>
          </AssetButton>

          <AssetButton onClick={(e) => setShowVideo(!showVideo)}>
            <label htmlFor="video">
              <img src="/Images/PostModal/youtube.svg" alt="youtube" />
            </label>
          </AssetButton>
        </div>
        <ShareComment>
          <AssetButton>
            <img src="/Images/PostModal/comment.svg" alt="comment" />
            <p>Anyone.</p>
          </AssetButton>
        </ShareComment>
        <PostButton
          disabled={IS_INVALID && !shareImage}
          onClick={(event) => postArticleHandler(event)}
        >
          {IS_INVALID && !shareImage ? "Disable" : "Post"}
        </PostButton>
      </ModalFooter>
    </Modal>
  );
};

const AssetButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    height: 2rem;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  ${AssetButton} {
    padding: 0 0.5rem;
    img {
      width: 1.5rem;
      opacity: 0.7;
    }
    &:hover {
      opacity: 0.8;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ModalInfo = styled.div``;

const ModalBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  width: 100%;
  max-height: 350px;
  overflow-y: scroll;
  ${ModalInfo} {
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
    h1 {
      font-size: 1.2rem;
      font-weight: 600;
    }
    img {
      width: 3.5rem;
      height: 3.5rem;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 0.6rem;
    }
  }
  textarea {
    width: 100%;
    min-height: 100px;
    border: none;
    outline: none;
    resize: none;
    font-size: 1rem;
    padding: 1rem 0;
  }
`;

const ShareComment = styled.div``;
const ModalFooter = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  /* justify-content: space-between; */
  ${AssetButton} {
    opacity: 0.4;
    &:hover {
      opacity: 0.8;
    }

    @media (max-width: 468px) {
      img {
        height: 1.5rem;
      }
    }
  }

  div {
    flex: 0.25;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
  }

  ${ShareComment} {
    flex: 0.5;
    padding-left: 0.5rem;
    justify-content: flex-start;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    p {
      padding-left: 3px;
      color: rgba(0, 0, 0, 0.5);
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

const PostButton = styled.button`
  flex: 0.25;
  height: 100%;
  padding: 0.5rem 0.8rem;
  background-color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.55)" : "#1166c2"};
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.55)" : "#2255c2"};
  }
`;

const UploadImage = styled.img``;

const UploadPhoto = styled.div`
  color: red;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  /* justify-content: center; */
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  ${UploadImage} {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 0;
    margin-right: 0;
    @media (max-width: 468px) {
      max-height: 150px;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userInfoState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (payload) => dispatch(postArticle(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
