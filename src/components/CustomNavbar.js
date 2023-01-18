import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const CustomNavbar = () => {
  return (
    <Navbar>
        <Navbar.Text>Great News Letter</Navbar.Text>
        <Nav>
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/register">Register</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/list">List</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/search">Search</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
  )
}

export default CustomNavbar