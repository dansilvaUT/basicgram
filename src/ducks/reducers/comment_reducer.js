const initialState = {
  post_id: 0,
  showComments: false,
  comments: []
};

const UPDATE_COMMENTS = "UPDATE_COMMENTS";
const CLEAR_COMMENTS = "CLEAR_COMMENTS";
const UPDATE_POSTID = "UPDATE_POSTID";

export function selectPostID(post_id) {
  return {
    type: UPDATE_POSTID,
    payload: post_id
  };
}

export function clearComments() {
  return {
    type: CLEAR_COMMENTS
  };
}

export function updateComments(comments) {
  return {
    type: UPDATE_COMMENTS,
    payload: comments
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_COMMENTS:
      // console.log(payload);
      return {
        ...state,
        comments: payload
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        ...initialState
      };
    case UPDATE_POSTID:
      return {
        ...state,
        post_id: payload,
        showComments: true
      };
    default:
      return state;
  }
}
