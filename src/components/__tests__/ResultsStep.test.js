import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResultsStep from "../ResultsStep";

describe("ResultsStep", () => {
  test("calculates borrowing amount correctly for simple case", () => {
    const data = {
      annualIncome: "30000",
      additionalIncome: "0",
      deposit: "20000",
      monthlyLoans: "0",
      creditCardPayments: "0",
      childcare: "0",
    };

    render(<ResultsStep data={data} />);

    // Borrowing: 30000 * 4.5 = 135,000
    expect(screen.getByText(/£135,000/)).toBeInTheDocument();

    // Stamp Duty: (135000 + 20000) < 250000 => 0
    expect(screen.getByText(/Stamp Duty: £0/)).toBeInTheDocument();
  });

  test("calculates borrowing amount and stamp duty correctly for complex case", () => {
    const data = {
      annualIncome: "60000",
      additionalIncome: "5000",
      deposit: "50000",
      monthlyLoans: "500",
      creditCardPayments: "1000",
      childcare: "200",
    };

    render(<ResultsStep data={data} />);

    // Borrowing calculation:
    // Income: 65000
    // Expenses: (700 * 12) + (1000 * 0.03 * 12) = 8400 + 360 = 8760
    // Max: 65000 * 4.5 - 8760 = 292500 - 8760 = 283740
    // Rounded: 283700
    expect(screen.getByText(/£283,700/)).toBeInTheDocument();

    // Stamp Duty calculation:
    // Property Value: 283700 + 50000 = 333700
    // Duty: (333700 - 250000) * 0.05 = 4185
    expect(screen.getByText(/Stamp Duty: £4,185/)).toBeInTheDocument();
  });

  test("toggles stamp duty popup", () => {
    const data = {
      annualIncome: "30000",
      additionalIncome: "0",
      deposit: "20000",
      monthlyLoans: "0",
      creditCardPayments: "0",
      childcare: "0",
    };
    render(<ResultsStep data={data} />);

    const buttons = screen.getAllByRole("button", {
      name: /how we worked this out/i,
    });
    const stampDutyButton = buttons[0]; // First one is stamp duty

    fireEvent.click(stampDutyButton);
    expect(
      screen.getByText(/Stamp Duty figures quoted are for mortgages/)
    ).toBeInTheDocument();

    fireEvent.click(stampDutyButton);
    expect(
      screen.queryByText(/Stamp Duty figures quoted are for mortgages/)
    ).not.toBeInTheDocument();
  });
});
