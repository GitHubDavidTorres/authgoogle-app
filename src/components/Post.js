import { Avatar, IconButton } from '@mui/material';
import './Post.css';
import { useStateValue } from '../StateProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { forwardRef } from 'react';

const Post = forwardRef(
  ({ id, title, text, isBlue, username, avatar }, ref) => {
    const [{ user }] = useStateValue();

    const removePost = () => {
      db.collection('posts').doc(id).delete();
    };

    const likePost = () => {
      const likedPost = db.collection('posts').doc(id);
      likedPost
        .get()
        .then((doc) => likedPost.update({ isBlue: !doc.data().isBlue }));
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__body">
          <div className="post__bodyLeft">
            <Avatar className="avatar" src={avatar} />
            <h3>{title}</h3>
            <h4>{text}</h4>
            <h6>{username}</h6>
          </div>
          <IconButton onClick={removePost}>
            <DeleteIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
        <div className="post__icons">
          <IconButton onClick={likePost}>
            <ThumbUpIcon color={isBlue ? 'primary' : ''} />
          </IconButton>
        </div>
      </div>
    );
  }
);

export default Post;
