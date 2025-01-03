# Frontend Assignment

## Overview

This project is a React-based application that displays a table of Kickstarter projects, showcasing their funding status, amount pledged, and other relevant details. The application fetches data from a public API and implements pagination for better user experience.

## Features

- **Dynamic Data Fetching**: Utilizes AJAX calls to fetch project data from a remote API.
- **Responsive Design**: The UI is designed to be aesthetically pleasing and responsive across various devices.
- **Pagination**: Implements pagination to display a maximum of 5 records per page.
- **Accessibility**: Ensures that the application is accessible, with appropriate ARIA labels and keyboard navigation support.
- **Unit Testing**: Includes unit tests to verify the functionality of components and features.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahuljassal/frontend-assignment.git
   cd frontend-assignment
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

3. To start the development server, run:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the application.

### Running Tests

4. To run the unit tests, use:
   ```bash
   npm run test
   ```

## API

The application fetches project data from the following API:

- **URL**: [Kickstarter Projects API](https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json)

## Project Structure

frontend-assignment/
1.  src/
   a. App.jsx # Main application component
   b. components/ # Contains all React components
       1. ProjectTable/ # ProjectTable component and its styles
       2. ProjectTable.css # Styles for ProjectTable
       3. PercentageStyles.css # Styles for percentage visualization
       4. tests/ # Unit tests for components
   c. test/ # Test setup and configurations
   d. App.css # Global styles
   e. index.js # Entry point of the application
   f. package.json # Project metadata and dependencies
   g. README.md # Project documentation
