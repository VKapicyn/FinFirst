let userModel = require('./userModel').userModel;

exports.getPortfel = (req, res) => {
    userModel.findOne({_id: req.params.userId}).then((user) => {
        user.portfels.map(portfel => {
            if (portfel.name == req.params.portfelName)
                res.json(portfel);
        })
    });
}

exports.getAllPortfels = (req, res) => {
    userModel.findOne({_id:req.params.userId}).then((user) => {
        res.json(user.portfels);
    });
}

exports.setPortfel = (req, res) => {
    userModel.findOne({_id:userId}).then((user) => {
        let balance = 0,
            stocksCall = 3 + Math.ceil(req.body.period / 3),
            bondsProcent = (user.age + 30) * req.body.risk; 
            stocksProcent = 100 - bondsProcent;


        if (!req.body.type)
            balance = (curency.toLowCase() == 'usd') ? 10000 : 1000000;
        else
            balance = user.balance;
        
        let portfel = {
            portfelName: req.body.portfelName,
            risk: req.body.risk,
            startBalance: balance,
            income: 0,
            currency: currency,
            startDate: new Date()
        } 


        if (stocksProcent > 0)
            getAllTickers()
                .then((allTickers) =>{
                    allTickers.sort({

                    });
                })
                .then((tickers) => {
                    saveAndResponse(portfel, tickers, user, bondsProcent);
                });
        else {
            portfel.tickers = {
                type: 'bond',
                ticker: 'ВЭБ ПБО1РЗ',
                lots: bondsProcent
            };
            user.portfels.push(portfel);
        }   
    });
}


exports.getOperations = (req, res) => {
    //TODO
    res.json(null);
}

exports.sellPortfel = (req, res) => {
    //TODO
}

/* Работа с OpenApi будет тут */
let getAllTickers = (stocks, period) => {

}

let getDate = period => {
    return ;
}

let saveAndResponse = (tickers, user) => {
    user.portfel = {
        portfelName: req.body.portfelName,
        info: {
            risk: req.body.risk,
            summ: 0, //TODO
            balance: balance,
            income: 0,
            currency: currency
        },
        tickers: tickers
    }
}


