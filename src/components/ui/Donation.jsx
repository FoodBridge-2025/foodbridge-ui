export default function Donation({ donation, updatePage }) {
  console.log(donation);

  function confirmReceipt() {
    // indicate to backend that the item was received
    updatePage("Review", null, donation.id)
  }

  function handleStatus() {
    if (donation.status === "Open") {
      return (
        <>
          <button type="submit" className="btn btn-success">
            Approve
          </button>
          <button type="submit" className="btn btn-danger">
            Reject
          </button>
        </>
      )
    } else if (donation.status === "In-transit") {
      return (
        <>
          <button onClick={confirmReceipt} type="submit" className="btn btn-primary">
            Confirm receipt
          </button>
          <button type="submit" className="btn btn-danger">
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
          <strong>Servings:</strong> {donation.servings} <br />
          <strong>Description:</strong> {donation.desc} <br />
          <strong>Status:</strong> <span className={`badge ${donation.status === "Fulfilled" ? "bg-success" : "bg-warning"}`}>{donation.status}</span>
        </p>
        {handleStatus()}
      </div>
    </div>
  );
}
