import { useState } from 'react';

export default function Review() {
  const [ratings, setRatings] = useState({
    nutrition: 3,
    timeliness: 3,
    quantity: 3
  });

  function handleSubmit(e) {
    e.preventDefault();
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
