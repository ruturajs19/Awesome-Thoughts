import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./Components/Pages/UsersList/Users";
import UserPosts from "./Components/Pages/UserPosts/UserPosts";
import PostDetails from "./Components/Pages/PostsDetails/PostDetails";
import MainHeader from "./Components/MainHeader/MainHeader";
import Modal from "./Components/Shared/Modal/Modal";

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/posts" exact>
        <UserPosts />
      </Route>
      <Route path="/posts/:postId" exact>
        <PostDetails />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  
  return (
    <div>
      <Router>
        <MainHeader />
        <Modal />
        <main>{routes}</main>
      </Router>
    </div>
  );
}

export default App;
