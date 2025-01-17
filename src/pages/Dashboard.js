import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { config } from "../utils/configs";

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [todaysOdds, setTodaysOdds] = useState([]);
  const [date, setDate] = useState();

  const handleGetDate = (event) => {
    let date = event.target.value;
    axios
      .post("/results/getByDate", { date: date }, config)
      .then((response) => {
        setResults(response.data);
        setDate(date);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetOdds = () => {
    let date = new Date();
    axios
      .post("/odds/getTodays", { date: date.toISOString().split("T")[0] }, config)
      .then((response) => {
        /* setTodaysOdds(response.data); */
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="dashboard-wrapper">
      <div>HomePage</div>
      <div onClick={handleGetOdds}>Get Odds</div>
      <input type="date" onChange={handleGetDate} />
      <div>Date of Results: {date && date} </div>
      <div className="dashboard-results-wrapper">
        {results.length ? (
          results.map((result, resultIndex) => (
            <div className="dashboard-result-wrapper" key={resultIndex}>
              {result.teams.away.teamName} VS {""}
              {result.teams.home.teamName}
            </div>
          ))
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
