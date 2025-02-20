import {useState} from "react";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Latest from "./Latest";
import Education from "./Educational";
import Promotion from "./Promotional";
import Motivation from "./Motivational";
import News from "./News";
import Gaming from "./Gaming";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style.css";

function Main() {
  const [searchQuery,setSearchQuery]=useState("");

  return (
    <div className="app">
      <Header setSearchQuery={setSearchQuery} />

      <div className="navbar">
        <NavLink className={({isActive})=>isActive ? "not idle" : "idle"} to="/">All</NavLink>
        <NavLink className={({isActive})=>isActive ? "not idle" : "idle"} to="/education">Educational</NavLink>
        <NavLink className={({isActive})=>isActive ? "not idle" : "idle"} to="/promotion">Promotional</NavLink>
        <NavLink className={({isActive})=>isActive ? "not idle" : "idle"} to="/motivation">Motivational</NavLink>
        <NavLink className={({isActive})=>isActive ? "not idle" : "idle"} to="/news">News & Updates</NavLink>
        <NavLink className={({isActive})=>isActive ? "not idle" : "idle"} to="/gaming">Gaming</NavLink>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Latest searchQuery={searchQuery} />} />
          <Route path="/education" element={<Education searchQuery={searchQuery} />} />
          <Route path="/promotion" element={<Promotion searchQuery={searchQuery} />} />
          <Route path="/motivation" element={<Motivation searchQuery={searchQuery} />} />
          <Route path="/news" element={<News searchQuery={searchQuery} />} />
          <Route path="/gaming" element={<Gaming searchQuery={searchQuery} />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default Main;
