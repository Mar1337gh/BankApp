import React from 'react';
import './Main.css';

function Main({setPage}) {
 
    return (
      <div className="main">
      <div className='calculators'>
            <h3>Стоимость ипотеки под 9.6%</h3>
            <p>
              Калькулятор поможет Вам рассчитать ипотеку под 9.6%
            </p>
            <button onClick={() => setPage ('Calculators')}>Рассчитать</button>
      </div>
      <div className='calculators'>
            <h3>Стоимость автокредита под 3.5%</h3>
            <p>
              Калькулятор поможет Вам рассчитать автокредит под 3.5%
            </p>
            <button onClick={() => setPage ('Calculators')}>Рассчитать</button>
      </div>
      </div>
      
  );
  }

export default Main;