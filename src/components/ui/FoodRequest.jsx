export default function FoodRequest({ foodReq, updatePage }) {

  // Clicking on this component should pull up 
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',  // Full month name
      day: 'numeric', // Numeric day
      year: 'numeric' // Full year
    });
  }

  function viewDonations() {
    console.log("Clicked");
    updatePage("Donations", foodReq.id);
  }

  console.log(foodReq)

  return (
    <div className="card mx-auto mb-3 foodrequest">
      <div className="card-body" onClick={viewDonations}>
        <h5 className="card-title">{foodReq.date}</h5>
        <p className="card-text">
          <strong>Type:</strong> {foodReq.meal_type} <br />
          <strong>Servings:</strong> {foodReq.servings} <br />
        </p>
      </div>
    </div>
  );
}
