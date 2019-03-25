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
// const UPDATE_USERNAME = "UPDATE_USERNAME";
// const UPDATE_EMAIL = "UPDATE_EMAIL";

const CLEAR_USER = "CLEAR_USER";

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}
// export function updateUsername(username) {
//   return {
//     type: UPDATE_USERNAME,
//     payload: username
//   };
// }

// export function updateEMAIL(email) {
//   return {
//     type: UPDATE_EMAIL,
//     payload: email
//   };
// }

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
        id: user_id || initialState.id,
        email: email || initialState.email,
        username: username || initialState.username,
        first_name: first_name || initialState.first_name,
        last_name: last_name || initialState.last_name,
        privacy_level: privacy_level || initialState.privacy_level,
        profile_pic: profile_pic || initialState.profile_pic,
        facebook_url: facebook_url || initialState.facebook_url,
        twitter_url: twitter_url || initialState.twitter_url,
        user_age: user_age || initialState.user_age
      };
    // case UPDATE_USERNAME:
    //   const { username } = payload;
    //   return {
    //     ...state,
    //     username
    //   };
    // case UPDATE_EMAIL:
    //   const { email } = payload;
    //   return {
    //     ...state,
    //     email
    //   };
    case CLEAR_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
}
