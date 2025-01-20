import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/header";

test("renders header with title and cart icon", () => {
  render(<Header />);
  const headerTitle = screen.getByText(/SaasLabs/i);
  expect(headerTitle).toBeInTheDocument();
});
