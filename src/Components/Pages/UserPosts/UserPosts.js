import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./UserPosts.css";

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
      {userPosts.length > 0 ? (
        <div className="posts-list">
          {userPosts.map((post) => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <p className={"post-title"}>{post.title}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
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
      dispatch({ type: "GET_POSTS_BY_USERID", userId }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
