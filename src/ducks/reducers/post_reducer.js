const initialState = {
  posts: []
};

const UPDATE_POSTS = "UPDATE_POSTS";
const CLEAR_POSTS = "CLEAR_POSTS";

export function clearPosts() {
  return {
    type: CLEAR_POSTS
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    payload: posts
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_POSTS:
      // console.log(payload);
      return {
        ...state,
        posts: payload
      };
    case CLEAR_POSTS:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
}
