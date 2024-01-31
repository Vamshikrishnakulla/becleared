import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const navigate = useNavigate();
  let [userRegistered, userRegistration] = useState(true);
  let [user, setUser] = useState(undefined);
  let [userMessage, setUserMessage] = useState("");
  let [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("LoggedInUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      //setUser(foundUser.user_name);
      console.log(foundUser);
    }
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  //storing the states in a page when the user-form is submitted to store the user-data to the database.
  const handleChange = (event) => {
    setUserFormData({
      ...userFormData,
      [event.target.name]: event.target.value,
    });
  };
  //let [userloggedin, userlogin] = useState(false);

  function handleFormStatus(event) {
    console.log(event.target.innerHTML);
    if (event.target.id === "signStatus") {
      if (event.target.innerHTML === "Register") {
        userRegistration(false);
        setUserFormData({});
        setUserMessage("");
      } else {
        userRegistration(true);
        setUserFormData({});
        setUserMessage("");
      }
    }
  }

  function handleForm(event) {
    event.preventDefault();
    if (!userRegistered) {
      if (userFormData.password === userFormData.cpassword) {
        //axios request to sever for user.
        axios
          .post("/userdata", {
            username: userFormData.username,
            email: userFormData.email,
            password: userFormData.password,
          })
          .then((response) => {
            //console.log("server response is after storing user data ");
            //console.log(response.data);
            userRegistration(true);
            setUserMessage(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        console.log("passwords does not match.");
        setUserMessage(
          "Passwords does not match. Try again to match both passwords!"
        );
      }
    } else {
      axios
        .post("/getuserdata", {
          username: userFormData.username,
          password: userFormData.password,
        })
        .then((response) => {
          console.log("server response is after loggin user data ");
          //console.log(response.data);
          //set loggedIn status for a user to true or false.
          if (response.data.length) {
            //localStorage.setItem("user", response.data[0].user);
            //localStorage.setItem("userId", response.data[0]._id);
            localStorage.setItem("loggedInUser", response.data[0]._id);
            setUser(response.data[0].user_name);
            props.user(response.data[0]);
          } else {
            console.log("incorrect loggin details.");
            setUserMessage("Incorrect loggin details.");
            setUserFormData({
              username: "",
              email: "",
              password: "",
              cpassword: "",
            });
            setUserMessage("Incorrect loggin details or user not registered.");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <form onSubmit={handleForm} className="user-form">
      <p>{userMessage}</p>
      <img
        className="circle-img"
        src="/images/loginimage.jpg"
        alt="avatar_img"
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={userFormData.username || ""}
        onChange={handleChange}
        required={true}
      />
      {/*props.userRegistered ? (
        <>
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
        </>) : (
        <>
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
        </>
        )*/}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userFormData.password || ""}
        onChange={handleChange}
        required={true}
      />
      {userRegistered === false && (
        <>
          <input
            type="password"
            name="cpassword"
            value={userFormData.cpassword || ""}
            placeholder="Conform Password"
            onChange={handleChange}
            required={true}
          />
          <input
            type="email"
            name="email"
            value={userFormData.email || ""}
            placeholder="someone@email.com"
            onChange={handleChange}
            required={true}
          />
        </>
      )}
      <button type="submit">{userRegistered ? "Login" : "Register"}</button>
      <div id="signStatus" onClick={handleFormStatus}>
        {userRegistered ? "Register" : "Login"}
      </div>
    </form>
  );
}

/* //TO persist the user sessions.

    import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogin = async (username, password) => {
    const response = await axios.post('/api/login', { username, password });
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default App;

*/
export default Login;
