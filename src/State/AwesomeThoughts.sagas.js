import { put, call, takeLatest, all } from "redux-saga/effects";
import { reduxActions } from "./AwesomeThoughts.actions";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function* getUsersSaga() {
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error();
    }
    const formattedResponse = yield response.json();
    yield put({ type: reduxActions.SaveUsers, value: formattedResponse });
    yield put({ type: reduxActions.CloseModal, modalText: "" });
  } catch (error) {
    yield put({ type: reduxActions.SaveUsers, value: [] });
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Oops! Something Went Wrong! Try Reloding",
    });
  }
}

function* getPostsByUserIdSaga(action) {
  let url = new URL(`${BASE_URL}/posts/`),
    params = { userId: action.userId };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    const formattedResponse = yield response.json();
    yield put({ type: reduxActions.SavePosts, value: formattedResponse });
    yield put({ type: reduxActions.CloseModal, modalText: "" });
  } catch (error) {
    yield put({ type: reduxActions.SavePosts, value: [] });
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Oops! Something Went Wrong! Try Reloding",
    });
  }
}
function* getPostDetailsSaga(action) {
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(`${BASE_URL}/posts/${action.postId}`);
    if (!response.ok) {
      throw new Error();
    }
    const formattedResponse = yield response.json();
    yield put({ type: reduxActions.SavePostDetails, value: formattedResponse });
    yield put({ type: reduxActions.CloseModal, modalText: "" });
  } catch (error) {
    yield put({ type: reduxActions.SavePostDetails, value: {} });
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Oops! Something Went Wrong! Try Reloding",
    });
  }
}

function* getCommentsByPostIdSaga(action) {
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(`${BASE_URL}/posts/${action.postId}/comments`);
    if (!response.ok) {
      throw new Error();
    }
    const formattedResponse = yield response.json();
    yield put({ type: reduxActions.SaveComments, value: formattedResponse });
    yield put({ type: reduxActions.CloseModal, modalText: "" });
  } catch (error) {
    yield put({ type: reduxActions.SaveComments, value: [] });
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Oops! Something Went Wrong! Try Reloding",
    });
  }
}

function* deletePostsSaga(action) {
  const { postId, history } = action;
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error();
    }
    yield call(() => history.goBack());
    yield put({ type: reduxActions.CloseModal, modalText: "" });
    console.log("DELETED Successfully");
  } catch (error) {
    console.log("ERROR");
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Failed To Delete The Post.Try Again",
    });
  }
}

export function* watcher() {
  yield all([
    takeLatest(reduxActions.GetUsers, getUsersSaga),
    takeLatest(reduxActions.GetPostsByUserId, getPostsByUserIdSaga),
    takeLatest(reduxActions.GetPostDetails, getPostDetailsSaga),
    takeLatest(reduxActions.GetCommentsByPostId, getCommentsByPostIdSaga),
    takeLatest(reduxActions.DeletePost, deletePostsSaga),
  ]);
}
