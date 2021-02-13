import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

function PostComments(props) {
  const { comments, getComments } = props;
  const postId = useParams().postId;

  useEffect(() => {
    getComments(postId);
  }, []);
  return (
    <div>
      {comments.length > 0 ? (
        <div>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (postId) =>
      dispatch({ type: "GET_COMMENTS_BY_POSTID", postId }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
