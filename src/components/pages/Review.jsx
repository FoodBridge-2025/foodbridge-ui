import { useState } from 'react';
import {API_URL} from "../../App.jsx";

export default function Review({userId, updatePage}) {
  const [ratings, setRatings] = useState({
    nutrition: 3,
    timeliness: 3,
    quantity: 3
  });

  async function handleSubmit(e) {
    e.preventDefault();

// Calculate the sum of the values
    const sum = Object.values(ratings)
        .map(value => parseInt(value, 10)) // Convert each value to an integer
        .reduce((acc, value) => acc + value, 0)
// Multiply the sum by 5
    const result = sum * 5;
    console.log(sum);
    const fetchUrl = `${API_URL}/users/${userId}/token_count`;

    try {
      // Step 1: Fetch the current token_count
      const response = await fetch(fetchUrl, {
        headers: {
          "ngrok-skip-browser-warning": "True"
        }
      });
      const data = await response.json(); // Assuming the response contains the current token_count in the body

      const currentTokenCount = data; // Adjust this based on the actual response structure

      // Step 2: Add the result to the current token_count
      const updatedTokenCount = currentTokenCount + result;

      // Step 3: Make a PUT request to update the token_count
      const updateResponse = await fetch(`${fetchUrl}?token_count=${parseInt(updatedTokenCount)}`, {
        method: "PUT"
      });

      if (updateResponse.ok) {
        console.log("Token count updated successfully");
      } else {
        console.log("Failed to update token count");
      }

    } catch (error) {
      console.error("Error fetching or updating token count:", error);
    }
    updatePage("FoodRequestForm", null, null)
    console.log("Submitted ratings:", ratings);
  }

  const RangeInput = ({ id, label, value, onChange }) => (
    <div className="mb-4">
      <label htmlFor={id} className="form-label text-body-secondary">
        {label}
      </label>
      <div className="d-flex align-items-center gap-3">
        <input
          type="range"
          className="form-range flex-grow-1"
          min="1"
          max="5"
          step="1"
          id={id}
          value={value}
          onChange={onChange}
        />
        <span className="badge bg-secondary">{value}</span>
      </div>
      <div className="d-flex justify-content-between px-2 mt-1">
        <span className="text-body-secondary small">1</span>
        <span className="text-body-secondary small">2</span>
        <span className="text-body-secondary small">3</span>
        <span className="text-body-secondary small">4</span>
        <span className="text-body-secondary small">5</span>
      </div>
    </div>
  );

  return (
    <div className="card mx-auto" style={{ maxWidth: "60rem" }}>
      <div className="card-body">
        <h3 className="card-title mb-4">Confirming receipt!</h3>
        <h6 className="card-subtitle mb-4">Did this donation meet expectations?</h6>
        <form onSubmit={handleSubmit}>
          <RangeInput
            id="nutrition"
            label="Nutrition -- Was the meal nutritious?"
            value={ratings.nutrition}
            onChange={(e) => setRatings(prev => ({ ...prev, nutrition: e.target.value }))}
          />
          <RangeInput
            id="timeliness"
            label="Timely delivery -- Did the meal arrive in time to be useful?"
            value={ratings.timeliness}
            onChange={(e) => setRatings(prev => ({ ...prev, timeliness: e.target.value }))}
          />
          <RangeInput
            id="quantity"
            label="Quantity -- Did the user deliver the promised amount of servings?"
            value={ratings.quantity}
            onChange={(e) => setRatings(prev => ({ ...prev, quantity: e.target.value }))}
          />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
