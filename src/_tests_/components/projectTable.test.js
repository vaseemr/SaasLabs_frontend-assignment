import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectTable from "../../components/projectTable";
import Spinner from "../../components/spinner";

const mockProjects = [
  { "s.no": 1, "percentage.funded": 120, "amt.pledged": 1000 },
  { "s.no": 2, "percentage.funded": 200, "amt.pledged": 2000 },
];

test("renders project table headers", () => {
  render(<ProjectTable projects={[]} status="success" recordsPerPage={5} />);
  expect(screen.getByText(/S.No./i)).toBeInTheDocument();
  expect(screen.getByText(/Percentage Funded/i)).toBeInTheDocument();
  expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();
});

test("renders loading spinner when status is loading", () => {
  render(<ProjectTable projects={[]} status="loading" recordsPerPage={5} />);
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("renders failure message when status is failed", () => {
  render(<ProjectTable projects={[]} status="failed" recordsPerPage={5} />);
  expect(screen.getByText(/Data fetch failed./i)).toBeInTheDocument();
});

test("renders projects when status is success", () => {
  render(
    <ProjectTable projects={mockProjects} status="success" recordsPerPage={5} />
  );

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("120")).toBeInTheDocument();
  expect(screen.getByText("1000")).toBeInTheDocument();

  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("200")).toBeInTheDocument();
  expect(screen.getByText("2000")).toBeInTheDocument();
});
