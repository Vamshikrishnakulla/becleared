import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Beclear from "./components/Beclear.js";
import Contact from "./components/Contact.js";
import About from "./components/About.js";
import Threads from "./components/Threads.js";
import ThreadList from "./components/ThreadList.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import NoPage from "./components/NoPage.js";
import Login from "./components/Login.js";
import Search from "./components/Search.js";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="container">
      {/* all routes and links must be nested inside the BrowserRouter */}
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        {/* route handler can be multiple */}
        <Routes>
          <Route index element={<Beclear />} />
          <Route path="threads" element={<Threads />} />
          <Route path="threadList" element={<ThreadList />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login user={setUser} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
