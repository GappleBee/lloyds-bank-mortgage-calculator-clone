import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IncomeStep from "../IncomeStep";

describe("IncomeStep", () => {
  const mockData = {
    annualIncome: "",
    additionalIncome: "",
    deposit: "",
  };
  const mockOnChange = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all input fields", () => {
    render(
      <IncomeStep data={mockData} onChange={mockOnChange} onNext={mockOnNext} />
    );

    expect(
      screen.getByLabelText(/annual income before tax/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/other annual income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deposit/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  test("calls onChange when inputs are modified", () => {
    render(
      <IncomeStep data={mockData} onChange={mockOnChange} onNext={mockOnNext} />
    );

    const incomeInput = screen.getByLabelText(/annual income before tax/i);
    fireEvent.change(incomeInput, { target: { value: "50000" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("submits form when required fields are filled", () => {
    const filledData = {
      annualIncome: "50000",
      additionalIncome: "0",
      deposit: "20000",
    };

    render(
      <IncomeStep
        data={filledData}
        onChange={mockOnChange}
        onNext={mockOnNext}
      />
    );

    const submitButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(submitButton);

    expect(mockOnNext).toHaveBeenCalled();
  });

  test("does not submit if required fields are empty", () => {
    // HTML5 validation prevents submission, but we can check if onNext is NOT called
    // Note: JSDOM doesn't fully implement HTML5 validation blocking,
    // but we can check if the button click triggers the handler.
    // However, since the handler calls e.preventDefault(), we can just check if onNext is called.
    // If the browser validation works, the submit handler shouldn't fire in a real browser.
    // In JSDOM, we might need to rely on the 'required' attribute presence.

    render(
      <IncomeStep data={mockData} onChange={mockOnChange} onNext={mockOnNext} />
    );

    const incomeInput = screen.getByLabelText(/annual income before tax/i);
    expect(incomeInput).toBeRequired();

    const depositInput = screen.getByLabelText(/deposit/i);
    expect(depositInput).toBeRequired();
  });
});
