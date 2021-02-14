import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import PostComments from "../PostComments/PostComments";
import "./PostDetails.css";
import { reduxActions } from "../../../State/AwesomeThoughts.actions";

function UserPosts(props) {
  const { postDetail, getPostsDetails, deletePost } = props;
  const postId = useParams().postId;
  const history = useHistory();
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    getPostsDetails(postId);
  }, []);
  const showCommentsHandler = () => {
    setShowComments(true);
  };
  const deleteHandler = () => {
    deletePost(postId, history);
  };
  return (
    <div className="center">
      {postDetail.body && (
        <div className="post-card">
          <h2 className="post-card-title">{postDetail.title}</h2>
          <p>{postDetail.body}</p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteHandler}
          >
            Delete Post
          </button>
          <hr />

          {showComments ? (
            <PostComments />
          ) : (
            <button
              type="button"
              className="btn btn-dark"
              onClick={showCommentsHandler}
            >
              Show Comments
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postDetail: state.postDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsDetails: (postId) =>
      dispatch({ type: reduxActions.GetPostDetails, postId }),
    deletePost: (postId, history) =>
      dispatch({ type: reduxActions.DeletePost, postId, history }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
