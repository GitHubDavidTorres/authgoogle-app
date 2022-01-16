import './app.css';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  const [{ isOpen, user, darkMode }, dispatch] = useStateValue();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: actionTypes.SET_USER, user: user });
      }
      console.log(user);
    });
  }, [user, dispatch]);

  useEffect(() => {
    if (darkMode) {
      dispatch({ type: actionTypes.SET_DARKMODE, darkMode: darkMode });
    }
  }, [darkMode, dispatch]);

  return (
    <div className="app">
      {!user ? (
        <>
          <Login />{' '}
        </>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <div className={`app__central ${isOpen ? 'display' : ''}`}>
              <Sidebar />
              <Main />
            </div>
          </ThemeProvider>
        </>
      )}
    </div>
  );
}

export default App;
