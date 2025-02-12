import { useState } from "react";

import FoodRequestForm from './components/FoodRequestForm';
import Navbar from './components/Navbar';
import Donations from './components/pages/Donations';
import FoodRequests from './components/pages/FoodRequests';
import Review from './components/pages/Review'
import Login from './components//pages/Login'

import { dummyFoodRequests, dummyDonations } from './dummyrequests';

export const API_URL = import.meta.env.VITE_API_URL;
export const KAUSHAL_API_URL = import.meta.env.VITE_KAUSHAL_API_URL;

function App() {
  const [page, setPage] = useState("FoodRequestForm");
  const [selectedFoodRequest, setSelectedFoodRequest] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orgId, setOrgId] = useState("")

  function updatePage(newPage, foodRequest = null, userId = null) {
    setPage(newPage)
    setSelectedFoodRequest(foodRequest);
    setUserId(userId);
  }

  function handleLogin(data) {
    console.log(data);
    const newOrgId = data.community_centre_id.id;
    console.log(`Org id set to ${newOrgId}`);
    setOrgId(newOrgId);
    setIsAuthenticated(true);
  }

  function handleSignup(data) {
    console.log(data);
    setIsAuthenticated(true);
  }

  function renderPage() {
    if (page === "FoodRequestForm") {
      return (
        <div className="food-request-container">
          <FoodRequestForm updatePage={updatePage} orgId={orgId} />
        </div>
      )
    } else if (page === "FoodRequestList") {
      return (
        <FoodRequests orgId={orgId} foodRequests={dummyFoodRequests} updatePage={updatePage} />
      )
    } else if (page === "Donations") {
      // const donations = dummyDonations.filter(donation => donation.requestId === selectedFoodRequest.id);
      console.log(`Loading donations`);
      // console.log(donations)
      return (
        <Donations /*donations={donations}*/ foodReq={selectedFoodRequest} updatePage={updatePage} />
      )
    } else if (page === "Review") {
      return (
        <Review  updatePage={updatePage} userId={userId} />
      )
    }
    return null;
  }

  return (
    <>
      {isAuthenticated ?
        <>
          <Navbar curpage={page} updatePage={updatePage} />
          {renderPage()}
        </>
        :
        <Login handleLogin={handleLogin} handleSignup={handleSignup} />
      }
    </>
  )
}

export default App
