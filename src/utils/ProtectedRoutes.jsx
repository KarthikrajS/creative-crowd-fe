// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// function GuestRoute({ component: Component, ...rest }) {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
//       }
//     />
//   );
// }

// function UserRoute({ component: Component, ...rest }) {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// }

// export { GuestRoute, UserRoute };

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Navigate to="/" />;
      }}
    ></Route>
  );
};

export default ProtectedRoute;
