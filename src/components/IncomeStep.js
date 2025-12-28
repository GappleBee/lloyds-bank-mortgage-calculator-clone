import React from "react";
import "../App.css";

const IncomeStep = ({ data, onChange, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Your income</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="annualIncome" className="form-label">
            What is your annual income before tax?
          </label>
          <p className="form-hint">
            Include your basic salary plus any guaranteed allowances.
          </p>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            className="form-input"
            placeholder="For example, 30000"
            value={data.annualIncome || ""}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="additionalIncome" className="form-label">
            Do you have any other annual income?
          </label>
          <p className="form-hint">
            This could be overtime, bonuses or commission.
          </p>
          <input
            type="number"
            id="additionalIncome"
            name="additionalIncome"
            className="form-input"
            placeholder="For example, 2000"
            value={data.additionalIncome || ""}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deposit" className="form-label">
            How much deposit do you have?
          </label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            className="form-input"
            placeholder="For example, 20000"
            value={data.deposit || ""}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn-continue">
          Continue
        </button>
      </form>
    </div>
  );
};

export default IncomeStep;
