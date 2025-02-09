import { API_URL } from '../App';

export default function FoodRequestForm({ orgId, updatePage }) {
  async function addElem(formData) {

    console.log(formData);
    const reqBody = {
      community_centre_id: orgId,
      servings: formData.get("no-serving"),
      date: formData.get("when"),
      meal_type: formData.get("meal-time"),
      status: "Open"
    }
    console.log(reqBody);
    try {
      const response = await fetch(`${API_URL}/requirements/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
      const data = await response.json();
      console.log(data);
      updatePage("FoodRequestList")
    } catch {

    }
  }
  return (
    <div className="card mx-auto" style={{ maxWidth: "60rem" }}>
      <div className="card-body">
        <h5 className="card-title mb-4">What are your food needs?</h5>
        <form action={addElem}>
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-body-secondary">
              How many people do you anticipate serving?
            </h6>
            <input
              type="number"
              name="no-serving"
              min={0}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-body-secondary">When?</h6>
            <input
              type="date"
              name="when"
              className="form-control"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                type="radio"
                name="meal-time"
                value="breakfast"
                className="form-check-input"
                id="breakfast"
              />
              <label className="form-check-label" htmlFor="breakfast">
                Breakfast
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                name="meal-time"
                value="lunch"
                className="form-check-input"
                id="lunch"
              />
              <label className="form-check-label" htmlFor="lunch">
                Lunch
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                name="meal-time"
                value="dinner"
                className="form-check-input"
                id="dinner"
              />
              <label className="form-check-label" htmlFor="dinner">
                Dinner
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
