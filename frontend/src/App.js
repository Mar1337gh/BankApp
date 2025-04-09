import React, {useState, useEffect} from 'react';// Достаем хук состояния
import './App.css';
import Header from './components/Header'; // Подкл файла хедер
import Main from './views/Main';
import Footer from './components/Footer';
import Calculators from './views/Calculators';

import ReactGA from "react-ga4"; // инициализация GA4
ReactGA.initialize("G-Z89VKNCHN4");

function App() {

const[page, setPage] = useState('Main')//пейдж - перем, сетпейдж - ф-ия, мейн - назв страницы (знач по умол)
//хук изменяет компонент 
const pages = {     // созд объект pages
  Main: <Main setPage = {setPage} />, //setPage={setPage} - ф-ия передается в мейн 
  Calculators: <Calculators />
};

useEffect(() => { // отправка события pageview при переходе
  ReactGA.send({ hitType: "pageview", page: `/${page}` });
}, [page]);

  return (
    <div className="App"> 
      <Header setPage = {setPage}/> 
      {pages[page]} 
     <Footer />  
    </div>
  );    // фиг скобки для объектов, в квад скоб массив [page], setpage - пропс, свойство для разм функции
}

export default App;
