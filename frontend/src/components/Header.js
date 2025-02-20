import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Header({ setSearchQuery }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
  const [username, setUsername] = useState("");
  const menuref = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const togglemenu = () => {
    setMenu(true);
  };

  useEffect(() => {
    const handleclickevent = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleclickevent);
    return () => {
      document.removeEventListener("mousedown", handleclickevent);
    };
  });

  const handleSearchChange=(e)=>{
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="title">
        <img src="logotext.png" alt="Logo"></img>
        <p>Bringing you the simplest updates, ideas, and moments.</p>
        <input type="text" placeholder="Search articles..." className="search-input" onChange={handleSearchChange} />
      </div>
      <div className="registration">
        {isLoggedIn?(
          <div className="profile">
            <Link to="/create">+ Create</Link>
            <img src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" onClick={togglemenu} alt="Profile" />
            {menu && (
              <div className="profilein" ref={menuref}>
                <p>{username}</p>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        ):(
          <>
            <Link to="/auth/signin" className="inregistration">
              Sign In
            </Link>
            <Link to="/auth/signup" className="inregistration">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
