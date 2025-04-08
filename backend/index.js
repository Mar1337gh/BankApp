const PORT = 9001
const URLDB = 'mongodb://localhost:27017'
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const MortgageCalc = require('./models/MortgageCalc.js')
const CarLoan = require('./models/CarLoan.js')

const app = express () // создание приложения

app.use(cors()) //подкл корс для всего
app.use(express.json())//вызов экспресса и из него жисона (парсер жсона)

app.post('/MortgageCalc', async (req, res) => { // отлавливаем метод пост. req, res - колбеки запроса/ответа. async - выполнение фу-ции не последовательное
    console.log(req.body) // боди - то что приходит в data
    const {amount, downPayment, loanTerm, monthlyPayment, totalPayable, totalInterest} = req.body //monthlyPayment totalPayable, totalInterest}  // деструктуризация - создание переменных в 1 строку, получ объектов на сервер из файла
    const calculator1 = new MortgageCalc({amount, downPayment, loanTerm, monthlyPayment, totalPayable, totalInterest}) //monthlyPayment, totalPayable, totalInterest //созд записи с данными - если назв св-ва и перем совпадют
    await calculator1.save() //метод для записи в бд, await - асинх подождать сохранение
    res.json ({ // ответ от сервера
        message: 'Данные из калькулятора ипотеки сохранены'
    })
})

app.post('/CarLoan', async (req, res) => { // отлавливаем метод пост. req, res - колбеки запроса/ответа. async - выполнение фу-ции не последовательное
    console.log(req.body) // боди - то что приходит в data
    const {loanAmount, loanTerm, monthlyPayment} = req.body // деструктуризация - создание переменных в 1 строку, получ объектов на сервер из файла
    const сalculator2 = new CarLoan({loanAmount, loanTerm, monthlyPayment}) //созд записи с пользователем{login, password, email} - если назв св-ва и перем совпадют
    await сalculator2.save() //метод для записи в бд, await - асинх подождать сохранение
    res.json ({ // ответ от сервера
        message: 'Данные из калькулятора автокредита сохранены'
    })
})

const start = async () =>{ //созд переменной в виде функции для запуска сервера
    try { // try/catch - обработка исключений
        await mongoose.connect(URLDB, {authSource: "admin"}) // await - ключ слово до ожидания до подкл, листен - слушатель. authSource - имя базы данных, в которой есть коллекция с учетными данными пользователя.
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`)) // () => console.log - колбек ф-ия, выполнится при запуске сервера

    } catch (e) { //е - ошибка
        console.log(e) // вывод е
    }
}
start() //вызов ф-ии старт