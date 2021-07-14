import * as React from 'react';
import { useSelector } from 'react-redux';

const LogInPage = () => {
  const state = useSelector((state) => state);
  console.log(state);
  return <div>Hello from login page</div>;
};

export default LogInPage;
