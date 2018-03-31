const mongoose = require('mongoose')

const taskScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    task:{type: String, required: true},
    state:{type: Boolean, required:true, default: true}
})

module.exports = mongoose.model('Task', taskScheme)