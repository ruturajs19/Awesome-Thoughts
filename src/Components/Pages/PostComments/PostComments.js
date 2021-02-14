import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./PostComments.css";
import { reduxActions } from "../../../State/AwesomeThoughts.actions";

function PostComments(props) {
  const { comments, getComments } = props;
  const postId = useParams().postId;

  useEffect(() => {
    if (!comments.length) {
      getComments(postId);
    }
  }, []);
  return (
    <div>
      {comments.length > 0 && (
        <div className={"comment-list"}>
          {comments.map((comment) => (
            <div key={comment.id} className={"comment-item"}>
              <h4 className="name">{comment.name}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
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
      dispatch({ type: reduxActions.GetCommentsByPostId, postId }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
