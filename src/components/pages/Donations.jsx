import { useEffect, useState } from 'react';
import Donation from '../ui/Donation';
import { API_URL } from '../../App';

export default function Donations({ foodReq, updatePage }) {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        console.log(`Food req id: ${foodReq.id}`);
        const response = await fetch(`${API_URL}/food_items/${foodReq.id}`, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "True"
          }
        });

        if (response.status === 404) {
          setError('Donations not found.');
          return;
        }

        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError('An error occurred while fetching donations.');
      }
    }
    fetchDonations();
  }, [foodReq]);

  const donationComponents = donations.map(donation => (
    <Donation
      key={donation.id}
      donation={donation}
      updatePage={updatePage}
    />
  ));

  return (
    <>
      <h1>Donations for {foodReq.meal_type} on {foodReq.date}</h1>
      <div className="donations-container">
        {error ? <p>{error}</p> : donationComponents}
        <a href="#" onClick={() => updatePage("FoodRequestList")} className="card-link">Back</a>
      </div>
    </>
  );
}
