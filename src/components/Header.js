import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/React.png';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { Button, Switch } from '@mui/material';
import { auth } from '../firebase';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = () => {
  const [{ isOpen, user, darkMode }, dispatch] = useStateValue();

  const signOut = () => {
    auth
      .signOut()
      .then((user) => dispatch({ type: actionTypes.SET_USER, user: null }))
      .catch();
  };

  const toggleMenu = () => {
    dispatch({ type: actionTypes.TOGGLE_MENU, isOpen: !isOpen });
  };

  const toggleDarkMode = () => {
    dispatch({ type: actionTypes.SET_DARKMODE, darkMode: !darkMode });
  };

  return (
    <>
      {user ? (
        <div className="header">
          <div className="header__left">
            {/* //*conditional chaining//* */}
            <IconButton onClick={toggleMenu}>
              <MenuIcon htmlColor="#007FFF" fontSize="large" />
            </IconButton>
            <img src={logo} alt="logo"></img>
          </div>

          <div className="header__right">
            <Avatar src={user?.photoURL} />
            <IconButton defaultChecked={darkMode} onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* <Switch checked={darkMode} onChange={toggleDarkMode} /> */}

            <Button color="secondary" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
