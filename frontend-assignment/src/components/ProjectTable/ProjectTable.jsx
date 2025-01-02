import React, { useState } from "react";
import "./ProjectTable.css";

export const ProjectTable = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div
      className="table-container"
      role="region"
      aria-label="Project funding status"
    >
      <h2 className="table-title">Project Funding Status</h2>

      <div className="table-wrapper">
        <table aria-label="Projects data">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Percentage Funded</th>
              <th scope="col">Amount Pledged</th>
              <th scope="col">Project Title</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((project) => (
              <tr key={project["s.no"]}>
                <td>{project["s.no"] + 1}</td>
                <td>
                  <div className="progress-wrapper" role="presentation">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min(
                          project["percentage.funded"],
                          100
                        )}%`,
                      }}
                      role="progressbar"
                      aria-valuenow={project["percentage.funded"]}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <span className="progress-text">
                      {project["percentage.funded"]}%
                    </span>
                  </div>
                </td>
                <td>${project["amt.pledged"]?.toLocaleString()}</td>
                <td>{project["title"]}</td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">
                  No projects available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="pagination" aria-label="Pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="pagination-button"
        >
          Previous
        </button>

        <div className="page-numbers" role="group" aria-label="Page numbers">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              aria-current={currentPage === pageNum ? "page" : undefined}
              aria-label={`Page ${pageNum}`}
              data-testid={`page-${pageNum}-button`}
              className={`page-number ${
                currentPage === pageNum ? "active" : ""
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="pagination-button"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default ProjectTable;
