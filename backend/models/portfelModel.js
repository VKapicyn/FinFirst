let userModel = require('./userModel').userModel;

exports.getPortfel = (req, res) => {
    
}

exports.getAllPortfels = (req, res) => {
    userModel.findOne({id:req.params.userId}).then((user) => {
        res.json(user.portfels);
    });
}

exports.setPortfel = (req, res) => {
    userModel.findOne({id:userId}).then((user) => {
        let balance = 0,
            bondsProcent = (user.age + 30) * risk; // тут все ок, это бизнес логика



        if (!user.type)
            balance = (curency.toLowCase() == 'usd') ? 10000 : 1000000;


        let portfel = {
            info: {
                balance: balance,
                income: 0,
                currency: currency
            }
        }


        /*tickers: [{
            type, //bonds, stocks, ETF, etc
            name,
            lots,
            price//заглушка из-за отсутствия брокерского API
        }]*/
    });
}

/* Работа с OpenApi будет тут */
let getTickers = (stocks, currency) => {

}

//Вместо брокерского API, используется Yahoo finance 
let downloadHistory = (ticker) => {
    return new Promise((resolve, reject) => {
        //TODO
        //let day = ;
        //let month = ;
        //let year = ;
        let url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fchart.finance.yahoo.com%2Ftable.csv%3Fs%3D'+ticker+'%26a%3D'+0+'%26b%3D'+01+'%26c%3D'+2010+'%26d%3D'+2+'%26e%3D'+22+'%26f%3D'+2020+'%26g%3Dm%26ignore%3D.csv%27%20and%20columns%3D%27Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdj%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        request({
            url: url,
            json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    let data;
                    try{
                        data = JSON.parse(JSON.stringify(body['query']['results']['row']));
                        resolve(data);
                    }
                    catch(e){
                        resolve(undefined);
                    }
                }
            });     
        });
}
