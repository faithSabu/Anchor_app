const MESSAGES = require('../model/messageSchema').MessageModel

module.exports = {
    addMessage: async (req, res) => {
        const { chatId, senderId, text } = req.body;
        const message = new MESSAGES({
            chatId,
            senderId,
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
            const result = await MESSAGES.find({ chatId })
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}