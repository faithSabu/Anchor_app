require('dotenv').config()

const USERS = require('../model/userSchema').users;
const POSTS = require('../model/userSchema').posts;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
// const { isObjectIdOrHexString } = require('mongoose');  //delete
const ObjectId = require('mongoose').Types.ObjectId;

let userInfo;
let otp;


module.exports = {
    generateOTP: (userData) => {
        return new Promise(async (resolve, reject) => {
            let userExist = (await USERS.find({ email: userData.email })).toString()
            // let userExist = (await USERS.find({ $or: [ { email: userData.email  }, { username: userData.username } ] } )).toString()
            if (userExist) return resolve({ userExist: true })
            let usernameExist = (await USERS.find({ username: userData.username })).toString()
            if (usernameExist) return resolve({ usernameExist: true })
            bcrypt.hash(userData.password, 10).then(async function (hash) {
                userData.password = hash
                userInfo = userData;
                otp = Math.floor(1000 + Math.random() * 9000);
                try {
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASS,
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: `Anchor ${process.env.EMAIL}`,
                        to: userData.email,
                        subject: "Anchor App OTP",
                        text: `Your one time password is ${otp}  `,
                    }).then(() => {
                        resolve({ otp: 'sent' })
                    })
                } catch (error) {
                    console.log(error);
                }
            });
        })
    },

    verifyOTP: (data) => {
        return new Promise((resolve, reject) => {
            if (data.otp == otp) {
                USERS.create(userInfo).then((response) => {
                    otp = '';
                    userInfo = '';
                    resolve(response)
                })
                return resolve({ otpValid: true })
            }
            return resolve({ otpValid: false })
        })
    },

    resendOTP: () => {
        return new Promise(async (resolve, reject) => {
            otp = Math.floor(1000 + Math.random() * 9000);
            try {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `Anchor ${process.env.EMAIL}`,
                    to: userInfo.email,
                    subject: "Anchor App OTP",
                    text: `Your one time password is ${otp}  `,
                }).then(() => {
                    resolve({ otp: 'sent' })
                })
            } catch (error) {
                console.log(error);
            }
        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let user = await USERS.find({ email: userData.email })
            if (user.length > 0) {
                bcrypt.compare(userData.password, user[0].password).then(function (result) {
                    if (result) {
                        const jwtToken = jwt.sign(user[0].email, process.env.JWT_SECRET_TOKEN)
                        resolve({ jwtToken, user })
                    } else {
                        resolve({ invalidUser: true })
                    }
                });
            } else {
                resolve({ invalidUser: true })
            }
        })
    },

    uploadProfileImage: (userData) => {
        return new Promise((resolve, reject) => {
            USERS.findOneAndUpdate(
                {
                    _id: new ObjectId(userData.userId)
                },
                {
                    $set: { profileImg: userData.imageUrl }
                },
                {
                    upsert: true,
                    new:true
                }
            ).then(resp => {
                resolve(resp)
            })
        })
    },

    getProfilerPicture: (data) => {
        return new Promise((resolve, reject) => {
            USERS.find({ _id: new ObjectId(data.userId) })
                .then(resp => {
                    resolve(resp)
                })
        })
    },

    doUploadPost: postData => {
        return new Promise((resolve, reject) => {
            postData.userId = ObjectId(postData.userId)
            POSTS.create(postData).then(resp => {
                resolve(resp)
            })
        })
    },

    getUserPosts: data => {
        return new Promise((resolve, reject) => {
            POSTS.find({ userId: new ObjectId(data.userId) }).then(resp => {
                resolve(resp.reverse())
            })
        })
    },

    getAllPosts: () => {
        return new Promise((resolve, reject) => {
            POSTS.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userData'
                    }
                }
            ]).then(resp => {
                resolve(resp.reverse())
            })
        })
    },

    getProfieDetails: (data) => {
        return new Promise((resolve, reject) => {
            USERS.find({ _id: ObjectId(data.userId) }).then(resp => {
                resolve(resp)
            })
        })
    },

    updateProfileInfo: (data) => {
        return new Promise((resolve, reject) => {
            USERS.findOneAndUpdate(
                {
                    _id: new ObjectId(data.userId)
                },
                data.values,
                {new: true}
            ).then(resp => {
                resolve(resp)
            })
        })
    },

    checkPassword: (data) => {
        return new Promise((resolve, reject) => {
            USERS.find({ _id: new ObjectId(data.userId) }, { password: 1 }).then(resp => {
                bcrypt.compare(data.password, resp[0].password).then(result => {
                    resolve(result)
                })
            })
        })
    },

    changePassword: (data) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data.password, 10).then(hash => {
                USERS.updateOne(
                    {
                        _id: new ObjectId(data.userId)
                    },
                    {
                        $set: { password: hash }
                    }
                ).then(resp => {
                    resolve({ updated: true })
                })
            })
        })
    },

    likePost: (data) => {
        return new Promise((resolve, reject) => {
            POSTS.updateOne(
                {
                    _id: new ObjectId(data.postId),
                    'likes.refUser': { $ne: new ObjectId(data.userId) }
                },
                {
                    $push: {
                        likes: {
                            refUser: new ObjectId(data.userId)
                        }
                    }
                }
            ).then(resp => {
                resolve(resp)
            })
        })
    },

    dislikePost: (data) => {
        return new Promise((resolve, reject) => {
            POSTS.updateOne(
                {
                    _id: new ObjectId(data.postId),
                    'likes.refUser': { $eq: new ObjectId(data.userId) }
                },
                {
                    $pull: {
                        likes: {
                            refUser: new ObjectId(data.userId)
                        }
                    }
                }
            ).then(resp => {
                resolve(resp)
            })
        })
    },

    postComment: (data) => {
        return new Promise((resolve, reject) => {
            POSTS.updateOne(
                {
                    _id: new ObjectId(data.postId),
                },
                {
                    $push: {
                        comments: {
                            refUser: new ObjectId(data.userId),
                            comment: data.comment,
                            refUsername: data.username,
                            refUserProfileImg: data.profileImg,
                        }
                    }
                }
            ).then(resp => {
                resolve(resp)
            })
        })
    },

    postDelete: (data)=>{
        return new Promise((resolve,reject)=>{
            POSTS.deleteMany({_id:data.postId}).then(resp=>{
                resolve(resp)
            })
        })
    },

    getUser:(data)=>{
        console.log(data);
        return new Promise((resolve,reject)=>{
            USERS.find({_id: ObjectId(data.userId)}).then(resp=>{
                resolve(resp)
            })
        })
    }
}