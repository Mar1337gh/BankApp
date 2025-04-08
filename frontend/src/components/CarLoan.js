import React, { useState } from 'react';
import './CarLoan.css';

const CarLoan = () => {

  const interestRate = 3.5; // процентная ставка
  const [loanAmount, setLoanAmount] = useState(10000); // сумма кредита по умолч 10000
  const [loanTerm, setLoanTerm] = useState(12); // срок кредита в месяцах по умолч 12
  const [monthlyPayment, setMonthlyPayment] = useState(0); // ежемесячный платеж
  

  const calculateMonthlyPayment = () => {   
    const loan = parseFloat(loanAmount) // добавление переменной, возвращ число вместо строки
    const term = parseFloat(loanTerm)
    // функция для расчета ежемесячного платежа
    const monthlyRate = interestRate / 100 / 12; // месячная процентная ставка
    const payment = (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term)); // ежемесячный платеж по аннуитетному кредиту 
    setMonthlyPayment(payment.toFixed(2)); // нов состояние ежемесячного платежа
  };

  const handleSubmit = (e) => {   // функция обработки отправки формы
    e.preventDefault();
    calculateMonthlyPayment();
    const data = {
        loanAmount: loanAmount,
        loanTerm: loanTerm,
        monthlyPayment: monthlyPayment
      }
      
      const api = 'http://localhost:9001/CarLoan'

    fetch (api, { // ввод данных, fetch - запрос на получ данных от пользователя
      method: 'POST', //метод
      headers: { // заголовки. тип контента - жсон
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // тело запроса. stringify - парсинг строки в текст формат жсон
    })
    .then (result => result.json())
    .then ((result) => {
      console.log(result) //получ результата
      //localStorage.setItem('token', result.token) // setItem - сохранение токена (ключ, result.token-значение)
    })
  };

  return (
    <div className='container'>
      <h2>Калькулятор автокредита</h2>
      <form className='form' onSubmit={handleSubmit}>

      <div className='interestRate'>
          <h3>Процентная ставка: 3.5%</h3>
        </div>
        <div className='label'>
          <label>Сумма кредита:</label>
          <input 
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>       
        <div className='label'>
          <label>Срок кредита (месяцев):</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <h3>Ежемесячный платеж: {monthlyPayment} руб.</h3>
        <div className='label'>
            <button type="submit" onClick={calculateMonthlyPayment}>Рассчитать платеж</button>
        </div>
        </form>
    </div>
  );

};

export default CarLoan;