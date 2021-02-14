import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Users.css";
import { reduxActions } from "../../../State/AwesomeThoughts.actions";

function Users(props) {
  const { users, getUsers } = props;

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);
  return (
    <div className="table-container center">
      {users.length > 0 && (
        <table className="table table-dark table-striped">
          <thead className="table-header">
            <tr>
              <td className="table-data">
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
                  <Link to={`/${userData.id}/posts`}>
                    <b>View Posts</b>
                  </Link>
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
    getUsers: () => dispatch({ type: reduxActions.GetUsers }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
