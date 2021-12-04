import db, { auth, storage } from "../../Utils/init-firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { SET_USER, SET_LOADING_STATUS, SET_ARTICLES } from "./actionTypes";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  console.log("log-GOOGLE-login");
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((data) => {
        dispatch({
          type: SET_USER,
          payload: data.user,
        });
      })
      .catch((error) => alert(error.message));
  };
};

export const createNewAccount = (emailID, pass, username) => {
  console.log("log-CREATE", emailID, pass, username);
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, emailID, pass)
      .then((data) => {
        updateProfile(auth.currentUser, { displayName: username })
          .then((data) => console.log(data))
          .catch((error) => alert(error.message));
        console.log("CREATED ACCOUNT ", data, username);
        dispatch({
          type: "SET_USER",
          payload: null,
        });
        alert("Account Created ", username);
      })
      .catch((error) => alert(error.message));
  };
};
export const signInToAccount = (emailID, pass) => {
  console.log("log-SIGN-IN");
  return (dispatch) => {
    signInWithEmailAndPassword(auth, emailID, pass)
      .then((data) => {
        console.log("SIGN TO ACCOUNT ", data);
        dispatch({
          type: SET_USER,
          payload: data.user,
        });
      })
      .catch((error) => alert(error.message));
  };
};

export const userAuthenticationStatus = (emailID, pass) => {
  console.log("log-USER-AUTH");
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      console.log("AUTH-STATE -> CHANGED to", user);
      dispatch({
        type: SET_USER,
        payload: user ? user : null,
      });
    });
  };
};
export const userSignOut = () => {
  console.log("log-SIGN-OUT");
  return (dispatch) => {
    signOut(auth)
      .then((data) => console.log("Signed Out", data))
      .catch((error) => alert(error.message));
    dispatch({
      type: SET_USER,
      payload: null,
    });
  };
};

// ref => Returns a reference for the given path in the default bucket.
// snapshot => of the current task state.
// STATE_CHANGED: TaskEvent
// For this event,

// The `next` function is triggered on progress updates and when the task is paused/resumed with a firebase.storage.UploadTaskSnapshot as the first argument.
// The `error` function is triggered if the upload is canceled or fails for another reason.
// The `complete` function is triggered if the upload completes successfully.

export const postArticle = (payload) => {
  return (dispatch) => {
    if (payload.image !== "") {
      dispatch({
        type: SET_LOADING_STATUS,
        status: true,
      });
      console.log("Loading TRUE");
      const upload = storage
        .ref(`Images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "STATE_CHANGED",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress is ${progress}% ...`);
          if (snapshot.state === "RUNNING") {
            console.log(`progress is ${progress}% ...`);
          }
        },
        (error) => alert(error.message),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("posts").add({
            userInfo: {
              emailID: payload.user.email,
              name: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            shareVideo: payload.video,
            shareImage: downloadURL,
            comment: 0,
            Likes: [],
            description: payload.description,
          });
          dispatch({
            type: SET_LOADING_STATUS,
            status: false,
          });
          console.log("Loading False");
        }
      );
    } else {
      db.collection("posts").add({
        userInfo: {
          emailID: payload.user.email,
          name: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        shareVideo: payload.video,
        shareImage: "",
        comment: 0,
        Likes: [],
        description: payload.description,
      });
    }
  };
};

export const getArticles = () => {
  let payload;
  return (dispatch) => {
    db.collection("posts")
      .orderBy("userInfo.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc, idx) => ({
          ...doc.data(),
          key: idx,
          id: doc.id,
        }));
        dispatch({
          type: SET_ARTICLES,
          payload: payload,
        });
        console.log("articles payload after", payload);
      });
  };
};

export const deletePost = (postId, imgURL) => {
  return (dispatch) => {
    db.collection("posts").doc(postId).delete();

    if (imgURL !== "") {
      // Creating a reference to the file to delete
      var imgRef = storage.refFromURL(imgURL);
      imgRef
        .delete()
        .then(() => {
          // File deleted successfully
          console.log("File Deleted successfully");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
};
export const loginAsGuestUser = () => {
  const GUEST_ID = {
    displayName: "Guest User",
    email: "MrGuestUser@gmail.com",
    phoneNumber: "007007007",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/50px-Flag_of_India.svg.png",
    providerId: "Guest",
    uid: "GuestUserKJ3yeHZW7Yalvm0Skmo4As7o2S73GuestUser",
  };
  console.log("Login As User");
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: GUEST_ID,
    });
  };
};
