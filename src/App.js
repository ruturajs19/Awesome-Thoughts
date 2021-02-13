import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from './Components/Pages/UsersList/Users';
import UserPosts from './Components/Pages/UserPosts/UserPosts';
import PostDetails from './Components/Pages/PostsDetails/PostDetails';

function App() {
  return (
    <div className="Main">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
