import { reduxActions } from "./AwesomeThoughts.actions";

const initialState = {
  users: [],
  posts: [],
  postDetails: {},
  comments: [],
  modalText: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxActions.SaveUsers:
      return {
        ...state,
        users: state.users.concat(action.value),
      };
    case reduxActions.SavePosts:
      return {
        ...state,
        posts: state.posts.concat(action.value),
      };
    case reduxActions.SavePostDetails:
      return {
        ...state,
        postDetails: action.value,
      };
    case reduxActions.SaveComments:
      return {
        ...state,
        comments: state.comments.concat(action.value),
      };
    case reduxActions.ShowModal:
      return {
        ...state,
        modalText: action.modalText,
      };
    case reduxActions.CloseModal:
      return {
        ...state,
        modalText: "",
      };
    default:
      return state;
  }
};

export default reducer;
