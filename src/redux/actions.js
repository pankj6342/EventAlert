import * as types from "./actionTypes";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});
const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

export const updateBucketList = (bucketList) => ({
  type: types.SET_BUCKETLIST,
  payload: bucketList,
});

// export const addToBucketList = (bucketList) => {
//   return async function (dispatch) {
//     try {
//       dispatch(updateUser());
//     } catch (error) {
//       console.log({ updateBucketListError: error.message });
//     }
//   };
// };
export const registerInitiate = (email, password, displayName) => {
  return async function (dispatch) {
    dispatch(registerStart());
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("user created successfully: ", userCredentials);
      await updateProfile(user, { displayName });
      dispatch(registerSuccess(user));
    } catch (error) {
      dispatch(registerFail(error.message));
      console.log({ signUpError: error });
    }
  };
};
export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const loginInitiate = (email, password) => {
  return async function (dispatch) {
    dispatch(loginStart());
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signed in successfully: ", userCredentials);
      const user = userCredentials.user;
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFail(error.message));
      console.log({ loginError: error.message });
    }
  };
};

export const logoutInitiate = () => {
  return async function (dispatch) {
    dispatch(logoutStart());
    try {
      await signOut(auth);
      dispatch(logoutSuccess());
      console.log("logout successful");
    } catch (error) {
      dispatch(logoutFail(error.message));
    }
  };
};
export const setHost = (bool) => ({
  type: types.SET_HOST,
  payload: bool,
});
