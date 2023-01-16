/*
const fakeData = {
  name: "ali",
  lastName: "alavi",
  password: "123456",
  confirmPassword: "123456",
  acceptedRules: true
};

<FormComponent data={fakeData} />
*/

import { Link } from "react-router-dom"

const Buttons = () => {
  return (
    <div className="home-buttons">
      <Link className="btn btn-fill-green" to="/register">Register</Link>
      <Link className="btn btn-outline-green" to="/list">List</Link>
    </div>
  )
}

export default Buttons
