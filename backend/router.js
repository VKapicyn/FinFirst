let express = require('express'),
    router = express.Router(),
    portfel = require('./models/portfelModel'),
    user = require('./models/userModel');

router.get('/demo/getUser/:imei', user.getUser); // get user info
router.get('/getUser/:userId', user.getUser); // get user imei
router.get('/getPortfel/:userId/:portfelId', portfel.getPortfel) // get portfel info
router.get('/getAllPortfels/:userId', portfel.getAllPortfels) // get all user portfels
router.post('/setUser', user.setUser); // new user
router.post('/setPortfel') // new portfel


module.exports = router;