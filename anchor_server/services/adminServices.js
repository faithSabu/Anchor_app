const dotenv = require('dotenv')
dotenv.config();

const ADMIN = require('../model/adminSchema').admin;
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

module.exports = {


    // doLogin:(userData) =>{
    //     return new Promise(async(resolve,reject)=>{
    //         let admin = await ADMIN.find({email:userData.email})
    //         if(admin.length>0){
    //             // bcrypt.compare(userData.password, user[0].password).then(function(result) {
    //                 if(result){
    //                     const jwtToken = jwt.sign(user[0].email,process.env.JWT_SECRET_TOKEN)
    //                     console.log('jwtToken');
    //                     console.log(jwtToken);
    //                     resolve({jwtToken,user})
    //                 }else{
    //                     resolve({invalidUser:true})
    //                 }
    //             });
    //         }else{
    //             resolve({invalidUser:true})
    //         }
    //     })
    // }
    doLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let admin = await ADMIN.findOne({userName:adminData.userName})
            if (admin) {
                if(admin.password === adminData.password){
                    // const token = createToken(admin._id)
                    resolve({ validAdmin:true,  })
                }else{
                    resolve({ invalidAdmin: true })
                }
            } else {
                resolve({ invalidAdmin: true })
            }
        })
    },
}  