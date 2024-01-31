import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Threads.css";

function ThreadList() {
  const navigate = useNavigate();

  //getting the category id from the previous page through localStorage into fetchId.
  let fetchId = localStorage.getItem("category_id");

  //useState to track the threadList insertions and render the page on update.
  let [refresh, refreshPage] = useState(0);

  // useState to store the threadList form submission data.
  let [formData, setFormData] = useState({
    category_id: fetchId,
    userId: localStorage.getItem("loggedInUser"),
  });

  //getting questions on render of the page using useEffect Hook.
  let [category, setCategory] = useState({});
  let [threadList, setThreadList] = useState([]);

  //set as global by using useContext so that localStorage is avoided.
  //let [threadList_id, setThreadList_id] = useState(0);

  //useEffect Runs only on the first render
  useEffect(() => {
    if (!fetchId) {
      navigate("/");
    }
    async function fetchData() {
      //request to get the threadLists for particular category with id.
      try {
        const response = await axios.get("/threadLists", {
          params: {
            catId: fetchId,
          },
        });
        // console.log("threadList for id, got from request");
        if (response.statusText === "OK") {
          setThreadList(() => {
            return [...response.data];
          });
        } else {
          console.log("get threadLists error");
        }

        //request to get the category.
        const categoryResponse = await axios.get("/category", {
          params: { id: fetchId },
        });
        if (categoryResponse.statusText === "OK") {
          setCategory(...categoryResponse.data);
        } else {
          console.log("get specific Category error");
        }
        //console.log(categoryResponse.data);
      } catch (err) {
        navigate("/");
        console.log("axios error " + err.message);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [refresh]);

  //storing the form data state with useState
  function handleForm(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //insertion of the threadList form data to the DB.
  async function postData(event) {
    event.preventDefault();
    //console.log(formData);

    //send data to sever via route
    const response = await axios.post("/threadLists", {
      ...formData,
    });
    if (response.statusText === "OK") {
      //if data is stored successfully then the form is cleared for next submission.
      setFormData({
        category_id: fetchId,
        userId: localStorage.getItem("loggedInUser"),
      });

      //after retriving the data the page is rendered again to load new items.
      if (!refresh) {
        refreshPage(1);
      } else {
        refreshPage(0);
      }
    } else {
      console.log("threadLists request error");
    }
    //console.log(response.data);
  }
  return (
    <div className="content">
      <div className="back-links">
        <Link to="/">Home</Link> <i className="fa-solid fa-chevron-right"></i>{" "}
        {category.category_name}
      </div>
      <div className="data">
        <div className="post-data">
          <div>
            <div className="Ques">Topic : {category.category_name}</div>
            <div className="Ques-user">{category.description}</div>
          </div>
          {localStorage.getItem("loggedInUser") !== "null" ? (
            <form className="Ques-post" action="#" onSubmit={postData}>
              <h1>Start a discussion.</h1>
              <lable htmlFor="text-box">Problem Title.</lable>
              <br />
              <input
                type="text"
                id="text-box"
                style={{ height: "auto" }}
                name="question"
                value={formData.question || ""}
                onChange={handleForm}
                required={true}
              ></input>
              <br />
              <label htmlFor="text-area">Elaborate Your Consern.</label>
              <textarea
                id="text-box"
                placeholder="ask something about the question's"
                name="description"
                value={formData.description || ""}
                onChange={handleForm}
                required={true}
              ></textarea>
              <br />
              <button>Submit</button>
            </form>
          ) : (
            <div className="Ques-post">
              <h1>Please, Login to post questions.</h1>
              <p>To add, questions and answers login is needed !!!</p>
            </div>
          )}
        </div>
        <div className="list-data">
          <h1>Browse Questions</h1>

          {threadList.map((listItem) => (
            <div key={listItem.id}>
              <div>
                <div>
                  <span className="q">
                    Question By: {listItem.email} value at {listItem.date_time}
                  </span>
                  <br />
                  <span className="ques-head">
                    <Link
                      to="/threads"
                      onClick={() => {
                        localStorage.setItem("threadListId", listItem.id);
                      }}
                    >
                      {listItem.question}
                    </Link>
                  </span>
                  <br />
                  <span className="ques-desc">{listItem.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {threadList.length === 0 && (
          <div className="no-ques">
            <h1>No Questions Yet!...</h1>
            <em>add few questions.</em>
          </div>
        )}
      </div>
    </div>
  );
}
export default ThreadList;
