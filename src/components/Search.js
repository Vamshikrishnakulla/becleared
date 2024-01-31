import "./Threads.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let [threadList, setThreadList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      //request to get the threadLists for particular category with id.
      try {
        const response = await axios.get("/search", {
          params: {
            query: searchParams.get("search") || "",
          },
        });
        // console.log("threadList for id, got from request");
        if (response.statusText === "OK") {
          setThreadList(() => {
            return [...response.data];
          });
        } else {
          console.log("get threadLists error for search query");
        }
      } catch (err) {
        navigate("/");
        console.log("axios error " + err.message);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="data">
      <div className="list-data">
        <h1>Search results for `{searchParams.get("search") || ""}`</h1>

        {threadList.map((listItem) => (
          <div key={listItem.id}>
            <div>
              <div>
                <span className="q">
                  Question By: kk@gamil.com value at {listItem.date_time}
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
          <h1>No Search results!...</h1>
          <em>Try to explain your query breifly.</em>
        </div>
      )}
    </div>
  );
}

export default Search;
