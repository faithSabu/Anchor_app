const adminServices = require('../services/adminServices');

const sanitize = require('mongo-sanitize');

//from userServices
require('dotenv').config()

const USERS = require('../model/userSchema').users;
const POSTS = require('../model/userSchema').posts;
const NOTIFICATIONS = require('../model/notificationSchema').notifications
const MESSAGES = require('../model/messageSchema').MessageModel
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    login: (req, res) => {
        adminServices.doLogin(req.body).then(response => {
            console.log('response', response);
            res.json(response)
        })
    },

    getAllUsers: (req, res) => {
        try {
            USERS.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'posts'
                    }
                }
            ]).then(resp => {
                console.log(resp);
                res.status(200).json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    blockUnblockUser: (req, res) => {
        const { userId } = req.query;
        try {
            USERS.findOneAndUpdate({ _id: ObjectId(userId) },
                [{
                    $set: { blocked: { $not: "$blocked" } }
                }])
                .then(resp => {
                    res.status(200).json(resp)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getReportedPosts:(req,res)=>{
        try {
            POSTS.find({isReported:true  })
            .populate('userId')
            .then(resp=>{
                console.log(resp);
                res.status(200).json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deletePost:(req,res)=>{
        const {postId} = req.query;
        try {
            POSTS.deleteOne({ _id: postId }).then(resp => {
                res.json(resp)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}