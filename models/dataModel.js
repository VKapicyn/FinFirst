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
            if (stocks.length != 0)
                stocks.map(stock => {
                    if (Date.parse(stock.lastUpdate).valueOf() - (new Date().valueOf() - 43200000) < 0)
                        downloadHistory(stock.ticker).then((data, err) => {
                            if (data != undefined){
                                stock.currency = 'usd',
                                stock.ticker = stock.ticker,
                                stock.prices = data,
                                stock.volatility = calcVolatility(data),
                                stock.lastUpdate = new Date()
                                stock.save();
                            }
                        });
                });
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
        let url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fchart.finance.yahoo.com%2Ftable.csv%3Fs%3D'+ticker+'%26a%3D'+0+'%26b%3D'+01+'%26c%3D'+2010+'%26d%3D'+2+'%26e%3D'+22+'%26f%3D'+2020+'%26g%3Dm%26ignore%3D.csv%27%20and%20columns%3D%27Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdj%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        request({
            url: url,
            json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    try {
                        resolve(JSON.parse(JSON.stringify(body['query']['results']['row'])));
                    }
                    catch(e) {
                        resolve(undefined);
                    }
                }
            });     
        });
}