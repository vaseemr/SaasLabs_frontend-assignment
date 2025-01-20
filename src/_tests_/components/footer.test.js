import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/footer";

test("renders footer with copyright text", () => {
  render(<Footer />);
  const footerText = screen.getByText(/© 2025 Projects. All rights reserved./i);
  expect(footerText).toBeInTheDocument();
});