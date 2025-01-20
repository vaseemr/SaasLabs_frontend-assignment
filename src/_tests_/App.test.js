import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

// Mock the fetch API
global.fetch = jest.fn();

const mockProjects = [
  { "s.no": 1, "percentage.funded": 120, "amt.pledged": 1000 },
  { "s.no": 2, "percentage.funded": 150, "amt.pledged": 2000 },
  { "s.no": 3, "percentage.funded": 170, "amt.pledged": 3000 },
  { "s.no": 4, "percentage.funded": 200, "amt.pledged": 4000 },
  { "s.no": 5, "percentage.funded": 250, "amt.pledged": 5000 },
  { "s.no": 6, "percentage.funded": 300, "amt.pledged": 6000 },
];

describe("App Component", () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProjects),
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  test("renders header, table, pagination, and footer", async () => {

    render(<App />);

    expect(screen.getByText(/SaasLabs/i)).toBeInTheDocument();


    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // remove the timeout in App.test.js to pass the test cases
    await waitFor(() => {
      expect(screen.getByText("120")).toBeInTheDocument();
    });

 
    expect(screen.getByText(/Page 1 of 2/i)).toBeInTheDocument();


    expect(screen.getByText(/© 2025 Projects. All rights reserved./i)).toBeInTheDocument();
  });

  test("displays error message if fetch fails", async () => {
    fetch.mockRejectedValue(new Error("Failed to fetch"));

    render(<App />);

 
    await waitFor(() => {
      expect(screen.getByText(/Data fetch failed./i)).toBeInTheDocument();
    });
  });

  test("renders the correct number of rows per page", async () => {
    render(<App />);

    //  remove the timeout in App.test.js to pass the test cases
    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(6);
    });
  });

  test("navigates to the next page in pagination", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("120")).toBeInTheDocument();
    });

    const nextButton = screen.getByText(">");
    nextButton.click();

    await waitFor(() => {
      expect(screen.getByText("300")).toBeInTheDocument();
    });
  });
});
