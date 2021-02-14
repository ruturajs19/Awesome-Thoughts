import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./UserPosts.css";
import { reduxActions } from "../../../State/AwesomeThoughts.actions";

function UserPosts(props) {
  const { userPosts, getPostsByUserId } = props;
  const userId = useParams().userId;

  useEffect(() => {
    if (!userPosts.length) {
      getPostsByUserId(userId);
    }
  }, []);
  return (
    <div className="center">
      {userPosts.length > 0 && (
        <ul className="list-group mb-4 posts-list">
          <h2 className="post-list-heading">Posts:</h2>
          {userPosts.map((post) => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <li className="post-title">
                  <b>{post.title}</b>
                </li>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userPosts: state.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsByUserId: (userId) =>
      dispatch({ type: reduxActions.GetPostsByUserId, userId }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
