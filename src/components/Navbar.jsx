import FoodBridgeLogo from "/src/assets/foodbridgelogo.png"

export default function Navbar({ curpage, updatePage }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid" id="foodbridgenav">
        <a className="navbar-brand" onClick={() => updatePage("FoodRequestForm")} href="#">
          <img
            src={FoodBridgeLogo}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          FoodBridge
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${curpage === "FoodRequestList" ? "active" : ""}`} onClick={() => updatePage("FoodRequestList")} aria-current="page" href="#">Active Food Requests</a>
            </li>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <a href="" >Logout</a>
        </form>

      </div>
    </nav>
  )
}
