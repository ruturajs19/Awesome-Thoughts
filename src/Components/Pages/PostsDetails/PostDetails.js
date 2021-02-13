import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import PostComments from "../PostComments";
import "./PostDetails.css"

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
    deletePost(postId, history)
  }
  return (
    <div className="center">
      {postDetail ? (
        <div className="post-card">
          <h2 className="post-card-title">{postDetail.title}</h2>
          <p>{postDetail.body}</p>
          <hr />
          <button onClick={showCommentsHandler}>
            {showComments ? <PostComments /> : <p>Show Comments</p>}
          </button>
          <button onClick={deleteHandler}>
            <p>Delete Post</p>
          </button>
        </div>
      ) : (
        <div>Loading...</div>
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
    getPostsDetails: (postId) => dispatch({ type: "GET_POST_DETAILS", postId }),
    deletePost: (postId, history) => dispatch({ type: "DELETE_POST", postId, history })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
