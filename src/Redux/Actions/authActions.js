import { auth } from "../../Utils/init-firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  console.log("log");
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((data) => {
        dispatch({
          type: "SET_USER",
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

        alert("Account Created ", username);
      })
      .catch((error) => alert(error.message));
  };
};
export const signInToAccount = (emailID, pass) => {
  console.log("log-SIGNIN");
  return (dispatch) => {
    signInWithEmailAndPassword(auth, emailID, pass)
      .then((data) => {
        console.log("SIGN TO ACCOUNT ", data);
        dispatch({
          type: "SET_USER",
          payload: data.user,
        });
      })
      .catch((error) => alert(error.message));
  };
};

export const userAuthenticationStatus = (emailID, pass) => {
  console.log("log-SIGNIN");
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      console.log("AUTH-STATE -> CHANGED to", user);
      dispatch({
        type: "SET_USER",
        payload: user ? user : null,
      });
    });
  };
};
export const userSignOut = (emailID, pass) => {
  console.log("log-SIGNIN");
  return (dispatch) => {
    signOut(auth)
      .then((data) => console.log("Signed Out", data))
      .catch((error) => alert(error.message));
  };
};
