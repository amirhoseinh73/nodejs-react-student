import { Link } from "react-router-dom"

const Buttons = () => {
  return (
    <div className="home-buttons">
      <Link className="btn btn-fill-blue" to="/register">Register</Link>
      <Link className="btn btn-outline-blue" to="/list">List</Link>
    </div>
  )
}

export default Buttons
