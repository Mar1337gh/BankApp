import React, { useState } from 'react';
import './MortgageCalc.css';

const MortgageCalc = () => { // создание ф-ии калькулятор ипотеки 
  const interestRate = 9.6 // создание константы процентной ставки
  const [amount, setAmount] = useState(''); // создание состояния суммы кредита с пустым полем
  const [loanTerm, setLoanTerm] = useState(''); //создание состояния срока займа
  const [downPayment, setDownPayment] = useState(''); //создание состояния первоначального взноса
  const [monthlyPayment, setMonthlyPayment] = useState(null); //создание состояния ежемесячного платежа (данных еще нет)
  const [totalPayable, setTotalPayable] = useState(null); // создание состояния общей суммы к оплате
  const [totalInterest, setTotalInterest] = useState(null); // создание состояния общей суммы процентов
  const [error, setError] = useState(''); // создание состояния ошибки

  const calculateMonthlyPayment = () => { // созд ф-ии рассчета ежемесячного платежа
    if (!amount || !loanTerm) {
      setError('Пожалуйста, заполните все поля.'); //вывод ошибок, если переменные не верны
      alert('Пожалуйста, заполните все поля !!!');
      setMonthlyPayment(null); // устав состояние ежемесячного платежа пустым
      return;  
    }
    const loanAmount = parseFloat(amount) - (downPayment ? parseFloat(downPayment) : 0);// результат суммы кредита, терн оператор
    if (loanAmount <= 0) {
      setError('Ошибка: Сумма кредита должна быть положительной.');
      return;
    } 
    const r = parseFloat(interestRate) / 100 / 12; // месячная процентная ставка (годовая ставка делится на 12 и переводится в десятичную дробь)
    const n = parseFloat(loanTerm) * 12; // срок займа в месяцах

    if (r === 0) // проверка, для предотвращения деления на 0
    {
      setMonthlyPayment((loanAmount / n).toFixed(2));//устанав новое состояние ежемесячного платежа 
    } 
    else {
    const numerator = loanAmount * r * Math.pow(1 + r, n); // числитель в формуле расчета
    const denominator = Math.pow(1 + r, n) - 1; //знаменатель. pow - степень числа
    const monthlyPayment = (numerator / denominator).toFixed(2); //ежемесячный платеж. toFixed - преобразует число в строку, округляя его при необходимости

    setMonthlyPayment(monthlyPayment); //устанав новое состояние ежемесячного платежа 
    const totalPayable = (monthlyPayment * n).toFixed(2);
    setTotalPayable(totalPayable); //устанав новое состояние общей суммы к оплате
    const totalInterest = (totalPayable - loanAmount).toFixed(2);
    setTotalInterest(totalInterest); //устанав новое состояние общей суммы процентов
    setError('');

    const data = { // создание перем data
      amount: amount,
      downPayment: downPayment,
      loanTerm: loanTerm,
      monthlyPayment: monthlyPayment,
      totalPayable: totalPayable,
      totalInterest: totalInterest
    }
    
    const api = 'http://localhost:9001/MortgageCalc'
    
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
  }
  };

  return (
    <div className='container'>
      <h2>Калькулятор ипотеки</h2>
      <div className='main-cont'>
      <div className='interestRate'>
          <h3>Процентная ставка: 9.6 %</h3>
        </div>
        <div className='label'>
          <label>
          Сумма криедита (руб.):
            <input 
              type="number"
              value={amount} // внесение суммы
              onChange={(e) => setAmount(e.target.value)} // onChange - изменение состояния после внесения значения
              placeholder='Amount'
            />
          </label>
        </div>
        <div className='label'>
          <label>
          Первоначальный взнос (руб.):
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder='Down Payment'
            />
          </label>
        </div>
          <div className='label'>
          <label>
          Срок займа (лет):
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder='Loan Term'
            />
          </label>
        </div>
        <div className='label'>
          <button type="submit" onClick={calculateMonthlyPayment}>Рассчитать</button>
        </div> 
        {error && <h3 className='res'>{error}</h3> /* вывод ошибки */} 
        {monthlyPayment && (
          <div className='res'>
            <h3>Ежемесячный платеж: {monthlyPayment}</h3>
            <h3>Общая сумма: {totalPayable}</h3>
            <h3>Сумма процентов: {totalInterest}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
export default MortgageCalc;