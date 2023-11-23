import ReactPaginate from 'react-paginate';

const Pagination = ({
  setPageIndex,
  pageSize,
  totalPage,
}: {
  setPageIndex: any;
  pageSize: number;
  totalPage: number;
}) => {
  const handlePageClick = (event: any) => {
    setPageIndex(event.selected + 1);
  };
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default Pagination;
