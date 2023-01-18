import React, { useState } from "react";
import TableFooter from "./TableFooter";
import useTableData from "../../hooks/useTable";

const Table = ({ data, limit }) => {
  const [page, setPage] = useState(1);
  const {slice, range} = useTableData(data, page, limit);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr key={el._id}>
              <td>{el.firstname}</td>
              <td>{el.lastname}</td>
              <td>{el.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;