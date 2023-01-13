const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profileImg: {
        type: String,
        default: 'https://freesvg.org/img/abstract-user-flat-1.png'
    },
    email: String,
    phone: Number,
    name: String,
    username: String,
    bio: String,
    password: String,
    followers: [{
        refUserId: mongoose.Schema.Types.ObjectId,
        refUsername: String,
        time: {
            type: Date,
            default: () => Date.now()
        }
    }],
    following: [{
        refUserId: mongoose.Schema.Types.ObjectId,
        refUsername: String,
        time: {
            type: Date,
            default: () => Date.now()
        }
    }],
    blocked:{
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: () => Date.now()
    }
})
const users = mongoose.model('users', userSchema);

const postSchema = mongoose.Schema({
    // userId: mongoose.Schema.Types.ObjectId,
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    postUrl: String,
    description: String,
    isReported:{
        type: Boolean,
        default: false
    },
    reportReason: Array,
    likes: [{
        refUser: mongoose.Schema.Types.ObjectId,
        time: {
            type: Date,
            default: () => Date.now()
        }
    }],
    comments: [{
        refUser: mongoose.Schema.Types.ObjectId,
        refUsername: String,
        refUserProfileImg: String,
        comment: String,
        isReported: {
            type: Boolean,
            default: false
        },
        reportReason: Array,
        likes: [
            {
                refUser: mongoose.Schema.Types.ObjectId,
            }
        ],
        time: {
            type: Date,
            default: () => Date.now()
        }
    }],
    createdDate: {
        type: Date,
        default: () => Date.now()
    }
})
const posts = mongoose.model('posts', postSchema)

module.exports = {
    users,
    posts,
}