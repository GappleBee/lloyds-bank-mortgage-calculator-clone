import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Breadcrumbs = ({ currentStep, steps, onStepClick }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (currentStep === 0) {
    return null;
  }

  const separator = (key) => (
    <span key={`sep-${key}`} className="breadcrumb-separator">
      {" > "}
    </span>
  );

  // Mobile View Logic
  if (isMobile && currentStep > 1) {
    const hiddenSteps = [];
    // Add Root (Mortgage calculator)
    hiddenSteps.push({ index: 0, label: "Mortgage calculator" });
    // Add intermediate steps
    for (let i = 1; i < currentStep - 1; i++) {
      hiddenSteps.push({ index: i, label: steps[i] });
    }

    return (
      <nav aria-label="Breadcrumb">
        <div className="breadcrumbs">
          <span className="breadcrumb-menu-container" ref={menuRef}>
            <button
              className="breadcrumb-menu-btn"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Show previous steps"
            >
              ...
            </button>
            {showMenu && (
              <div className="breadcrumb-menu">
                {hiddenSteps.map((step) => (
                  <button
                    key={step.index}
                    className="breadcrumb-menu-item"
                    onClick={() => {
                      onStepClick(step.index);
                      setShowMenu(false);
                    }}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            )}
          </span>
          {separator("mobile-sep-1")}
          <button
            className="breadcrumb-link"
            onClick={() => onStepClick(currentStep - 1)}
          >
            {steps[currentStep - 1]}
          </button>
          {separator("mobile-sep-2")}
          <span className="breadcrumb-current">{steps[currentStep]}</span>
        </div>
      </nav>
    );
  }

  const root = (
    <button
      key="root"
      className="breadcrumb-link"
      onClick={() => onStepClick(0)}
    >
      Mortgage calculator
    </button>
  );

  const trail = [root];

  for (let i = 1; i <= currentStep; i++) {
    trail.push(separator(i));
    if (i === currentStep) {
      trail.push(
        <span key={i} className="breadcrumb-current">
          {steps[i]}
        </span>
      );
    } else {
      trail.push(
        <button
          key={i}
          className="breadcrumb-link"
          onClick={() => onStepClick(i)}
        >
          {steps[i]}
        </button>
      );
    }
  }

  return (
    <nav aria-label="Breadcrumb">
      <div className="breadcrumbs">{trail}</div>
    </nav>
  );
};

export default Breadcrumbs;
