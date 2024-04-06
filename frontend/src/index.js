import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Main from "./Main";
import KakaoCallback from "./KakaoCallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="main" element={<Main />} />
        <Route path="callback/kakao" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
