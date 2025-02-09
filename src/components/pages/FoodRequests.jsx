import { useState, useEffect } from "react";

import FoodRequest from "../ui/FoodRequest"

import { API_URL } from '../../App';


export default function FoodRequests({ orgId, foodRequests, updatePage }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        console.log("about to fetch requests");
        console.log(`orgId: ${orgId}`)
        const fetchUrl = `${API_URL}/requests/${orgId}`
        console.log(fetchUrl);
        const response = await fetch(`${API_URL}/requests/${orgId}`);
        console.log(response);
        /*const foodReqs = await response.json();
        console.log("json'd");
        console.log(foodReqs);
        setRequests(foodReqs);*/
      } catch (error) {
        console.error(error);
      }
    }

    fetchRequests();
  }, [orgId]); // Re-fetch when orgId changes

  /*const requests = getRequests().map(foodReq => {
    <FoodRequest
      key={foodReq.id}
      foodReq={foodReq}
      updatePage={updatePage}
    />
  }
  )*/
  return (
    <>
      <h1>Current Food Requests</h1>
      {requests.map(foodReq => (
        <FoodRequest
          key={foodReq.id}
          foodReq={foodReq}
          updatePage={updatePage}
        />
      ))}
    </>
  )
}
