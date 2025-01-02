// ProjectTable.jsx
import React, { useState } from "react";
import "./ProjectTable.css";
import "./PercentageStyles.css"; // Add this new import

const ProjectTable = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Helper functions for percentage visualization
  const calculateProgressWidth = (percentage) => {
    if (percentage <= 0) return 0;
    const logValue = Math.log10(percentage);
    const logMax = Math.log10(28000); // Slightly above max
    return Math.min((logValue / logMax) * 100, 100);
  };

  const getPercentageCategory = (percentage) => {
    if (percentage >= 1000) return "super";
    if (percentage >= 100) return "high";
    if (percentage >= 50) return "medium";
    return "low";
  };

  const formatPercentage = (percentage) => {
    if (percentage >= 1000) {
      return `${(percentage / 1000).toFixed(1)}k%`;
    }
    return `${percentage}%`;
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
                  <div
                    className="percentage-cell"
                    data-tooltip={`Exact: ${project["percentage.funded"]}%`}
                  >
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        data-percentage={getPercentageCategory(
                          project["percentage.funded"]
                        )}
                        style={{
                          "--progress-width": `${calculateProgressWidth(
                            project["percentage.funded"]
                          )}%`,
                        }}
                      />
                      <span className="percentage-text">
                        {formatPercentage(project["percentage.funded"])}
                      </span>
                    </div>
                    {project["percentage.funded"] >= 1000 && (
                      <div className="success-indicator" />
                    )}
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

      {/* Pagination remains the same */}
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
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
            )
          )}
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
