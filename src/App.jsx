import './App.css';
import FoodRequestForm from './components/FoodRequestForm';
import Navbar from './components/Navbar';
import Donations from './components/pages/Donations.jsx';
import FoodRequest from './components/ui/FoodRequest';
import { useState } from "react";

function App() {
  const [page, setPage] = useState("FoodRequestForm");

  function updatePage(newPage) {
    setPage(newPage)
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
        <FoodRequest />
      )
    } else if (page === "Donations") {
      return (
        <Donations />
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
