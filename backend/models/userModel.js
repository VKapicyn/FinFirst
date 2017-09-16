let mongoose = require('./../app.js').mongoose;

let userSchema = new mongoose.Schema({
    imei: String,
    name: String,
    age: Number,

    //TOFIX
    portfels: [{
        type: Boolean, //demo=false, real=true
        name: String,
        stratDate: Date,
        startBalance: Number,
        realBalance: Number,
        currency: String,
        bonds: [String],
        stocks: [String],
        prices: [Number]
    }]
});

let userModel = mongoose.model('user', userSchema);
module.exports.userModel = userModel;

exports.getUser = (req, res) => {
    if (req.params.imei != undefined)
        userModel.findOne({imei:req.params.imei}).then((user) => {
            res.json({
                id: user.id,
                name: user.name,
                age: user.age
            });
        });
    else
        userModel.findOne({id:req.params.userId}).then((user) => {
            res.json(user.imei);
        });
}

exports.setUser = (req, res) => {
    let user = new userModel();
    
    user.imei = req.body.imei;
    user.name = req.body.name;
    user.age = req.body.age;

    res.send(user.save());
}
