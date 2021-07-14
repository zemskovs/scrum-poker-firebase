import * as React from 'react';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';

import { firebaseConfig } from './configs';
import store from './store';
import LogInPage from './pages/LogIn';

const app = firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LogInPage />
    </Provider>
  );
};

export default App;
