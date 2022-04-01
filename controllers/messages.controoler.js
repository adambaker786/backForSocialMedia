const Message = require("../models/Message.model")

module.exports.messageControllers = {
    postMessage: async (req, res)=>{
        const {conversationId, text}= req.body
        try{
            const saveMessage = await Message.create({
                conversationId,
                sender: req.user.id,
                text
            })
            res.status(200).json(saveMessage)
        }
        catch(err){
            res.status(500).json(err.toString())
        }
    },
    getMessages: async (req, res)=>{
        try{
            const messages = await Message.find({
                conversationId: req.params.id
            })
            console.log(messages)
            res.status(200).json(messages)
        }
        catch(err){
            res.status(500).json(err.toString())
        }
    }
}