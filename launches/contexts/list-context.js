import React, { useState, createContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ListContext = createContext({
  items: [],
  setItems: () => {},
  favorites: [],
  addFavorite: () => {},
  filter: {},
  setFilter: () => {},
  alert: { open: false, message: '', severity: 'success' },
  setAlert: () => {},
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ListContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState({});
  const [alert, setAlert] = useState({});

  const addFavorite = (obj) => {
    const exists = favorites.find(f => f?.flight_number === obj?.flight_number);

    if (!exists) setFavorites([...favorites, obj]);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ ...alert, open: true, message, severity });
  }

  return (
    <ListContext.Provider value={{
      items, setItems, favorites, addFavorite, filter, setFilter, showAlert,
    }}>
      {children}

      <Snackbar open={alert?.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert?.severity} sx={{ width: '100%' }}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </ListContext.Provider>
  );
}

export {
  ListContext,
  ListContextProvider,
}
