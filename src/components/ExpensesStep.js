import React from "react";
import "../App.css";

const ExpensesStep = ({ data, onChange, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Your expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="monthlyLoans" className="form-label">
            Do you have any loans you pay back monthly?
          </label>
          <p className="form-hint">
            If so, please tell us the total amount you pay each month.
          </p>
          <input
            type="number"
            id="monthlyLoans"
            name="monthlyLoans"
            className="form-input"
            placeholder="For example, £800"
            value={data.monthlyLoans || ""}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="creditCardPayments" className="form-label">
            Do you have any credit card balances?
          </label>
          <p className="form-hint">
            If so, please tell us the total balance outstanding.
          </p>
          <input
            type="number"
            id="creditCardPayments"
            name="creditCardPayments"
            className="form-input"
            placeholder="For example, £500"
            value={data.creditCardPayments || ""}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="childcare" className="form-label">
            Do you have any childcare costs?
          </label>
          <p className="form-hint">
            If so, please tell us the total amount you pay each month.
          </p>
          <input
            type="number"
            id="childcare"
            name="childcare"
            className="form-input"
            placeholder="For example, £200"
            value={data.childcare || ""}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn-continue">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ExpensesStep;
