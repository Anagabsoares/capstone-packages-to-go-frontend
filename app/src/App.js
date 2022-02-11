import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Initial from "./pages/Initial";
import NavBar from "./navBarComponents/NavBar";
import Profile from "./pages/Profile";
import Loading from "./adminComponents/Loading";
import UserList from "./adminComponents/UserList";
import CreateResident from "./adminComponents/CreateUser";
import Packages from "./adminComponents/Packages";
import ResidentPackages from "./userComponents/ResidentPackages";
import DashBoard from "./adminComponents/DashBoard";
import UserRequest from "./adminComponents/UserRequest";
import NotFoundPage from "./pages/NotFound";
import { io } from "socket.io-client";

import "./App.css";

const App = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const check_role = async () => {
      const token = await getAccessTokenSilently;
      if (isAuthenticated) {
        try {
          let value = await user["https://netlify-integration.com/roles"];
          setRole(value);
        } catch (e) {
          console.error(e);
        }
      }
    };
    check_role();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const getTokenConnect = async () => {
      try {
        const token = await getAccessTokenSilently();
        const socket = io("http://localhost:9000", {
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${token}`,
              },
            },
          },
        });

        console.log(socket);

        socket.on("connect", () => {
          console.log("connected!");
          socket.emit("room", "room1");
        });

        socket.on("message", (data) => {
          console.log(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getTokenConnect();
  }, []);

  // Handling token expiration
  // socket.on("connect_error", (error) => {
  //   if (error.data.type === "UnauthorizedError") {
  //     console.log("User token has expired");
  //   }
  // });

  // Listening to events
  // socket.on("messages", (data) => {
  //   console.log(data);
  // });

  const protectedRoute = () => {
    if (isAuthenticated && role[0] === "admin") {
      return <Route path="/" exact element={<DashBoard />} />;
    } else if (isAuthenticated && role[0] === "admin") {
      return <Route path="/" exact element={<ResidentPackages />} />;
    } else {
      return <Route path="/" exact element={<Initial />} />;
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <NavBar />

      <Routes>
        {protectedRoute()}
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/users" exact element={<UserList />} />
        <Route path="/users" exact element={<UserList />} />
        <Route path="/users/add-users" element={<CreateResident />} />
        <Route path="/packages/requests" exact element={<UserRequest />} />
        <Route path="/packages" exact element={<Packages />} />
        <Route path="/packages/history" exact element={<Packages />} />
        <Route path="/my-packages" exact element={<ResidentPackages />} />
        <Route path="/404" exact element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
