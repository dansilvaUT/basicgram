const initialState = {
  id: 0,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  privacy_level: 0,
  profile_pic: "",
  facebook_url: "",
  twitter_url: "",
  user_age: 0,
  password: ""
};

const UPDATE_USERINFO1 = "UPDATE_USERINFO1";
const UPDATE_USERINFO2 = "UPDATE_USERINFO2";
const UPDATE_USERINFO3 = "UPDATE_USERINFO3";
const UPDATE_USERINFO4 = "UPDATE_USERINFO4";
const CLEAR_USER = "CLEAR_USER";

export function updateUserInfo1(userInfo) {
  return {
    type: UPDATE_USERINFO1,
    payload: userInfo
  };
}
export function updateUserInfo2(userInfo) {
  return {
    type: UPDATE_USERINFO2,
    payload: userInfo
  };
}
export function updateUserInfo3(userInfo) {
  return {
    type: UPDATE_USERINFO3,
    payload: userInfo
  };
}

export function updateUserInfo4(userInfo) {
  return {
    type: UPDATE_USERINFO4,
    payload: userInfo
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: initialState
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USERINFO1:
      // console.log(payload);
      const { email, password } = payload;
      return {
        ...state,
        email,
        password
      };
    case UPDATE_USERINFO2:
      // console.log(payload);
      const { username, first_name, last_name, age } = payload;
      return {
        ...state,
        username,
        first_name,
        last_name,
        user_age: age
      };
    case UPDATE_USERINFO3:
      // console.log(payload);
      const { profile_pic } = payload;
      return {
        ...state,
        profile_pic
      };
    case UPDATE_USERINFO4:
      // console.log(payload);
      const { facebook_url, twitter_url } = payload;
      return {
        ...state,
        facebook_url,
        twitter_url
      };

    case CLEAR_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
}
