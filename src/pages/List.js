import { useEffect, useState } from "react";
// import Table from "../components/Table/TableBody"
import { requestGet } from "../helpers/fetch";
import { getAllUsersRoute } from "../helpers/routes";
import ReactTableBody from "../components/Table/ReactTableBody";
import { COLUMNS } from "../helpers/table";

const List = () => {

  const [users, setUsers] = useState([])

  useEffect( () => {
    const callback = (respond) => {
      if ( Number(respond.status) === 200 ) {
        setUsers(respond.data)
      } else {
        alert(respond.message)
      }
    }
    requestGet( getAllUsersRoute, callback )
  }, []);

  return (
    <div className="list-user">
      <h1 className="title2 my-4">List of user in our newsLetter</h1>

      <ReactTableBody columns={COLUMNS} data={users} limit={3}/>
      {/* <Table data={users} limit={1} /> */}
    </div>
  )
}

export default List