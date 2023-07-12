import './index.css';

const Pagination = (props) => {
    const { page, onHandleChangePagination } = props;
  
    return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        disabled={page === 1}
        onClick={() => {
          onHandleChangePagination('prev');
        }}
      >
        &larr;
      </button>

      <span className="Pagination-info">
          Page {page} of 10
      </span>

      <button
        className="Pagination-button"
        disabled={page === 10}
        onClick={() => {
          onHandleChangePagination('next');
        }}
      >
        &rarr;
      </button>
    </div>
    )
}

export default Pagination;