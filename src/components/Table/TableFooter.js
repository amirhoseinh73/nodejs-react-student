import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  const prevPage = () => {
    if ( page === 1 ) return
    setPage(page - 1)
  }

  const nextPage = () => {
    if ( page === range.slice(-1).pop() ) return
    setPage(page + 1)
  }

  return (
    <div className="table-footer">
      <button type="button" className="table-paginate-btn prev" onClick={prevPage}>
        &laquo;
      </button>
      {range.map((pg, index) => (
        <button
          type="button"
          key={index}
          className={`table-paginate-btn ${ page === pg ? "active" : "" }`}
          onClick={() => setPage(pg)}
        >
          {pg}
        </button>
      ))}
      <button type="button" className="table-paginate-btn prev" onClick={nextPage}>
        &raquo;
      </button>
    </div>
  );
};

export default TableFooter;