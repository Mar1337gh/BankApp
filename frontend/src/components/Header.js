import React from 'react';
import './Header.css';

function Header({setPage}) {

  return (
    <div className="header"> 
      <h1>Сервис онлайн-калькуляторов</h1>
      <ul> 
        <li onClick= { () => setPage ('Main') }>Главная</li> 
        <li onClick= { () => setPage ('Calculators') }>Выбор калькулятора</li>
      </ul>
    </div> // онклик - событие наж на кнопку вызов функции сетпейдж (стрел функции)
  );

}

export default Header;
