const {Schema, model} = require('mongoose')
const MortgageCalc = new Schema(
    {
        amount: { type: Number, 
                //uniqued: true, // required - поле является обязательным для заполнения
                required: true
        },
        downPayment: {
            type: Number,
            required: true
        },
        loanTerm: {
            type: Number,
            required: true
        },
        monthlyPayment: {
            type: Number,
            required: true 
        },
        totalPayable: {
            type: Number,
            required: true 
        },
        totalInterest: {
            type: Number,
            required: true 
        }
    }
)

module.exports=model("MortgageCalc", MortgageCalc) // module.exports - создание модуля при подключении схемы 