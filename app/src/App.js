import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";
import UserList from "./components/UserList";
import CreateResident from "./components/CreateResident";

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
        <Route path="/overview/user-list" exact element={<UserList />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/my-packages" element={<Profile />} />
        <Route path="/overview/add-users" element={<CreateResident />} />
      </Routes>
    </>
  );
};

export default React.memo(App);
