import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "../components/view/HomeView"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView/>}></Route>
    </Routes>
  );
};

export default App;
