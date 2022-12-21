const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     email: String,
//     name: String,
//     username: String,
//     password: String,
//     createdDate: {
//         type: Date,
//         default: () => Date.now()
//     }
// })
// const users = mongoose.model('users', userSchema);
const adminSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
})
const admin = mongoose.model('admin', adminSchema);

module.exports = {
    // users,
    admin
}