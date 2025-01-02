import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectTable from "../ProjectTable";

// Mock data for tests
const mockData = [
  {
    "s.no": 0,
    "amt.pledged": 15823,
    "percentage.funded": 186,
    title: "Project 1",
  },
  {
    "s.no": 1,
    "amt.pledged": 6859,
    "percentage.funded": 8,
    title: "Project 2",
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    "s.no": i + 2,
    "amt.pledged": 1000 * (i + 1),
    "percentage.funded": 10 * (i + 1),
    title: `Project ${i + 3}`,
  })),
];

describe("ProjectTable Component", () => {
  // Rendering Tests
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<ProjectTable data={mockData} />);
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("renders correct table headers", () => {
      render(<ProjectTable data={mockData} />);
      expect(screen.getByText("S.No")).toBeInTheDocument();
      expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
      expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
      expect(screen.getByText("Project Title")).toBeInTheDocument();
    });

    it("renders correct number of rows per page", () => {
      render(<ProjectTable data={mockData} />);
      const rows = screen.getAllByRole("row");
      // 5 data rows + 1 header row
      expect(rows).toHaveLength(6);
    });

    it("displays no data message when data is empty", () => {
      render(<ProjectTable data={[]} />);
      expect(screen.getByText("No projects available")).toBeInTheDocument();
    });
  });

  // Pagination Tests
  describe("Pagination", () => {
    it("handles next page navigation", async () => {
      render(<ProjectTable data={mockData} />);
      const user = userEvent.setup();

      expect(screen.getByText("Project 1")).toBeInTheDocument();
      await user.click(screen.getByText("Next"));
      expect(screen.getByText("Project 6")).toBeInTheDocument();
    });

    it("handles previous page navigation", async () => {
      render(<ProjectTable data={mockData} />);
      const user = userEvent.setup();

      await user.click(screen.getByText("Next"));
      expect(screen.getByText("Project 6")).toBeInTheDocument();
      await user.click(screen.getByText("Previous"));
      expect(screen.getByText("Project 1")).toBeInTheDocument();
    });

    it("disables previous button on first page", () => {
      render(<ProjectTable data={mockData} />);
      expect(screen.getByText("Previous")).toBeDisabled();
    });

    it("disables next button on last page", async () => {
      render(<ProjectTable data={mockData} />);
      const user = userEvent.setup();

      // Navigate to last page
      const lastPageButton = screen.getByTestId("page-2-button");
      await user.click(lastPageButton);
      expect(screen.getByText("Next")).toBeDisabled();
    });
  });

  // Formatting Tests
  describe("Data Formatting", () => {
    it("formats currency correctly", () => {
      render(<ProjectTable data={mockData} />);
      expect(screen.getByText("$15,823")).toBeInTheDocument();
    });

    it("displays percentage with correct format", () => {
      render(<ProjectTable data={mockData} />);
      const progressBar = screen.getAllByRole("progressbar")[0];
      expect(progressBar).toHaveAttribute("aria-valuenow", "186");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has correct ARIA labels", () => {
      render(<ProjectTable data={mockData} />);
      expect(screen.getByRole("region")).toHaveAttribute(
        "aria-label",
        "Project funding status"
      );
    });

    it("handles keyboard navigation", async () => {
      render(<ProjectTable data={mockData} />);
      const user = userEvent.setup();

      const nextButton = await screen.getByText("Next").click();
      await user.tab();
      expect(screen.getByText("Previous")).toHaveFocus();

      await user.keyboard("{Enter}");
      // Previous button should be disabled on first page
      expect(screen.getByText("Previous")).toBeDisabled();
    });
  });

  // Error Handling Tests
  describe("Error Handling", () => {
    it("handles undefined data prop", () => {
      render(<ProjectTable />);
      expect(screen.getByText("No projects available")).toBeInTheDocument();
    });

    it("handles malformed data gracefully", () => {
      const malformedData = [{ "s.no": 0 }]; // Missing required fields
      render(<ProjectTable data={malformedData} />);
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });
});
