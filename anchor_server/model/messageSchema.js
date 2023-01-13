const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String
        },
        senderId: String,
        receiverId:String,
        text: {
            type: String,
        },
        isRead:{
            type: Boolean,
            default: false
        },
    },
    {
        timestamps:true
    }
);

const MessageModel = mongoose.model("Message",MessageSchema)

module.exports = {
    MessageModel
}