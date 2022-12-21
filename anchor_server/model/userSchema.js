const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profileImg: {
        type:String,
        default:'https://freesvg.org/img/abstract-user-flat-1.png'
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
    createdDate: {
        type: Date,
        default: () => Date.now()
    }
})
const users = mongoose.model('users', userSchema);

const postsSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    postUrl: String,
    description: String,
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
const posts = mongoose.model('posts', postsSchema)

module.exports = {
    users,
    posts,
}