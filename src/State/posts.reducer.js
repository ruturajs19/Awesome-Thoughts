const initialState = {
  users: [],
  posts: [],
  postDetails: {},
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USERS":
      return {
        ...state,
        users: state.users.concat(action.value),
      };
    case "SAVE_POSTS":
      return {
        ...state,
        posts: state.posts.concat(action.value),
      };
    case "SAVE_POST_DETAILS":
      return {
        ...state,
        postDetails: action.value,
      };
    case "SAVE_COMMENTS":
      return {
        ...state,
        comments: state.comments.concat(action.value),
      };
    default:
      return state;
  }
};

export default reducer;
