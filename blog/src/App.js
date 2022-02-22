import CreatePost from "./createPost";
import './global.css'
import PostList from "./postList";

function App() {
  return (
    <div className="App">
      <h1>Create post</h1>
      <CreatePost />
      <hr />

      <PostList />
    </div>
  );
}

export default App;
