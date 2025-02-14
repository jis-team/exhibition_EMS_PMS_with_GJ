import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import EMS from "./Routes/EMS";
import PMS from "./Routes/PMS";
import Home from "./Routes/Home";
import { createGlobalStyle } from "styled-components";

import "./App.css";

const GlobalStyle = createGlobalStyle`
  html, body {
    // position: fixed;
    
    // width: 1920px;
    // height: 1080px;
    overflow-y: auto;
  }
  // html::line-height: 1.15;
  html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
`;

function App() {
  return (
    <BrowserRouter basename="/exhibition_EMS_PMS_with_GJ">
      <GlobalStyle />
      <Routes>
        <Route path="/PMS" element={<PMS />}></Route>
        <Route path="/EMS/*" element={<EMS />}></Route>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
