import React from "react";
import { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true)

  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  const handlePreviousClick = () => {
    if (step !== 1) {
      setStep(step - 1);
    } else {
      // toast.error("No backword page")
    }
  };

  const handleNextClick = () => {
    if (step !== 3) {
      setStep(step + 1);
    } else {
      // toast.error("No other page")
    }
  };

console.log(isOpen)
  return (
    <>
    <button className="close" onClick={()=> setIsOpen(!isOpen)}>
    {isOpen ? '×' : '≡'}
    </button>
   
    {/* open dialod */}
    {isOpen && <>
      <div className="steps">
      <div className="numbers">
        <div className={step === 1 ? "active" : ""}>1</div>
        <div className={step === 2 ? "active" : ""}>2</div>
        <div className={step === 3 ? "active" : ""}>3</div>
      </div>
      <p className="message">Steps: {messages[step - 1]}</p>

      <div className="buttons">
        <button
          style={{ background: step === 1 ? "" : "#7950f2", color: "#fff" }}
          onClick={handlePreviousClick}
        >
          Previous
        </button>
        <button
          style={{ background: step === 3 ? "" : "#7950f2", color: "#fff" }}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
      {/* <ToastContainer position="top-center" autoClose={5000}/> */}
    </div>
    </>}
    </>
  );
};

export default Main;
