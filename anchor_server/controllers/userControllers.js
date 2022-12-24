const userServices = require('../services/userServices');
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('./tokens')
const { isAuth } = require('../middlewares/IsAuth')

//from userServices
require('dotenv').config()

const USERS = require('../model/userSchema').users;
const POSTS = require('../model/userSchema').posts;
const NOTIFICATIONS = require('../model/notificationSchema').notifications
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
// const { isObjectIdOrHexString } = require('mongoose');  //delete
const ObjectId = require('mongoose').Types.ObjectId;

let userInfo;
let otp;
//from userServices


module.exports = {
    generateOTP: async (req, res) => {
        // userServices.generateOTP(req.body).then((response) => {
        //     res.json(response)
        // })
        try {
            let userExist = (await USERS.find({ email: req.body.email })).toString()
            // let userExist = (await USERS.find({ $or: [ { email: req.body.email  }, { username: req.body.username } ] } )).toString()
            if (userExist) return res.json({ userExist: true })
            let usernameExist = (await USERS.find({ username: req.body.username })).toString()
            if (usernameExist) return res.json({ usernameExist: true })
            bcrypt.hash(req.body.password, 10).then(async function (hash) {
                req.body.password = hash
                userInfo = req.body;
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
                        to: req.body.email,
                        subject: "Anchor App OTP",
                        text: `Your one time password is ${otp}  `,
                    }).then(() => {
                        res.json({ otp: 'sent' })
                    })
                } catch (error) {
                    console.log(error);
                    throw 'Nodemailer error'
                }
            });

        } catch (error) {
            res.status(500).res.json(error)
        }

    },

    verifyOTP: (req, res) => {
        // userServices.verifyOTP(req.body).then(resp => {
        //     res.json(resp)
        // })
        try {
            if (req.body.otp == otp) {
                USERS.create(userInfo).then((response) => {
                    otp = '';
                    userInfo = '';
                    // res.json(response)
                })
                return res.json({ otpValid: true })
            } else {
                return res.json({ otpValid: false })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    resendOTP: async (req, res) => {
        // userServices.resendOTP().then(resp => {
        //     res.json(resp)
        // })
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
                res.json({ otp: 'sent' })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },

    login: async (req, res) => {
        // userServices.doLogin(req.body).then(response => {
        //     res.json(response)
        // })
        try {
            let user = await USERS.find({ email: req.body.email })
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password).then(async function (result) {
                    if (result) {

                        //jwt access and refresh tokens
                        const accessToken = await createAccessToken(user[0].email)
                        const refreshToken = await createRefreshToken(user[0].email)
                        sendRefreshToken(req, res, refreshToken)
                        sendAccessToken(req, res, accessToken, user)
                        //jwt access and refresh tokens

                        // const jwtToken = jwt.sign(user[0].email, process.env.JWT_SECRET_TOKEN)
                        // res.json({ jwtToken, user })
                    } else {
                        res.json({ invalidUser: true })
                    }
                });
            } else {
                res.json({ invalidUser: true })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    logout: (req, res) => {
        res.clearCookie('refreshToken', { path: '/refresh_token' })
        return res.json({
            message: 'Logged out',
        })
    },

    uploadProfileImage: (req, res) => {
        // userServices.uploadProfileImage(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            USERS.findOneAndUpdate(
                {
                    _id: new ObjectId(req.query.userId)
                },
                {
                    $set: { profileImg: req.query.imageUrl }
                },
                {
                    upsert: true,
                    new: true
                }
            ).then(resp => {
                res.status(200).json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getProfilerPicture: (req, res) => {
        // userServices.getProfilerPicture(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            USERS.find({ _id: new ObjectId(req.query.userId) })
                .then(resp => {
                    res.json(resp)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    uploadPost: (req, res) => {
        // userServices.doUploadPost(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            req.query.userId = ObjectId(req.query.userId)
            POSTS.create(req.query).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUserPosts: (req, res) => {
        // userServices.getUserPosts(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            POSTS.find({ userId: new ObjectId(req.query.userId) }).then(resp => {
                res.json(resp.reverse())
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAllPosts: (req, res) => {
        // userServices.getAllPosts().then(resp => {
        //     res.json(resp)
        // })
        try {
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
                res.json(resp.reverse())
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    profieDetails: (req, res) => {
        // userServices.getProfieDetails(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            USERS.find({ _id: ObjectId(req.query.userId) }).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    updateProfileInfo: (req, res) => {
        // userServices.updateProfileInfo(req.body).then(resp => {
        //     res.json(resp)
        // })
        try {
            USERS.findOneAndUpdate(
                {
                    _id: new ObjectId(req.body.userId)
                },
                req.body.values,
                { new: true }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    checkPassword: (req, res) => {
        // userServices.checkPassword(req.body).then(resp => {
        //     res.json(resp)
        // })
        try {
            USERS.find({ _id: new ObjectId(req.body.userId) }, { password: 1 }).then(resp => {
                bcrypt.compare(req.body.password, resp[0].password).then(result => {
                    res.json(result)
                })
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    changePassword: (req, res) => {
        // userServices.changePassword(req.body).then(resp => {
        //     res.json(resp)
        // })
        try {
            bcrypt.hash(req.body.password, 10).then(hash => {
                USERS.updateOne(
                    {
                        _id: new ObjectId(req.body.userId)
                    },
                    {
                        $set: { password: hash }
                    }
                ).then(resp => {
                    res.json({ updated: true })
                })
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    likePost: (req, res) => {
        // userServices.likePost(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            POSTS.updateOne(
                {
                    _id: new ObjectId(req.query.postId),
                    'likes.refUser': { $ne: new ObjectId(req.query.userId) }
                },
                {
                    $push: {
                        likes: {
                            refUser: new ObjectId(req.query.userId)
                        }
                    }
                }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    dislikePost: (req, res) => {
        // userServices.dislikePost(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            POSTS.updateOne(
                {
                    _id: new ObjectId(req.query.postId),
                    'likes.refUser': { $eq: new ObjectId(req.query.userId) }
                },
                {
                    $pull: {
                        likes: {
                            refUser: new ObjectId(req.query.userId)
                        }
                    }
                }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    postComment: (req, res) => {
        // userServices.postComment(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            POSTS.updateOne(
                {
                    _id: new ObjectId(req.query.postId),
                },
                {
                    $push: {
                        comments: {
                            refUser: new ObjectId(req.query.userId),
                            comment: req.query.comment,
                            refUsername: req.query.username,
                            refUserProfileImg: req.query.profileImg,
                        }
                    }
                }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteComment:(req,res)=>{
        const {postId,commentId} = req.query;
        console.log(req.query);
        try {
            POSTS.updateOne(
                {
                    _id: new ObjectId(postId),
                },
                {
                    $pull: {
                        comments: {
                            _id:ObjectId(commentId)
                        }
                    }
                }
            ).then(resp => {
                console.log(resp);
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    postDelete: (req, res) => {
        // userServices.postDelete(req.query).then(resp => {
        //     res.json(resp)
        // })
        try {
            POSTS.deleteMany({ _id: req.query.postId }).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUser: (req, res) => {
        // userServices.getUser(req.params).then(resp => {
        //     res.json(resp)
        // })
        try {
            console.log(req.params.userId);
            USERS.find({ _id: ObjectId(req.params.userId) }).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAllUsers:(req,res)=>{
        try {
            USERS.find().then(resp=>{
                res.status(200).json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    follow: async (req, res) => {
        const { userId, username, refUserId, refUsername } = req.query;
        try {
            let resultFollowing = await USERS.findOneAndUpdate(
                {
                    _id: new ObjectId(userId)
                },
                {
                    $push: {
                        following: {
                            refUserId: new ObjectId(refUserId),
                            refUsername: refUsername,
                        }
                    }
                },
                {
                    new: true
                }
            )
            if (resultFollowing) {
                let resultFollower = await USERS.findOneAndUpdate(
                    {
                        _id: new ObjectId(refUserId)
                    },
                    {
                        $push: {
                            followers: {
                                refUserId: new ObjectId(userId),
                                refUsername: username,
                            }
                        }
                    },
                    {
                        new: true
                    }
                )
                if (resultFollower) res.status(200).json(resultFollowing)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    unfollow: async (req, res) => {
        const { userId, refUserId } = req.query;
        try {
            let resultUnfollowing = await USERS.findOneAndUpdate(
                {
                    _id: new ObjectId(userId)
                },
                {
                    $pull: {
                        following: {
                            refUserId: new ObjectId(refUserId),
                        }
                    }
                },
                {
                    new: true
                }
            )
            if (resultUnfollowing) {
                let resultUnfollower = await USERS.findOneAndUpdate(
                    {
                        _id: new ObjectId(refUserId)
                    },
                    {
                        $pull: {
                            followers: {
                                refUserId: new ObjectId(userId),
                            }
                        }
                    },
                    {
                        new: true
                    }
                )
                if (resultUnfollower) res.status(200).json(resultUnfollowing)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    followNotification: async (req, res) => {
        console.log(req.query, 'req.query at follownotification');
        const { refUserId, refUsername, userId } = req.query;
        let message = `${refUsername} started following you`
        try {
            await NOTIFICATIONS.updateOne(
                {
                    userId: ObjectId(userId)
                },
                {
                    $push: {
                        notifications: {
                            refUserId: refUserId,
                            refUsername: refUsername,
                            message: message,
                            follow: true,
                        }
                    }
                },
                {
                    upsert: true
                }
            )
                .then(resp => {
                    res.status(200)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    unfollowNotification: async (req, res) => {
        const { refUserId, userId } = req.query;
        try {
            NOTIFICATIONS.updateOne(
                {
                    userId: ObjectId(userId),

                },
                {
                    $pull: {
                        notifications: {
                            "$and": [
                                { "refUserId": refUserId },
                                { "follow": true }
                            ]
                        }
                    }
                }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getNotifications: async (req, res) => {
        console.log(req.query);
        try {
            NOTIFICATIONS.find({ $and: [{ userId:req.query.userId }, { "notifications.isRead": false }] })
                .populate('notifications.refUserId')
                .then(resp => {
                    {
                        resp[0] ?
                            res.status(200).json(resp[0]?.notifications?.reverse()) :
                            res.status(200).json(resp[0])
                    }
                })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    likeNotification: async (req, res) => {
        const { likedUserId, likedUsername, postUserId, postId } = req.query;
        const message = `${likedUsername} liked your post`
        try {
            await NOTIFICATIONS.updateOne(
                {
                    userId: ObjectId(postUserId)
                },
                {
                    $push: {
                        notifications: {
                            refUserId: likedUserId,
                            postId: postId,
                            message: message,
                        }
                    }
                },
                {
                    upsert: true
                }
            )
                .then(resp => {
                    res.status(200)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    disLikeNotification: (req, res) => {
        const { disLikedUserId, postUserId, postId } = req.query;
        try {
            NOTIFICATIONS.updateOne(
                {
                    userId: ObjectId(postUserId),

                },
                {
                    $pull: {
                        notifications: {
                            "$and": [
                                { "refUserId": disLikedUserId },
                                { "postId": postId }
                            ]
                        }
                    }
                }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    commentNotification:async(req,res)=>{
        const { commentedUserId,commentedUsername,postUserId,postId } = req.query;
        const message = `${commentedUsername} commented on  your post`
        try {
            await NOTIFICATIONS.updateOne(
                {
                    userId: ObjectId(postUserId)
                },
                {
                    $push: {
                        notifications: {
                            refUserId: commentedUserId,
                            postId: postId,
                            message: message,
                        }
                    }
                },
                {
                    upsert: true
                }
            )
                .then(resp => {
                    res.status(200)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteCommentNotification: (req, res) => {
        const { commentedUserId, postUserId, postId } = req.query;
        console.log(req.query);
        try {
            NOTIFICATIONS.updateOne(
                {
                    userId: ObjectId(postUserId),

                },
                {
                    $pull: {
                        notifications: {
                            "$and": [
                                { "refUserId": commentedUserId },
                                { "postId": postId }
                            ]
                        }
                    }
                }
            ).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getSinglePostData:(req,res)=>{
        try {
            POSTS.aggregate([
                { $match: {_id:ObjectId(req.query.postId)} },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userData'
                    }
                }
            ]).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getNotificationLength:(req,res)=>{
        try {
            NOTIFICATIONS.find({userId:req.query.userId}).then(resp=>{
                res.status(200).json(resp[0]?.notifications?.length)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getFollowList:(req,res)=>{
        const {userId,followType} = req.query;
        try {
            USERS.find({_id:ObjectId(userId)},followType)
            .then(resp=>{
                console.log(resp);
                res.status(200).json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }    




}