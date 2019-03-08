const initialState = {
    posts = []
  };
  

  const UPDATE_POSTS = 'UPDATE_POSTS'

  
  export function clearUser() {
    return {
      type: UPDATE_POSTS
    };
  }
  
  export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_POSTS:
        const {posts} = payload;
        return { 
            ...state, ...posts
        }
      default:
        return state;
    }
  }
  