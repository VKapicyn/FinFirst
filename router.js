let express = require('express'),
    router = express.Router(),
    portfel = require('./models/portfelModel'),
    user = require('./models/userModel'),
    data = require('./models/dataModel');

router.get('/demo/getUser/:imei', user.getUser); // get user info
router.get('/getUser/:userId', user.getUser); // get user imei
router.get('/getPortfel/:userId/:portfelName', portfel.getPortfel) // get portfel info
router.get('/getAllPortfels/:userId', portfel.getAllPortfels) // get all user portfels
router.get('/getOperations/:userId/:portfelName', portfel.getOperations) //get operations
router.get('/getCurrency', data.getCurrency) // get currency (open API)
router.post('/sellPortfel', portfel.sellPortfel) // sell portfel
router.post('/setUser', user.setUser); // new user
router.post('/setPortfel', portfel.setPortfel) // new portfel


module.exports = router;