export const initialState = { isOpen: false, user: null, darkMode: false };

export const actionTypes = {
  TOGGLE_MENU: 'TOGGLE_MENU',
  SET_USER: 'SET_USER',
  SET_DARKMODE: 'SET_DARKMODE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MENU:
      return { ...state, isOpen: action.isOpen };
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.SET_DARKMODE:
      return { ...state, darkMode: action.darkMode };
    default:
      return state;
  }
};

export default reducer;
