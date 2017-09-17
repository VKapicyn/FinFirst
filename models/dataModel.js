let mongoose = require('./../app.js').mongoose,
    fs = require('fs'),
    request = require('request');

let dataSchema = new mongoose.Schema({
    currency: String,
    ticker: String,
    prices: Number,
    lastUpdate: Date,
});

let dataModel = mongoose.model('stocks', dataSchema);
module.exports.dataModel = dataModel;


exports.updateData = currency => {
    if (currency == 'usd')   
        dataModel.find({currency:'usd'}).then(stocks => {
            if (stocks.length != 0){
                downloadHistory('AAPL').then((data, err) => {
                    if (data != undefined){
                        stock.currency = 'usd',
                        stock.ticker = stock.ticker,
                        stock.prices = data,
                        stock.volatility = calcVolatility(data),
                        stock.lastUpdate = new Date()
                        stock.save();
                    }
                })
                stocks.map(stock => {
                    if (Date.parse(stock.lastUpdate).valueOf() - (new Date().valueOf() - 43200000) < 0)
                        /*downloadHistory(stock.ticker).then((data, err) => {
                            if (data != undefined){
                                stock.currency = 'usd',
                                stock.ticker = stock.ticker,
                                stock.prices = data,
                                stock.volatility = calcVolatility(data),
                                stock.lastUpdate = new Date()
                                stock.save();
                            }
                        });*/
                        ;
                });
            }
            else
                fs.readFile('./src/tickers.json', 'utf8', (err, data) => {
                    if (!err) {
                        data = JSON.parse(data);
                        data.tickers.map(ticker => {
                            stock = new dataModel();
                            stock.currency = 'usd';
                            stock.ticker = ticker;
                            stock.lastUpdate = 0;
                            stock.save();
                        });
                    }
                }); 
        });
}


let calcVolatility = prices => {
    return 0;
    //TODO
}


//TODO переделать request, сменилась форма запросов
let downloadHistory = (ticker) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ticker+'&outputsize=100&apikey=8495';
        request({
            url: url,
            json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    try {
                        let data = JSON.parse(JSON.stringify(body['Time Series (Daily)']));
                        
                        console.log(data);
                        resolve();
                    }
                    catch(e) {
                        resolve(undefined);
                    }
                }
            });     
        });
}