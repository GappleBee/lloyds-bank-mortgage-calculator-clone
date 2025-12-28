import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import IncomeStep from "./components/IncomeStep";
import ExpensesStep from "./components/ExpensesStep";
import ResultsStep from "./components/ResultsStep";
import StartStep from "./components/StartStep";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    annualIncome: "",
    additionalIncome: "",
    deposit: "",
    monthlyLoans: "",
    creditCardPayments: "",
    childcare: "",
  });

  const steps = ["Start", "Your income", "Your expenses", "Your results"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StartStep onStart={handleNext} />;
      case 1:
        return (
          <IncomeStep
            data={formData}
            onChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ExpensesStep
            data={formData}
            onChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 3:
        return <ResultsStep data={formData} />;
      default:
        return <StartStep onStart={handleNext} />;
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Breadcrumbs
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />
        {renderStep()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
