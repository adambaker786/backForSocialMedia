const Message = require("../models/Message.model")

module.exports.messageControllers = {
    postMessage: async (req, res)=>{
        const {conversationId, text}= req.body
        try{
            const saveMessage = await Message.save({
                conversationId,
                sender: req.user.id,
                text
            })
            res.status(200).json(saveMessage)
        }
        catch(err){
            req.status(500).json(err.toString())
        }
    },
    getMessages: async (req, res)=>{
        try{
            const messages = await Message.find({
                conversationId: req.params.id
            })
            res.status(200).json(messages)
        }
        catch(err){
            req.status(500).json(err.toString())
        }
    }
}