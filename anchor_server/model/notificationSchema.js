const mongoose = require('mongoose');
const USERS = require('../model/userSchema').users;
const POSTS = require('../model/userSchema').posts;

const notificationSchema = mongoose.Schema({
    userId: String,
    notifications:[{
        refUserId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:USERS
        },
        refUsername:String,
        postId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:POSTS,
        },
        impressionId:String,
        message: String,
        follow:Boolean,
        isRead: {
            type: Boolean,
            default: false
          },
        time: {
            type: Date,
            default: () => Date.now()
        }
    }],
    
})
const notifications = mongoose.model('notifications', notificationSchema);


module.exports = {
    notifications
}