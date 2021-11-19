import logo from "./logo.svg";
import "./App.css";
import Message from "./components/Message";
import { useEffect, useState } from "react";
import axios from "axios";

const INITIALPOST = {
  username: "",
  title: "",
  content: "",
};

const baseURI = "https://my-worker.hesimengcs.workers.dev";

function App() {
  const [posts, setPosts] = useState([]);
  const [curPost, setCurPost] = useState(INITIALPOST);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await axios.get(`${baseURI}/posts`);
      const body = resp.data;
      if (body) {
        setPosts(body);
      }
    };

    getPosts();
  }, []);

  function handleChange(event) {
    const { id, value } = event.target;
    setCurPost((prevState) => ({ ...prevState, [id]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      curPost.content === "" &&
      curPost.title === "" &&
      curPost.username === ""
    ) {
      console.log("Empty fields.");
      return;
    }
    console.log("Submitted.");
    console.log(curPost);
    // Add the new posts into our array.
    const resp = await fetch(`${baseURI}/posts`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(curPost),
    });
    if (resp.status != 200) {
      console.log(resp.ok);
      console.error("Wrong status code.");
    }
    setPosts((oldPosts) => [...oldPosts, curPost]);
    setCurPost(INITIALPOST);
    console.log(posts.length);
  }
  return (
    <div>
      <form
        className="w-full max-w-lg m-auto py-4 mt-4 px-4 border mb-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center block text-gray-500 font-bold mb-4">
          Create a post.
        </h1>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-14">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="username"
              type="text"
              placeholder="Jane Doe"
              onChange={handleChange}
              value={curPost.username}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-14">
              Title
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              type="text"
              placeholder="Huge Announcement!"
              onChange={handleChange}
              value={curPost.title}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right md:mb-16 pr-14">
              Content
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="content"
              type="text"
              placeholder="Excited to potentially work at Cloudflare!"
              onChange={handleChange}
              value={curPost.content}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Enter
            </button>
          </div>
        </div>
      </form>

      {/* Create overflow. */}

      <div className="overflow-y-auto max-h-120 overscroll-y-contain">
        {posts.reverse().map((x) => {
          return (
            <Message
              username={x.username}
              title={x.title}
              content={x.content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
