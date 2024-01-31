import "./Header.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Login from "./Login";
function Header(props) {
  const navigate = useNavigate();
  const [headOpen, setHeadOpen] = useState(false);

  function toggleHead() {
    if (headOpen) {
      document
        .querySelector(".navbar .navbar-left .navbar-left-ops")
        .classList.remove("open-navbar-left-ops");
      document
        .querySelector(".navbar .navbar-right")
        .classList.remove("open-navbar-right");
      setHeadOpen(false);
    } else {
      document
        .querySelector(".navbar .navbar-left-ops")
        .classList.add("open-navbar-left-ops");
      document
        .querySelector(".navbar .navbar-right")
        .classList.add("open-navbar-right");
      setHeadOpen(true);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <div>BECLEAR</div>{" "}
          <div className="menu">
            <i className="fa-solid fa-bars" onClick={toggleHead}></i>
          </div>
        </div>
        <div className="navbar-left-ops">
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
          <Link to="about">About</Link>
          <Link to="contact">Contact Us</Link>
        </div>
      </div>
      <div className="navbar-right">
        <form action="/search">
          <input
            type="text"
            name="search"
            placeholder="Search"
            required={true}
          />
          <button>search</button>
        </form>
        {props.user === null ? (
          <>
            <button>
              <Link to="login">Login</Link>
            </button>
            <button>
              <Link to="login">SignUp</Link>
            </button>
          </>
        ) : (
          <>
            <span>welcome {props.user.user_name}</span>
            <button
              onClick={() => {
                props.setUser(null);
                localStorage.setItem("loggedInUser", null);
                navigate("/");
              }}
            >
              <Link to="/">Logout</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
