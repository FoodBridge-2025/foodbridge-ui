import FoodRequest from "../ui/FoodRequest"

export default function FoodRequests({ foodRequests, updatePage }) {

  const requests = foodRequests.map(foodReq =>
  (<FoodRequest
    key={foodReq.id}
    foodReq={foodReq}
    updatePage={updatePage}
  />
  )
  )
  return (
    <>
      <h1>Current Food Requests</h1>
      {requests}
    </>
  )
}
