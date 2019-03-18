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
  user_age: 0
};

const UPDATE_USER = "UPDATE_USER";

const CLEAR_USER = "CLEAR_USER";

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
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
    case UPDATE_USER:
      // console.log(payload);
      const {
        user_id,
        email,
        username,
        first_name,
        last_name,
        privacy_level,
        profile_pic,
        facebook_url,
        twitter_url,
        user_age
      } = payload;
      return {
        ...state,
        id: user_id,
        email,
        username,
        first_name,
        last_name,
        privacy_level,
        profile_pic,
        facebook_url,
        twitter_url,
        user_age
      };
    case CLEAR_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
}
