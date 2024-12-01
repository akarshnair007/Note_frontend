import React from "react";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddNote from "./Pages/AddNote";
import EditPage from "./Pages/EditPage";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addNote/:id" element={<AddNote />} />
        <Route path="/editNote/:id" element={<EditPage />} />
      </Routes>
    </>
  );
};

export default App;
