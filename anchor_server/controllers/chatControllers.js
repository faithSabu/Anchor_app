const chatServices = require('../services/chatServices')
const CHATS = require('../model/chatSchema').ChatModel

module.exports = {
    createChat: async (req, res) => {
        // chatServices.createChat(req.body)
        const chat = await CHATS.findOne({
            members: { $all: [req.body.senderId, req.body.receiverId] }
        })
        if (chat) {
            res.status(200).json({chat:true})
        } else {
            const newChat = new CHATS({
                members: [req.body.senderId, req.body.receiverId]
            })
            try {
                const result = await newChat.save()
                res.status(200).json(result)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        console.log(req.body);

    },

    userChats: async (req, res) => {
        try {
            const chat = await CHATS.find({
                members: { $in: [req.params.userId] }
                // members:{$in:['fsdfsdf']} 
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    findChat: async (req, res) => {
        try {
            const chat = await CHATS.findOne({
                members: { $all: [req.params.firstId, req.params.secondId] }
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}