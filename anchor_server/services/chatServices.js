const CHATS = require('../model/chatSchema').ChatModel

module.exports = {
    createChat: (data) => {
        return new Promise(async(resolve, reject) => {
            const newChat = new CHATS({
                members: [data.senderId, data.receivrId]
            })
            try {
                const result = await newChat.save()
                resolve()
            } catch (error) {
                res.status(500).json(error)
            }
        })
    }
}