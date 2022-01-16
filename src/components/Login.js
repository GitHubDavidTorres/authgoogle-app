import './Login.css';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  // const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({ type: actionTypes.SET_USER, user: result.user })
      )
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <h1>Welcome to or Blog</h1>
      <Button onClick={signIn} variant="contained" endIcon={<SendIcon />}>
        Sign in with Goggle
      </Button>
    </div>
  );
};

export default Login;
