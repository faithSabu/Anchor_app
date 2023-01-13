const chatServices = require('../services/chatServices')
const CHATS = require('../model/chatSchema').ChatModel

module.exports = {
    createChat: async (req, res) => {
        // chatServices.createChat(req.body)
        const chat = await CHATS.findOne({
            members: { $all: [req.body.senderId, req.body.receiverId] }
        })
        if (chat) {
            res.status(200).json(chat)
        } else {
            const newChat = new CHATS({
                members: [req.body.senderId, req.body.receiverId]
            })
            try {
                const result = await newChat.save()
                console.log(result,'chat created');
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
            }).sort( { 'updatedAt': -1 } )
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
    },

    updateChatTime:(req,res)=>{
        try {
            CHATS.updateOne(
                {_id:req.query.chatId},
                {updatedAt:Date.now()}
            ).then(resp=>{
                if (resp.modifiedCount === 0) throw 'Something went wrong!';
                res.status(200).json(resp)
            }).catch((err)=>{
                res.status(500).json(err)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}