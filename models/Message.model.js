const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({

    conversationId: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String
    }
},
{timestamps: true}

)
const Message = mongoose.model("Message", messageSchema)

module.exports = Message