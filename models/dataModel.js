let mongoose = require('./../app.js').mongoose,
    fs = require('fs'),
    request = require('request');


let dataSchema = new mongoose.Schema({
    currency: String,
    ticker: String,
    prices: [Number],
    lastUpdate: Date,
    volatility: Number
});


let dataModel = mongoose.model('stocks', dataSchema);
module.exports.dataModel = dataModel;


exports.updateData = currency => {
    if (currency == 'usd')   
        dataModel.find({currency:'usd'}).then(stocks => {
            if (stocks.length != 0){
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
                            stock.volatility = 0;
                            stock.save();
                        });
                    }
                }); 
        });
}


//Здесь Open API
exports.getCurrency = (req, res) => {
    let url = 'https://api.open.ru/getrates/1.0.0/rates/cash';
    request({
        url: url,
        json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let response = {}
                try {
                    let data = JSON.parse(JSON.stringify(body['rates']));
                    data.map(currency => {
                        if (currency.curCharCode == 'USD' && currency.operationType == 'S')
                        response.currency = Number(currency.rateValue);
                    });
                    res.json(response);
                }
                catch(e) {
                    response.currency = 1;
                    res.json(response);
                }
            }
        });     
}


let calcVolatility = prices => {
    let kf = 1/(prices.length-1),
        srArifm = 0,
        volatility = 0;

    prices.map( price => {
        srArifm += Number(price);
    });
    srArifm = srArifm / prices.length;

    prices.map( price => {
        volatility += Math.pow((srArifm - price), 2);
    });

    return volatility * kf;
}


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
                        data = Object.values(data);
                        for(let i=0; i<data.length; i++)
                            data[i] = Number(data[i]['4. close']);
                        resolve(data);
                    }
                    catch(e) {
                        resolve(undefined);
                    }
                }
            });     
        });
}