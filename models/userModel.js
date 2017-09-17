let mongoose = require('./../app.js').mongoose;


let userSchema = new mongoose.Schema({
    imei: String,
    name: String,
    age: Number,

    portfels: [{
        accountType: Boolean, //demo=false, real=true
        portfelName: String,
        risk: Number,
        startDate: Date,
        startBalance: Number,
        realBalance: Number,
        currency: String,
        tickers: [{
            tickerType: String,
            ticker: String,
            procent: Number
        }],
        prices: [{
            date: Date,
            price: Number
        }],
        operations: [String]
    }]
});


let userModel = mongoose.model('user', userSchema);
module.exports.userModel = userModel;


exports.getUser = (req, res) => {
    if (req.params.imei != undefined)
        userModel.findOne({imei:req.params.imei}).then((user) => {
            res.json({
                id: user._id,
                name: user.name,
                age: user.age
            });
        });
    else
        userModel.findOne({_id:req.params.userId}).then((user) => {
            res.json(user.imei);
        });
}


exports.setUser = (req, res) => {
    userModel.findOne({imei:req.body.imei}).then(user => {
        if (user == null){
            let user = new userModel();
            
            user.imei = req.body.imei;
            user.name = req.body.name;
            user.age = req.body.age;
        
            res.send(user.save());
        }
        else
            res.send(user);
    });
}
