import './Main.css';
import Post from './Post';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import { db } from '../firebase';
import firebase from 'firebase/app';
import FlipMove from 'react-flip-move';
import { useStateValue } from '../StateProvider';

const Main = () => {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({ title: '', text: '' });

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (input.text) {
      db.collection('posts').add({
        title: input.title,
        text: input.text,
        username: user?.displayName,
        avatar: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isBlue: false,
      });
    } else {
      alert('Introduce valid values');
    }

    setInput({ title: '', text: '' });
  };

  return (
    <div className="main">
      <div className="main__input">
        <form noValidate autoComplete="off">
          <div className="main__inputForm">
            <TextField
              value={input.title}
              onChange={(event) =>
                setInput({ ...input, title: event.target.value })
              }
              id="standard-basic"
              label="Title"
              variant="standard"
            />
            <TextField
              className="main__inputFormText"
              id="outlined-basic"
              label="Enter your post here ...."
              variant="outlined"
              value={input.text}
              onChange={(event) =>
                setInput({ ...input, text: event.target.value })
              }
            />
          </div>
          <button
            className="button"
            type="submit"
            variant="contained"
            onClick={handlerSubmit}
          >
            Post
          </button>
        </form>
      </div>
      <div className="main__posts">
        <FlipMove>
          {posts.map(({ id, data: { title, text, isBlue ,avatar,username} }) => (
            <Post title={title} text={text} key={id} id={id} isBlue={isBlue} username={username} avatar={avatar}/>
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Main;
