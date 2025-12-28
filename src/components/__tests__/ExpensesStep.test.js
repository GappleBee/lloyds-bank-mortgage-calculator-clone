import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpensesStep from "../ExpensesStep";

describe("ExpensesStep", () => {
  const mockData = {
    monthlyLoans: "",
    creditCardPayments: "",
    childcare: "",
  };
  const mockOnChange = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all input fields", () => {
    render(
      <ExpensesStep
        data={mockData}
        onChange={mockOnChange}
        onNext={mockOnNext}
      />
    );

    expect(
      screen.getByLabelText(/loans you pay back monthly/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/credit card balances/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/childcare costs/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  test("calls onChange when inputs are modified", () => {
    render(
      <ExpensesStep
        data={mockData}
        onChange={mockOnChange}
        onNext={mockOnNext}
      />
    );

    const loansInput = screen.getByLabelText(/loans you pay back monthly/i);
    fireEvent.change(loansInput, { target: { value: "500" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("submits form", () => {
    render(
      <ExpensesStep
        data={mockData}
        onChange={mockOnChange}
        onNext={mockOnNext}
      />
    );

    const submitButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(submitButton);

    expect(mockOnNext).toHaveBeenCalled();
  });
});
