import {
  put,
  call,
  takeLatest,
  all
} from "redux-saga/effects";

function* getUsersSaga() {
  try {
    const response = yield fetch("https://jsonplaceholder.typicode.com/users");
    const formattedResponse = yield response.json();
    yield put({ type: "SAVE_USERS", value: formattedResponse });
  } catch (error) {
    yield put({ type: "SAVE_USERS", value: [] });
  }
}

function* getPostsByUserIdSaga(action) {
  let url = new URL("https://jsonplaceholder.typicode.com/posts/"),
    params = { userId: action.userId };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  try {
    const response = yield fetch(url);
    const formattedResponse = yield response.json();
    yield put({ type: "SAVE_POSTS", value: formattedResponse });
  } catch (error) {
    yield put({ type: "SAVE_POSTS", value: [] });
  }
}
function* getPostDetailsSaga(action) {
  try {
    const response = yield fetch(
      `https://jsonplaceholder.typicode.com/posts/${action.postId}`
    );
    const formattedResponse = yield response.json();
    yield put({ type: "SAVE_POST_DETAILS", value: formattedResponse });
  } catch (error) {
    yield put({ type: "SAVE_POST_DETAILS", value: {} });
  }
}

function* getCommentsByPostIdSaga(action) {
  try {
    const response = yield fetch(
      `https://jsonplaceholder.typicode.com/posts/${action.postId}/comments`
    );
    const formattedResponse = yield response.json();
    yield put({ type: "SAVE_COMMENTS", value: formattedResponse });
  } catch (error) {
    yield put({ type: "SAVE_COMMENTS", value: [] });
  }
}

function* deletePostsSaga(action) {
  const { postId, history } = action;
  try {
    yield fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    });
    yield call(() => history.goBack());
    console.log("DELETED Successfully");
  } catch (error) {
    yield (e) => console.log(e);
  }
}

export function* watcher() {
  yield all([
    takeLatest("GET_USERS", getUsersSaga),
    takeLatest("GET_POSTS_BY_USERID", getPostsByUserIdSaga),
    takeLatest("GET_POST_DETAILS", getPostDetailsSaga),
    takeLatest("GET_COMMENTS_BY_POSTID", getCommentsByPostIdSaga),
    takeLatest("DELETE_POST", deletePostsSaga),
  ]);
}
