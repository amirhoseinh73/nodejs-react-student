import { useEffect, useRef, useState } from "react";
import { requestGet } from "../helpers/fetch";
import { getSearchedUsersRoute } from "../helpers/routes";
import ReactTableBody from "../components/Table/ReactTableBody";
import { COLUMNS } from "../helpers/table";
import { Button, Form } from "react-bootstrap";

const Search = () => {

  const [users, setUsers] = useState([])

  const searchInput = useRef(null)

  const searchUsers = (e) => {
    if (e) e.preventDefault(); // for remove default submit form for not refresh page

    const input = searchInput.current

    const searchKey = input.value

    const callback = (respond) => {
      if ( Number(respond.status) === 200 ) {
        setUsers(respond.data)
      } else {
        setUsers([])
      }
    }

    requestGet( getSearchedUsersRoute(searchKey), callback )
  }

  useEffect( () => {
    searchUsers()
  }, []);

  return (
    <div className="list-user">
      <h1 className="title2 my-4">Search users</h1>

      <Form className="form-center" onSubmit={searchUsers}>
        <Form.Group className="inputbox" md="3" controlId="validationFirstName">
          <Form.Label className="label-text">Search by firstname or lastname : </Form.Label>
          <Form.Control
            className="flex-input"
            onChange={searchUsers}
            ref={searchInput}
            name="search"
            type="text"
            required
          />
        </Form.Group>

        <Button className="btn-search" type="submit">
          search
        </Button>
      </Form>
      
      <ReactTableBody columns={COLUMNS} data={users} limit={3}/>
    </div>
  )
}

export default Search