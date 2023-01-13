const MESSAGES = require('../model/messageSchema').MessageModel
const CHATS = require('../model/chatSchema').ChatModel
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    addMessage: async (req, res) => {
        console.log(req.body);
        const { chatId, senderId,receiverUser, text } = req.body;
        const message = new MESSAGES({
            chatId,
            senderId,
            receiverId:receiverUser,
            text
        })
        try {
            const result = await message.save()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getMessages: async (req, res) => {
        const { chatId } = req.params
        try {
            // CHATS.updateOne({_id:ObjectId(chatId)},{isRead:true}).then(resp=>console.log(resp))
            const result = await MESSAGES.find({ chatId })
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    messageRead:(req,res)=>{
        const {chatId} = req.query;
        try {
            MESSAGES.updateMany(
                {chatId:chatId},
                {$set:{isRead:true}}
                ).then(resp=>{
                    res.status(200).json(resp)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}