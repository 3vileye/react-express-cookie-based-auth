import React from 'react';
import {Outlet} from 'react-router-dom'
import { AuthInit } from './context/auth.context';


function App() {
  return (
    <>
      <AuthInit>
        <Outlet />
      </AuthInit>
    </>
  );
}
export default App;
