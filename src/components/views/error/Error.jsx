import React from 'react';
import {
  Link
} from "react-router-dom";

function Error() {
    return (
      <>
        <h1>Not Found</h1>
        <Link to="/welcome">HOME</Link>
      </>
    );
}
export default Error;
