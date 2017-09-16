let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    url = 'mongodb://localhost:27017/FinFirst',
    app = express();

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
module.exports.mongoose = mongoose;


app.use(
    bodyParser(),
    bodyParser.json()
);

app.use('/api', require('./router'));
app.listen(require('./config.js').port);


console.log('Server started!');