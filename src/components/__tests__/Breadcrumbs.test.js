import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs";

describe("Breadcrumbs", () => {
  const steps = ["Start", "Your income", "Your expenses", "Your results"];
  const mockOnStepClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window width to desktop
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
  });

  test("does not render on step 0 (Start)", () => {
    const { container } = render(
      <Breadcrumbs
        currentStep={0}
        steps={steps}
        onStepClick={mockOnStepClick}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renders correct trail on step 1", () => {
    render(
      <Breadcrumbs
        currentStep={1}
        steps={steps}
        onStepClick={mockOnStepClick}
      />
    );

    expect(screen.getByText("Mortgage calculator")).toBeInTheDocument();
    expect(screen.getByText("Your income")).toHaveClass("breadcrumb-current");
  });

  test("renders correct trail on step 2", () => {
    render(
      <Breadcrumbs
        currentStep={2}
        steps={steps}
        onStepClick={mockOnStepClick}
      />
    );

    expect(screen.getByText("Mortgage calculator")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Your income" })
    ).toBeInTheDocument();
    expect(screen.getByText("Your expenses")).toHaveClass("breadcrumb-current");
  });

  test("calls onStepClick when clicking a previous step", () => {
    render(
      <Breadcrumbs
        currentStep={2}
        steps={steps}
        onStepClick={mockOnStepClick}
      />
    );

    fireEvent.click(screen.getByText("Your income"));
    expect(mockOnStepClick).toHaveBeenCalledWith(1);
  });

  test("renders mobile view correctly", () => {
    // Mock mobile width
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(
      <Breadcrumbs
        currentStep={2}
        steps={steps}
        onStepClick={mockOnStepClick}
      />
    );

    // Should see "..." menu button, previous step link, and current step text
    expect(screen.getByLabelText("Show previous steps")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Your income" })
    ).toBeInTheDocument();
    expect(screen.getByText("Your expenses")).toHaveClass("breadcrumb-current");
  });
});
