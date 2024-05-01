import React, { createContext, useEffect, useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import Contacts from "./Components/Contacts";
import AddContact from "./Components/AddContact";
import EditContact from "./Components/EditContact";
import Logout from "./Components/Logout";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NotFound from "./Pages/NotFound";

export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
    children: [
      {
        index: true,
        element: <Contacts />
      },
      {
        path: "/dashboard/add-contact",
        element: <AddContact />
      }
      ,
      {
        path: "/dashboard/edit-contact/:id",
        element: <EditContact />
      }
    ]
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    axios.get('https://contactms-api-flame.vercel.app/contactms/verify', {
      headers: {
        Authorization: `Berear ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user)
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
