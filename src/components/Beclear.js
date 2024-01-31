import "./Beclear.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Beclear() {
  let [categories, setCategory] = useState([]);
  //let [category_id, setCategory_id] = useState(0);//set as global by using useContext.

  //logic to rotate the front page main images.
  let [image, setImage] = useState(0);
  function changeImage(val) {
    if (!val) {
      if (image <= 0) {
        image = image + 1;
      }
      image = (image - 3) % 3;
    } else {
      image = Math.abs(image);
      image = (image + 1) % 3;
    }
    setImage(image);
    console.log(Math.abs(image));
  }

  useEffect(() => {
    //Runs only on the first render
    let foundUser = localStorage.getItem("loggedInUser");
    console.log(foundUser);
    if (foundUser === null) {
      localStorage.setItem("loggedInUser", null);
    }

    //asynchronus function for getting the categories.
    async function fetchData() {
      try {
        const response = await axios.get("/categories");
        //console.log("category got from request");
        //console.log(response.data);
        setCategory(() => {
          return [...response.data];
        });
      } catch (err) {
        console.log("axios error " + err.message);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="start-page">
      <div
        className="top"
        style={{ backgroundImage: `url(/images/img${Math.abs(image)}.jpg)` }}
      >
        <i
          className="fa-solid fa-chevron-left"
          onClick={() => {
            changeImage(0);
          }}
        ></i>
        <i
          className="fa-solid fa-chevron-right"
          onClick={() => {
            changeImage(1);
          }}
        ></i>
      </div>
      <div className="cards">
        {categories.map((category) => (
          <div className="card" key={category.id}>
            <Link to="/threadList">
              <span
                onClick={() => {
                  localStorage.setItem("category_id", category.id);
                }}
              >
                {category.category_name}
              </span>
            </Link>
            <p>{category.description.substring(0, 25) + "..."}</p>
            <button>
              <Link to="/threadList">
                <span
                  onClick={() => {
                    localStorage.setItem("category_id", category.id);
                  }}
                >
                  view threads
                </span>
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Beclear;
