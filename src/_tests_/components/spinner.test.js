import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "../../components/spinner";

test("renders spinner", () => {
  render(<Spinner />);
  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});
