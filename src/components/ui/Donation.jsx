import {API_URL} from "../../App.jsx";

export default function Donation({ donation, updatePage }) {
    console.log(donation);

  async function confirmReceipt(fooditemId) {
      try {
          const fetchUrl = `${API_URL}/food_items/${fooditemId}/status`
          const response = await fetch(fetchUrl, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"  // Set the content type to JSON
              },
              body: JSON.stringify({
                  "status": "Received"
              })
          });
          updatePage("FoodRequestForm", null, donation.user.id)
      } catch (error) {
          console.error(error);
      }
  }

  async function updateStatus(fooditemId, status) {
      try {
          const fetchUrl = `${API_URL}/food_items/${fooditemId}/status`
          const response = await fetch(fetchUrl, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"  // Set the content type to JSON
              },
              body: JSON.stringify({
                "status": status
              })
          });
          updatePage("FoodRequests", null, donation.id)
      } catch (error) {
          console.error(error);
      }
  }

  function handleStatus() {
    if (donation.status === "Open") {
      return (
        <>
          <button type="submit" onClick={() => updateStatus(donation.id, "In Transit")} className="btn btn-success">
            Approve
          </button>
          <button type="submit" onClick={() => updateStatus(donation.id, "Rejected")} className="btn btn-danger">
            Reject
          </button>
        </>
      )
    } else if (donation.status === "In Transit") {
      return (
        <>
          <button onClick={() => confirmReceipt(donation.id)} type="submit" className="btn btn-primary">
            Confirm receipt
          </button>
          <button type="submit" onClick={() => updateStatus(donation.id, "Not fulfilled")} className="btn btn-danger">
            Cancel
          </button>
        </>
      )
    }
  }

  return (
    <div className="card mx-auto mb-3 foodrequest">

      <img src={donation.image} className="card-img-top" alt="Image of food" style={{ "maxWidth": "200px" }} />
      <div className="card-body" >
        <h5 className="card-title">{donation.title}</h5>
          <p className="card-text">
              <strong>Donor:</strong> {donation.user.name} <br/>
              <strong>Donor's Address:</strong> {donation.user.address} <br/>
              <strong>Donor's Phone Number:</strong> {donation.user.contact} <br/>
              <strong>Servings:</strong> {donation.servings} <br/>
              <strong>Description:</strong> {donation.description} <br/>
              <strong>Status:</strong> <span
              className={`badge ${donation.status === "Fulfilled" ? "bg-success" : "bg-warning"}`}>{donation.status}</span>
          </p>
          {handleStatus()}
      </div>
    </div>
  );
}
