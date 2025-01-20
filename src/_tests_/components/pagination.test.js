import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../components/pagination";

test("renders pagination with current page info", () => {
  const onPageChangeMock = jest.fn();
  render(
    <Pagination currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />
  );


  const pageInfo = screen.getByText(/Page 3 of 5/i);
  expect(pageInfo).toBeInTheDocument();

  const prevButton = screen.getByText("<");
  const nextButton = screen.getByText(">");
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  fireEvent.click(prevButton);
  expect(onPageChangeMock).toHaveBeenCalledWith(2);

  fireEvent.click(nextButton);
  expect(onPageChangeMock).toHaveBeenCalledWith(4);
});

test("disables previous button on first page", () => {
  render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
  const prevButton = screen.getByText("<");
  expect(prevButton).toBeDisabled();
});

test("disables next button on last page", () => {
  render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
  const nextButton = screen.getByText(">");
  expect(nextButton).toBeDisabled();
});
