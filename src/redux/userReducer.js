import * as types from "./actionTypes";

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
  bucketList: [],
  isHost: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: null,
      };
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.SET_BUCKETLIST:
      return {
        ...state,
        bucketList: action.payload,
      };
    case types.SET_HOST:
      return {
        ...state,
        isHost: action.payload || false,
      };
    default:
      return state;
  }
};

export default userReducer;
