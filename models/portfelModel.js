let userModel = require('./userModel').userModel,
    dataModel = require('./dataModel').dataModel;

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
    userModel.findOne({_id:req.body.id}).then((user) => {
        let balance = 0,
            stocksCall = 3 + Math.ceil(req.body.period / 3),
            bondsProcent = (user.age + 30) * req.body.risk; 
            stocksProcent = 100 - bondsProcent;

        if (!req.body.accountType)
            balance = (req.body.currency == 'usd') ? 10000 : 1000000;
        else
            balance = user.balance;
        
        let portfel = {
            accountType: req.body.accountType,
            portfelName: req.body.portfelName,
            risk: req.body.risk,
            startBalance: Number(balance),
            realBalance: Number(balance),
            currency: req.body.currency,
            startDate: new Date()
        } 

        if (stocksProcent > 0)
            getAllTickers(stocksCall, stocksProcent, portfel, user);
        else {
            portfel.tickers = [{
                tickerType: 'bond',
                ticker: 'ВЭБ ПБО1РЗ',
                procent: bondsProcent
            }];
            user.portfels.push(portfel);
            user.save();
        }   
    });
}


exports.getOperations = (req, res) => {
    userModel.findOne({_id: req.params.userId}).then(user => {
        user.portfels.map( portfel => {
            if (portfel.portfelName == req.params.portfelName) {
                res.json(portfel.operations);
            }
        });
    });
}

exports.sellPortfel = (req, res) => {
    userModel.findOne({_id: req.body.id}).then(user => {
        for (let i=0; i<user.portfels.length; i++){
            if (user.portfels[i].portfelName == req.body.portfelName) {
                user.operation.push(user.portfels[i].portfelName + ' продан, ' + new Date()+' по цене ' + user.portfels[i].realBalance);
                user.portfels.splice(i, 1);
                user.save();
                break;
            }
        }
    });
}


let getAllTickers = (stocksCall, stocksProcent, portfel, user) => {
    dataModel.find().sort({volatility: -1}).limit(stocksCall).then(stocks => {
        console.log(stocksCall, stocksProcent)
        let array = [];
        stocks.map( stock => {
            array.push({
                tickerType: 'stock',
                ticker: stock.ticker,
                procent: Math.ceil(stocksProcent * 100 / stocksCall)
            });
        })
        
        portfel.tickers = array;
        user.portfels.push(portfel);
        user.save();
    })
}
