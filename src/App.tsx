import * as React from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';

import { firebaseConfig } from './configs';

const app = firebase.initializeApp(firebaseConfig);

interface Props {
  name: string;
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Hello {name}</h1>
        <Button variant="contained">this is a material UI button</Button>
      </>
    );
  }
}

export default App;
