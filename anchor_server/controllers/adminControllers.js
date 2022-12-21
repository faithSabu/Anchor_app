const adminServices = require('../services/adminServices');

module.exports = {
    login:(req,res)=>{
        adminServices.doLogin(req.body).then(response=>{
            console.log('response',response);
            res.json(response)
        })
    }
}