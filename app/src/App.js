import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./navBarComponents/NavBar";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";
import UserList from "./components/UserList";
import CreateResident from "./components/CreateUser";
import UserPackages from "./components/UserPackages";
import Packages from "./components/Packages";

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Packages />} />
        <Route path="/packages" exact element={<UserPackages />} />
        <Route path="/overview/user-list" exact element={<UserList />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/my-packages" element={<Profile />} />
        <Route path="/overview/add-users" element={<CreateResident />} />
      </Routes>
    </>
  );
};

export default React.memo(App);
