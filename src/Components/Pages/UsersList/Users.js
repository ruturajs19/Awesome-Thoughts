import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import  "./Users.css";

function Users(props) {
  const { users, getUsers } = props;

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);
  return (
    <div className="center">
      {users.length > 0 && (
        <table className="table-container">
          <thead className="table-header">
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Company Name</b>
              </td>
              <td>
                <b>Blog Posts</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((userData) => (
              <tr key={userData.id} className="table-row">
                <td>{userData.name}</td>
                <td>{userData.company.name}</td>
                <td>
                  <Link to={`/${userData.id}/posts`}>Posts</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch({ type: "GET_USERS" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
