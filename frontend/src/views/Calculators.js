import React from 'react';
import './Calculators.css';
import MortgageCalc from '../components/MortgageCalc';
import CarLoan from '../components/CarLoan';

function Calculators() {

  return (
  <div className="main">
    <h1>Калькуляторы</h1>
    <div className="calculators">
      <MortgageCalc></MortgageCalc>
      <CarLoan></CarLoan>
    </div>
  </div>
  );
}

export default Calculators;