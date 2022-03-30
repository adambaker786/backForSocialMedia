const Conversation = require("../models/Conversation.model")

module.exports.conversationControllers={
    postConversation: async (req,res)=>{
        try{
           const conversation = await Conversation.save({
               members: [req.user.id, req.body.reciverId]
           })
           res.status(200).json(conversation)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    getConversation: async (req, res)=>{
        try{
            const conversation = await Conversation.find({
                members: {$in: [req.user.id]}
            })
            res.status(200).json(conversation)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}