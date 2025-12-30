import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const ResultsStep = ({ data }) => {
  const [showStampDutyPopup, setShowStampDutyPopup] = useState(false);
  const [showLegalFeesPopup, setShowLegalFeesPopup] = useState(false);

  const stampDutyRef = useRef(null);
  const legalFeesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showStampDutyPopup &&
        stampDutyRef.current &&
        !stampDutyRef.current.contains(event.target)
      ) {
        setShowStampDutyPopup(false);
      }
      if (
        showLegalFeesPopup &&
        legalFeesRef.current &&
        !legalFeesRef.current.contains(event.target)
      ) {
        setShowLegalFeesPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStampDutyPopup, showLegalFeesPopup]);

  const calculateBorrowingAmount = () => {
    const annualIncome = parseFloat(data.annualIncome || 0);
    const additionalIncome = parseFloat(data.additionalIncome || 0);
    const monthlyLoans = parseFloat(data.monthlyLoans || 0);
    const childcare = parseFloat(data.childcare || 0);
    const creditCard = parseFloat(data.creditCardPayments || 0);

    const totalAnnualIncome = annualIncome + additionalIncome;
    const annualExpenses =
      (monthlyLoans + childcare) * 12 + creditCard * 0.03 * 12; // Assuming 3% monthly repayment for CC

    // Simple multiplier
    let maxBorrowing = totalAnnualIncome * 4.5 - annualExpenses;
    if (maxBorrowing < 0) maxBorrowing = 0;

    // Round to nearest 100
    return Math.floor(maxBorrowing / 100) * 100;
  };

  const borrowingAmount = calculateBorrowingAmount();
  const term = 25; // Default
  const legalFees = 1430;
  const valuationFee = 100;

  // Stamp duty (Standard rates for single property)
  // 0% up to 125k
  // 2% 125k-250k
  // 5% 250k-925k
  // 10% 925k-1.5m
  // 12% above 1.5m
  const deposit = parseFloat(data.deposit || 0);
  const propertyValue = borrowingAmount + deposit;

  let stampDuty = 0;

  if (propertyValue > 1500000) {
    stampDuty += (propertyValue - 1500000) * 0.12;
    stampDuty += (1500000 - 925000) * 0.1;
    stampDuty += (925000 - 250000) * 0.05;
    stampDuty += (250000 - 125000) * 0.02;
  } else if (propertyValue > 925000) {
    stampDuty += (propertyValue - 925000) * 0.1;
    stampDuty += (925000 - 250000) * 0.05;
    stampDuty += (250000 - 125000) * 0.02;
  } else if (propertyValue > 250000) {
    stampDuty += (propertyValue - 250000) * 0.05;
    stampDuty += (250000 - 125000) * 0.02;
  } else if (propertyValue > 125000) {
    stampDuty += (propertyValue - 125000) * 0.02;
  }

  const totalOtherCosts = stampDuty + legalFees + valuationFee;

  return (
    <div className="step-container">
      <h2 className="step-title">Your results</h2>

      <div className="result-box">
        <p className="result-text">
          You could borrow up to{" "}
          <strong>£{borrowingAmount.toLocaleString()}</strong> over a term of{" "}
          <strong>{term} years</strong>.
        </p>
        <p className="result-subtext">
          Click on the links in the navigation trail near the top of the page to
          go back and edit details.
        </p>
      </div>

      <div className="other-costs">
        <h3>Other costs to think about</h3>
        <div className="costs-list">
          <div className="cost-item">
            <div className="cost-value">
              Stamp Duty: £{stampDuty.toLocaleString()}
            </div>
            <div className="cost-link-container">
              <span className="popup-container" ref={stampDutyRef}>
                <button
                  type="button"
                  className="text-link-button"
                  onClick={() => {
                    setShowStampDutyPopup(!showStampDutyPopup);
                  }}
                >
                  How we worked this out
                </button>
                {showStampDutyPopup && (
                  <div className="popup-box">
                    Stamp Duty figures quoted are for mortgages that complete
                    after 1st April 2025. For the latest information visit the{" "}
                    <a
                      href="https://www.gov.uk/stamp-duty-land-tax/residential-property-rates"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      gov.uk
                    </a>{" "}
                    page.
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="cost-item">
            <div className="cost-value">
              Legal fees: £{legalFees.toLocaleString()}
            </div>
            <div className="cost-link-container">
              <span className="popup-container" ref={legalFeesRef}>
                <button
                  type="button"
                  className="text-link-button"
                  onClick={() => {
                    setShowLegalFeesPopup(!showLegalFeesPopup);
                  }}
                >
                  How we worked this out
                </button>
                {showLegalFeesPopup && (
                  <div className="popup-box">
                    These are typical costs of a freehold home worth £225,000
                    (October 2017).
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="cost-item">
            Valuation fee: £{valuationFee.toLocaleString()}
          </div>
          <div className="total-cost">
            Total: £{totalOtherCosts.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="useful-info">
        <h3>Useful info</h3>
        <p>
          The amount we’ll lend can change based on a property’s Energy
          Performance Certificate (EPC). Due to differences in energy costs, you
          might receive a slightly higher amount if the EPC is A or B rated. You
          might receive a slightly lower loan amount if the rating is F or G.
        </p>
        <a
          href="https://www.lloydsbank.com/mortgages/help-and-guidance.html"
          target="_blank"
          rel="noopener noreferrer"
          className="info-link"
        >
          Mortgage support and guidance
        </a>
      </div>
    </div>
  );
};

export default ResultsStep;
