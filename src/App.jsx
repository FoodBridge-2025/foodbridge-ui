import { useState } from "react";

import FoodRequestForm from './components/FoodRequestForm';
import Navbar from './components/Navbar';
import Donations from './components/pages/Donations';
import FoodRequests from './components/pages/FoodRequests';

import { dummyFoodRequests, dummyDonations } from './dummyrequests';

function App() {
  const [page, setPage] = useState("FoodRequestForm");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  function updatePage(newPage, requestId = null) {
    setPage(newPage)
    setSelectedRequestId(requestId);
  }

  function renderPage() {
    if (page === "FoodRequestForm") {
      return (
        <div className="food-request-container">
          <FoodRequestForm />
        </div>
      )
    } else if (page === "FoodRequestList") {
      return (
        <FoodRequests foodRequests={dummyFoodRequests} updatePage={updatePage} />
      )
    } else if (page === "Donations") {
      const foodRequest = dummyFoodRequests.find(request => request.id === selectedRequestId);
      const donations = dummyDonations.filter(donation => donation.requestId === selectedRequestId);
      console.log(`Loading donations`);
      console.log(donations)
      return (
        <Donations donations={donations} foodReq={foodRequest} updatePage={updatePage} />
      )
    }
    return null;
  }

  return (
    <>
      <Navbar curpage={page} updatePage={updatePage} />
      {renderPage()}
    </>
  )
}

export default App
