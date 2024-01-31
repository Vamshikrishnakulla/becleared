import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Threads.css";

function Threads() {
  const navigate = useNavigate();
  const fetchCatId = localStorage.getItem("category_id");
  const fetchThreadListId = localStorage.getItem("threadListId");
  //console.log("catId " + fetchCatId + "threadId " + fetchId);

  const [formData, setFormData] = useState({
    thread_list_id: fetchThreadListId,
    userId: localStorage.getItem("loggedInUser"),
  });

  //i.e,.. for reloading the page after posting threads.
  const [refresh, refreshPage] = useState(0);

  const [category, setCategory] = useState([]);
  const [threadList, setThreadList] = useState([]);
  const [threads, setThreads] = useState([]);
  //retrive the threadList info from sever.
  useEffect(() => {
    if (!fetchCatId) {
      navigate("/");
    }

    async function fetchData() {
      //request to get the threads for particular category with id.
      try {
        const response = await axios.get("/threads", {
          params: {
            id: fetchThreadListId,
          },
        });
        // console.log("threads for id, got from request");
        if (response.statusText === "OK") {
          setThreads(() => {
            return [...response.data];
          });
          console.log(threads);
        } else {
          console.log("get threads error");
        }

        //request to get the threadList.
        const threadListResponse = await axios.get("/threadLists", {
          params: { id: fetchThreadListId },
        });
        if (threadListResponse.statusText === "OK") {
          setThreadList(...threadListResponse.data);
          //console.log("threadList for threads data");
          //console.log(threadList);
        } else {
          console.log("get specific threadList error");
        }
        //console.log(threadListResponse.data);

        //request to get the category.
        const categoryResponse = await axios.get("/category", {
          params: { id: fetchCatId },
        });
        if (categoryResponse.statusText === "OK") {
          setCategory(...categoryResponse.data);
        } else {
          console.log("get specific Category error");
        }
        //console.log(categoryResponse.data);
      } catch (err) {
        console.log("axios error " + err.message);
        navigate("/");
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [refresh]);

  function handleForm(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  async function postData(event) {
    event.preventDefault();
    //console.log(formData);

    // send data to sever via route
    const response = await axios.post("/threads", {
      ...formData,
    });
    if (response.status === 200) {
      setFormData(() => ({
        thread_list_id: fetchThreadListId,
        userId: localStorage.getItem("loggedInUser"),
      }));
      if (!refresh) {
        refreshPage(1);
      } else {
        refreshPage(0);
      }
    }
    //console.log(response);
  }
  return (
    <div className="content">
      <div className="back-links">
        <Link to="/threadList">{category.category_name}</Link>{" "}
        <i className="fa-solid fa-chevron-right"></i> comments...
      </div>
      <div className="data">
        <div className="post-data">
          <div>
            <div className="Ques-data">
              <span className="Ques">Question : {threadList.question}</span>
              <br />
              <span className="Ques-user">
                description : {threadList.description}
              </span>
              <br />
              <em className="Ques-by">Question By: {threadList.email}</em>
            </div>
          </div>
          {localStorage.getItem("loggedInUser") !== "null" ? (
            <form className="Ques-post" onSubmit={postData}>
              <h1>Start a Comment.</h1>
              <lable htmlFor="text-box">Type Your Comment.</lable>
              <br />
              <textarea
                id="text-box"
                name="description"
                placeholder="ask something about the question's"
                value={formData.description || ""}
                onChange={handleForm}
                required={true}
              ></textarea>
              <br />
              <button>post comment...</button>
            </form>
          ) : (
            <div className="Ques-post">
              <h1>Please Login to post comments.</h1>
              <p>To add comments login is needed !!!</p>
            </div>
          )}
        </div>
        <div className="list-data">
          {threads.map((threadItem) => (
            <div key={threadItem.id}>
              <div className="left">
                <span className="q">
                  comment by: {threadItem.email} value at {threadItem.date_time}
                </span>
                <br />
                <span className="Ques-user">{threadItem.description}</span>
              </div>
              {localStorage.getItem("loggedInUser") !== "null" && (
                <div className="right">
                  <button>like</button>
                  <button>dislike</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {threads.length === 0 && (
          <div className="no-ques">
            <h1>No Comments Yet!...</h1>
            <em>be the first to add Comment.</em>
          </div>
        )}
      </div>
    </div>
  );
}
export default Threads;
