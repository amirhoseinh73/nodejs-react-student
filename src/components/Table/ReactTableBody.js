import { useTable } from "react-table";
import useTableData from "../../hooks/useTable";
import { useState } from "react";
import TableFooter from "./TableFooter";

const ReactTableBody = ({columns, data, limit}) => {
  const [page, setPage] = useState(1);
  const {slice, range} = useTableData(data, page, limit);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({ columns, data:slice });

  return (
    <>
      <div className="table-container">
        <table {...getTableProps()} className="react-table-users">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
            })}
          </tbody>
        </table>

      </div>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  )
}

export default ReactTableBody