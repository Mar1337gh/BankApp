const {Schema, model} = require('mongoose')
const CarLoan = new Schema(
    {
        loanAmount:  { type: Number, 
                //uniqued: true, 
                required: true
        },
        loanTerm: {
            type: Number,
            required: true
        },
        monthlyPayment: {
            type: Number,
            required: true
        }
    }
)

module.exports=model("CarLoan", CarLoan) // module.exports - создание модуля при подключении схемы 