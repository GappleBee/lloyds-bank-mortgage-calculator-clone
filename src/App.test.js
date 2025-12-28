import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Mortgage Calculator App Integration", () => {
  test("full user flow", () => {
    render(<App />);

    // 1. Start Step
    expect(
      screen.getByRole("heading", { name: /mortgage calculator/i })
    ).toBeInTheDocument();
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);

    // 2. Income Step
    expect(
      screen.getByRole("heading", { name: /your income/i })
    ).toBeInTheDocument();

    const annualIncomeInput = screen.getByLabelText(
      /annual income before tax/i
    );
    const depositInput = screen.getByLabelText(/deposit/i);

    fireEvent.change(annualIncomeInput, { target: { value: "40000" } });
    fireEvent.change(depositInput, { target: { value: "30000" } });

    const incomeContinueButton = screen.getByRole("button", {
      name: /continue/i,
    });
    fireEvent.click(incomeContinueButton);

    // 3. Expenses Step
    expect(
      screen.getByRole("heading", { name: /your expenses/i })
    ).toBeInTheDocument();

    const loansInput = screen.getByLabelText(/loans you pay back monthly/i);
    fireEvent.change(loansInput, { target: { value: "200" } });

    const expensesContinueButton = screen.getByRole("button", {
      name: /continue/i,
    });
    fireEvent.click(expensesContinueButton);

    // 4. Results Step
    expect(
      screen.getByRole("heading", { name: /your results/i })
    ).toBeInTheDocument();

    // Verify calculation
    // Income: 40000
    // Expenses: 200 * 12 = 2400
    // Max: 40000 * 4.5 - 2400 = 180000 - 2400 = 177600
    expect(screen.getByText(/£177,600/)).toBeInTheDocument();
  });

  test("navigation via breadcrumbs", () => {
    render(<App />);

    // Navigate to Step 2 (Expenses)
    fireEvent.click(screen.getByRole("button", { name: /start/i }));

    const annualIncomeInput = screen.getByLabelText(
      /annual income before tax/i
    );
    const depositInput = screen.getByLabelText(/deposit/i);
    fireEvent.change(annualIncomeInput, { target: { value: "40000" } });
    fireEvent.change(depositInput, { target: { value: "30000" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      screen.getByRole("heading", { name: /your expenses/i })
    ).toBeInTheDocument();

    // Click Breadcrumb to go back to Income
    // Note: Breadcrumbs render buttons for previous steps
    const incomeBreadcrumb = screen.getByRole("button", {
      name: "Your income",
    });
    fireEvent.click(incomeBreadcrumb);

    expect(
      screen.getByRole("heading", { name: /your income/i })
    ).toBeInTheDocument();

    // Verify data persists
    expect(screen.getByLabelText(/annual income before tax/i)).toHaveValue(
      40000
    );
  });
});
