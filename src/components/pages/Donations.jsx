import Donation from '../ui/Donation'

export default function Donations({ foodReq, donations, updatePage }) {
  console.log(`Viewing donations for the following food request: ${foodReq}`);
  console.log(donations);
  const donationComponents = donations.map(donation =>
  (<Donation
    key={donation.id}
    donation={donation}
    updatePage={updatePage}
  />
  )
  )

  return (
    <>
      <h1>Donations for {foodReq.meal_type} on {foodReq.date}</h1>
      <div className="donations-container">
        {donationComponents}
        <a href="#" onClick={() => updatePage("FoodRequestList")} className="card-link">Back</a>
      </div>
    </>
  )
}
