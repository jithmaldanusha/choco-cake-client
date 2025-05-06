import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className="mx-auto mt-10">
      <ul className="pagination hidden sm:flex sm:flex-1 sm:items-center">
        <li className="page-item">
          <a
            className="page-link relative inline-flex items-center rounded-full px-2 py-2 ml-2 mr-2 text-white hover:bg-gray-200 focus:outline-none transition-transform transform hover:scale-110 focus:ring-2 focus:ring-indigo-600"
            onClick={goToPrevPage}
            style={{ background: "#FF7E00" }}
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${
              currentPage == pgNumber
                ? "relative ml-1 mr-1 z-10 inline-flex items-center rounded-full bg-red-400  py-1 text-sm font-semibold text-black focus:outline-none ring-2 ring-red-400"
                : "ml-1 mr-1 inline-flex items-center rounded-full py-1 text-sm font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none transition-transform transform hover:scale-110"
            } `}
            style={{ backgroundColor: '#F4DFC8' }}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link relative inline-flex items-center transition-colors duration-300 rounded-full px-4 py-2 text-sm font-semibold focus:outline-none"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link relative inline-flex items-center bg-gray-100 rounded-full px-2 py-2 ml-2 mr-2 text-white hover:bg-gray-200 focus:outline-none transition-transform transform hover:scale-110 focus:ring-2 focus:ring-indigo-600"
            onClick={goToNextPage}
            style={{ background: "#FF7E00" }}
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
